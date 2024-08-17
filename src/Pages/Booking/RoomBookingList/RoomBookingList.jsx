import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import ReactSelect from "react-select";
import ToggleButton from "react-toggle-button";
import { ToastContainer, toast } from "react-toastify";
// import { Tooltip } from "react-tooltip";

import Loading from "../../../Component/Loading/Loading";
import refreshIcon from "../../../util/Assets/Icon/refresh.png";
import deleteIcon from "../../../util/Assets/Icon/delete.png";
import IDProofIcon from "../../../util/Assets/Icon/id.png";
import AddRoomIcon from "../../../util/Assets/Icon/addRoom.png";
import {
  AutoAssignRoom,
  getBookedRooms,
  getUnAlottedMember,
  uploadBulkUpload,
} from "../../../Redux/Slice/booking";
import PageTitle from "../../../Component/PageTitle/PageTitle";
import ReactTable from "../../../Component/ReactTable/ReactTable";
import RightArrow from "../../../util/Assets/Icon/next.png";
import DownArrow from "../../../util/Assets/Icon/down.png";
import editIcon from "../../../util/Assets/Icon/edit.png";
import ViewIdProof from "../../../Component/ViewIdProof/ViewIdProof";
import { getReactSelectData } from "../../../util/util";
import Cross from "../../../util/Assets/Icon/cross.png";
import { getRoomCount } from "../../../Redux/Slice/room";
import ExcelUpload from "../../../util/Assets/Icon/file.png";
import PopupContainer from "../../../Component/PopupContainer/PopupContainer";
import BulkUploadpopup from "./BulkUploadPopup/BulkUploadpopup";
import AddBookingIcon from "../../../util/Assets/Icon/AddBooking.png";
import AutoIcon from "../../../util/Assets/Icon/auto.png";
import ConfirmModalPopup from "../../../Component/ConfirmModalPopup/ConfirmModalPopup";
import Pagination from "../../../Component/Pagination/Pagination";
import NoImage from "../../../util/Assets/Icon/noImage.png";

import style from "./roomBookingList.module.scss";
import "react-toastify/dist/ReactToastify.min.css";

const initialState = { flag: false, id: "" };
const initialSelectData = { value: "", label: "" };
const initialAllottement = {
  flag: false,
  data: "",
};

function RoomBookingList() {
  const [selectedName, setSelectedName] = useState(initialSelectData);
  const [selectedBhavan, setSelectedBhavan] = useState(initialSelectData);
  const [idProof, setIdproof] = useState({ ...initialState });
  const [alottedMemberFlag, setAlottedMemberFlag] = useState(
    sessionStorage.getItem("tableFlag") === "true" || false
  );
  const [showAllottement, setShowAllottement] = useState(initialAllottement);
  // const [showAddBooking, setShowAddBooking] = useState(false);
  const [addBlukBooking, setAddBulkAddBooking] = useState(false);
  const [unAllottedPaginationState, setunAllottedPaginationState] = useState({
    lastPage: 0,
    currentPage: 1,
    pageSize: 100,
  });

  const { unAllottedPagination, unAlottedMember, booking, roomData, loading } =
    useSelector((state) => state.booking);

  // const AuthDataSlice = useSelector((state) => state.login);
  const roomSlice = useSelector((state) => state.room);
  const { roomData: actualRoomData } = useSelector((state) => state.room);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const unAlottedColumns = React.useMemo(
    () => [
      {
        Header: "Guest Detials",
        id: "guestDetials",
        columns: [
          {
            id: "srno",
            Header: "Sr #",
            accessor: (data, index) => index + 1,
            width: "10%",
          },
          {
            id: "name",
            Header: "Name",
            accessor: (data) => <div>{data.fullName}</div>,
            width: 90,
          },
          {
            id: "total",
            Header: "Total",
            accessor: (data) => <div>{data.familyMember}</div>,
            width: 90,
          },
          {
            id: "alotted",
            Header: "Allotted",
            accessor: (data) => {
              return <div>{data.memberAllotted}</div>;
            },
            width: 90,
          },
          {
            id: "mobileNumber",
            Header: "Mobile Number	",
            accessor: (data) => <div>{data.mobileNumber}</div>,
          },
          {
            id: "idProof",
            Header: "ID Proof",
            accessor: (data) => (
              <img
                src={data.identityProof ? IDProofIcon : NoImage}
                className={`${
                  data.identityProof ? style.idProof : style.noCursor
                }`}
                onClick={() =>
                  data.identityProof &&
                  setIdproof({
                    flag: true,
                    id: data.identityProof,
                  })
                }
              />
            ),
          },
        ],
      },
      {
        Header: "Booking",
        id: "booking",
        columns: [
          {
            id: "from",
            Header: "From",
            accessor: (data) => (
              <span>{moment(data.bookingFrom).format("DD MMM YYYY")}</span>
            ),
          },
          {
            id: "till",
            Header: "Till",
            accessor: (data) => (
              <span>{moment(data.bookingTill).format("DD MMM YYYY")}</span>
            ),
          },
        ],
      },
      {
        id: "actionCol",
        Header: "Action",
        isVisiable: false,
        columns: [
          {
            id: "roomAllote",
            Header: "Allotte",
            accessor: (data) => (
              <div className={style.allottmentContainer}>
                <img
                  // onClick={() => setShowAllottement({ flag: true, data })}
                  className={style.AddRoomIcon}
                  src={AddRoomIcon}
                />
                <img
                  onClick={() => setShowAllottement({ flag: true, data })}
                  className={style.AddRoomIcon}
                  src={AutoIcon}
                />
              </div>
            ),
          },
          {
            id: "delete",
            Header: "Delete",
            accessor: (data) => (
              <img
                alt="delete icon"
                src={deleteIcon}
                className={style.idProof}
                // onClick={() => dispatch(deleteEvent(m._id))}
              />
            ),
          },
          {
            id: "edit",
            Header: "Edit",
            accessor: (data) => (
              <img
                alt="edit icon"
                src={editIcon}
                className={style.idProof}
                onClick={() =>
                  navigate("/addBooking", {
                    state: {
                      pageTitle: "Edit Booking",
                      editBookingData: data,
                    },
                  })
                }
              />
            ),
          },
        ],
      },
    ],
    []
  );

  const alottedColumns = React.useMemo(
    () => [
      {
        id: "expanderParentRow",
        Header: "Bhavan Data",
        columns: [
          {
            id: "expander",
            Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }) => (
              <span {...getToggleAllRowsExpandedProps()}>
                <img
                  src={isAllRowsExpanded ? DownArrow : RightArrow}
                  className={style.idProof}
                />
              </span>
            ),
            Cell: ({ row }) => (
              <span {...row.getToggleRowExpandedProps()}>
                <img
                  src={row.isExpanded ? DownArrow : RightArrow}
                  className={style.idProof}
                />
              </span>
            ),
          },
        ],
      },

      {
        Header: "Guest Detials",
        columns: [
          {
            id: "guestName",
            Header: "Name",
            accessor: (data) => (
              <div className={style.mainText}>
                {data.userBookingData.fullName}
              </div>
            ),
            width: "10%",
          },
          {
            Header: "Total",
            accessor: (data) => <div>{data.userBookingData.familyMember}</div>,
            width: 90,
          },
          {
            Header: "Allotted",
            accessor: (data) => {
              return <div>{data.userBookingData.memberAllotted}</div>;
            },
            width: 90,
          },

          {
            Header: "Mobile Number	",
            accessor: (data) => <div>{data.userBookingData.mobileNumber}</div>,
          },
          {
            Header: "ID Proof",
            accessor: (data) => (
              <>
                <img
                  data-tooltip-id={data.userBookingData._id}
                  src={
                    data.userBookingData.identityProof ? IDProofIcon : NoImage
                  }
                  className={`${
                    data.userBookingData.identityProof
                      ? style.idProof
                      : style.noCursor
                  }`}
                  onClick={() =>
                    setIdproof({
                      flag: true,
                      id: data.userBookingData.identityProof,
                    })
                  }
                />
                {/* <Tooltip
                  id={data.userBookingData._id}
                  place="bottom"
                  content={<div>No ID</div>}
                /> */}
              </>
            ),
          },
        ],
      },
      {
        Header: "Booking",
        columns: [
          {
            Header: "From",
            accessor: (data) => (
              <span>
                {moment(data.userBookingData.bookingFrom).format("DD MMM YYYY")}
              </span>
            ),
          },
          {
            Header: "Till",
            accessor: (data) => (
              <span>
                {moment(data.userBookingData.bookingTill).format("DD MMM YYYY")}
              </span>
            ),
          },
        ],
      },
      {
        id: "actionCol",
        Header: "Action",
        isVisiable: false,
        columns: [
          {
            id: "delete",
            Header: "Delete",

            accessor: (data) => (
              <img
                alt="delete icon"
                src={deleteIcon}
                className={style.idProof}
                // onClick={() => dispatch(deleteEvent(m._id))}
              />
            ),
          },
          {
            id: "edit",
            Header: "Edit",
            accessor: (data) => (
              <img
                alt="edit icon"
                src={editIcon}
                className={style.idProof}
                onClick={() =>
                  navigate("/addBooking", {
                    state: {
                      pageTitle: "Edit Booking",
                      editBookingData: data.userBookingData,
                    },
                  })
                }
              />
            ),
          },
        ],
      },
    ],
    []
  );

  useEffect(() => {
    if (!roomData) {
      dispatch(getRoomCount());
    }
  }, [roomData]);

  useEffect(() => {
    if (!booking) {
      dispatch(getBookedRooms());
    }
  }, [booking]);

  useEffect(() => {
    dispatch(getUnAlottedMember(unAllottedPaginationState));
  }, [unAllottedPaginationState]);

  const filterAlottedData =
    selectedName.value !== ""
      ? booking.filter((f) => f.userBookingData.fullName === selectedName.value)
      : booking;

  const filterUnAlottedData =
    selectedName.value !== ""
      ? unAlottedMember.filter((f) => f.fullName === selectedName.value)
      : unAlottedMember;

  const renderRowSubComponent = ({ row }) => {
    const { bhavanData, roomData } = filterAlottedData[row.index];
    const bhavanMap = new Map();

    bhavanData.map((m) => {
      if (!bhavanMap.get(m._id)) {
        bhavanMap.set(m._id, { ...m, roomData: [] });
      }
    });

    roomData.map((rm) => {
      if (bhavanMap.get(rm.bhavanId)) {
        const bhavanData = bhavanMap.get(rm.bhavanId);
        bhavanData.roomData.push(rm);
      }
    });

    const finalArray = Array.from(bhavanMap, ([name, value]) => ({
      ...value,
    }));

    return (
      <div className={style.bhavanCardContainer}>
        {finalArray.map((fm) => (
          <div className={style.bhavanCard}>
            <div className={style.bhavanCardHeader}>
              <div className={style.bhavanCardLableContainer}>
                <label className={style.label}>Bhavan Name: </label>
                <label className={style.labelValue}>{fm.bhavanName}.</label>
              </div>
              <div className={style.bhavanCardLableContainer}>
                <label className={style.label}>Bhavan landmark: </label>
                <label className={style.labelValue}>{fm.landmark}.</label>
              </div>
              <div className={style.bhavanCardLableContainer}>
                <label className={style.label}>No.of bed per room: </label>
                <label className={style.labelValue}>{fm.noOfBedperRoom}.</label>
              </div>
            </div>
            <div className={`${style.bhavanRoomContainer}`}>
              <label className={style.label}>Room No. </label>
              {fm.roomData.map((m) => (
                <div className={style.parentRoomCircle}>
                  <div
                    key={`${m.roomNumber}`}
                    className={style.roomCircle}
                    style={{
                      backgroundColor:
                        m.noOfBed === m.bookerIds.length ? "red" : "#19891c",
                    }}
                    onClick={() => {
                      navigate("/viewBooking", {
                        state: {
                          roomId: m._id,
                        },
                      });
                    }}
                  >
                    {m.roomNumber}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const handleBulkUpload = (bulkUploadData) => {
    dispatch(uploadBulkUpload({ bulkUploadData }));
  };

  if (loading) {
    return <Loading />;
  }

  const nameOption =
    (Array.isArray(booking) && getReactSelectData(booking, "allotted")) || [];

  const unAlottedNameOption =
    (Array.isArray(unAlottedMember) &&
      getReactSelectData(unAlottedMember, "unAllotted")) ||
    [];

  const bhavanOption = [];
  Array.isArray(booking) &&
    booking.map((m) => {
      m.bhavanData.map((im) => {
        if (
          bhavanOption.length === 0 ||
          bhavanOption.some((i) => i.value !== im.bhavanName)
        ) {
          bhavanOption.push({
            label: im.bhavanName,
            value: im.bhavanName,
          });
        }
      });
    });

  return (
    <div className={style.roomBookingContainer}>
      <ToastContainer />
      <div>
        <div className={`${style.roomHeading} `}>
          <PageTitle />
          <div className={style.actionContainer}>
            <ReactSelect
              className={style.selectFilter}
              placeholder={
                selectedName.value === "" ? "Filter Names" : selectedName.value
              }
              value={selectedName.value}
              defaultValue={selectedBhavan.value}
              onChange={(e) => setSelectedName(e)}
              options={alottedMemberFlag ? nameOption : unAlottedNameOption}
            />
            {alottedMemberFlag && (
              <ReactSelect
                className={style.selectFilter}
                placeholder="Filter Bhavan "
                defaultValue={selectedBhavan.value}
                value={selectedBhavan.value}
                onChange={(e) => setSelectedBhavan(e)}
                options={bhavanOption}
              />
            )}

            <button
              className={style.clearFilter}
              onClick={() => {
                setSelectedName(initialSelectData);
                setSelectedBhavan(initialSelectData);
              }}
            >
              <img className={style.addIcon} src={Cross} alt="Clear Filter" />
            </button>
            <img
              src={AddBookingIcon}
              alt="addBooking"
              className={style.uploadIcon}
              onClick={() =>
                (actualRoomData?.emptyRoom || 0) !== 0 &&
                navigate("/addBooking")
              }
            />
            <img
              src={ExcelUpload}
              alt="excel upload"
              className={style.uploadIcon}
              onClick={() => setAddBulkAddBooking(true)}
            />
            <img
              src={refreshIcon}
              onClick={() => {
                dispatch(getUnAlottedMember());
                dispatch(getBookedRooms());
                dispatch(getRoomCount());
              }}
              className={style.refreshIocn}
            />
          </div>
        </div>
        <div className={style.subHeadingContainer}>
          <div className={style.subheading}>
            <ToggleButton
              inactiveLabel=""
              activeLabel=""
              value={alottedMemberFlag}
              onToggle={() => {
                setSelectedName(initialSelectData);
                setSelectedBhavan(initialSelectData);
                setAlottedMemberFlag(!alottedMemberFlag);
                sessionStorage.setItem("tableFlag", !alottedMemberFlag);
              }}
            />
            <label className={style.alottedLabel}>
              {alottedMemberFlag ? "Alotted" : "Un-Alotted"} Member Table
            </label>
          </div>
          <div className={style.roomIndicatorsParent}>
            <div className={style.roomIndicatorLabel}>Room:</div>
            <div className={style.roomIndicators}>
              <div
                className={`${style.indicatorContainer} ${style.primaryCard}`}
              >
                <label>Total: </label>
                <label>{actualRoomData?.totalNoRoom || 0}</label>
              </div>
              <div
                className={`${style.indicatorContainer} ${style.secondaryCard}`}
              >
                <label>Allotted: </label>
                <label>{actualRoomData?.allotedRoom || 0}</label>
              </div>
              <div
                className={`${style.indicatorContainer} ${style.tertiaryCard}`}
              >
                <label>Empty: </label>
                <label>{actualRoomData?.emptyRoom || 0}</label>
              </div>
            </div>
          </div>
          {/* )} */}
        </div>
        <div className={style.roomBookingTableContainer}>
          {alottedMemberFlag ? (
            <>
              {Array.isArray(booking) && (
                <>
                  <ReactTable
                    data={filterAlottedData}
                    columns={alottedColumns}
                    key="alottedTable"
                    renderRowSubComponent={renderRowSubComponent}
                  />
                  {booking.length === 0 && (
                    <div className={style.noData}>No Data !</div>
                  )}
                </>
              )}
            </>
          ) : (
            <>
              {Array.isArray(unAlottedMember) && (
                <>
                  <ReactTable
                    columns={unAlottedColumns}
                    data={filterUnAlottedData}
                  />
                  {unAlottedMember.length === 0 && (
                    <div className={style.noData}>No Data !</div>
                  )}
                  {unAllottedPagination.lastPage > 1 && (
                    <Pagination
                      currentPage={unAllottedPaginationState.currentPage}
                      onChange={(pageNum) =>
                        setunAllottedPaginationState({
                          ...unAllottedPaginationState,
                          currentPage: pageNum,
                        })
                      }
                      onLeftClick={(value) =>
                        setunAllottedPaginationState({
                          ...unAllottedPaginationState,
                          currentPage: value,
                        })
                      }
                      onRightClick={(value) =>
                        setunAllottedPaginationState({
                          ...unAllottedPaginationState,
                          currentPage: value,
                        })
                      }
                      totalDocument={unAllottedPagination.totalDocument}
                      onPageSizeChange={(value) =>
                        setunAllottedPaginationState({
                          ...unAllottedPaginationState,
                          pageSize: value,
                        })
                      }
                      lastPage={unAllottedPagination.lastPage}
                      pageSize={unAllottedPaginationState.pageSize}
                    />
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
      {showAllottement.flag && (
        <ConfirmModalPopup
          onCancle={() => setShowAllottement(initialAllottement)}
          onSuccess={() => {
            setShowAllottement(initialAllottement);
            dispatch(AutoAssignRoom(showAllottement.data)).then(
              (autoAddRes) => {
                if (autoAddRes.payload.status === 200) {
                  toast.success("Room Assigned Sucessfully");
                }
              }
            );
          }}
          descText="Clicking on Confirm will allotte room automatically"
        />
      )}
      {idProof.flag && (
        <ViewIdProof
          idProof={idProof.id}
          onClose={() => setIdproof({ ...initialState })}
          path="userbooking"
        />
      )}
      {addBlukBooking && (
        <PopupContainer>
          <BulkUploadpopup
            onCancle={() => setAddBulkAddBooking(false)}
            onSuccess={(data) => handleBulkUpload(data)}
          />
        </PopupContainer>
      )}
    </div>
  );
}

export default RoomBookingList;
