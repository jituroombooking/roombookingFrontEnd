import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import ReactSelect from "react-select";
import ToggleButton from "react-toggle-button";

import Loading from "../../../Component/Loading/Loading";
import refreshIcon from "../../../util/Assets/Icon/refresh.png";
import deleteIcon from "../../../util/Assets/Icon/delete.png";
import IDProofIcon from "../../../util/Assets/Icon/id.png";
import AddRoomIcon from "../../../util/Assets/Icon/addRoom.png";
import {
  deleteBookedRoom,
  getBookedRooms,
  unAlottedMember,
  uploadBulkUpload,
} from "../../../Redux/Slice/booking";
import PageTitle from "../../../Component/PageTitle/PageTitle";
import ReactTable from "../../../Component/ReactTable/ReactTable";
import RightArrow from "../../../util/Assets/Icon/next.png";
import DownArrow from "../../../util/Assets/Icon/down.png";
import editIcon from "../../../util/Assets/Icon/edit.png";
import ViewIdProof from "../../../Component/ViewIdProof/ViewIdProof";
import { getReactSelectData, pageSizeOption } from "../../../util/util";
import Cross from "../../../util/Assets/Icon/cross.png";
import Plus from "../../../util/Assets/SVG/Plus";
import { getRoomCount } from "../../../Redux/Slice/room";
import ExcelUpload from "../../../util/Assets/Icon/excelUpload.png";
import RoomAllotteFromTable from "./RoomAllotteFromTable/RoomAllotteFromTable";
import PopupContainer from "../../../Component/PopupContainer/PopupContainer";
import BulkUploadpopup from "./BulkUploadPopup/BulkUploadpopup";
import LeftPagiationArrow from "../../../util/Assets/Icon/leftArrow.png";
import RightPaginationArrow from "../../../util/Assets/Icon/rightArrow.png";

import style from "./roomBookingList.module.scss";

const initialState = { flag: false, id: "" };
const initialSelectData = { value: "", label: "" };

function RoomBookingList() {
  const [selectedName, setSelectedName] = useState(initialSelectData);
  const [selectedBhavan, setSelectedBhavan] = useState(initialSelectData);
  const [idProof, setIdproof] = useState({ ...initialState });
  const [alottedMemberFlag, setAlottedMemberFlag] = useState(true);
  const [showAllottement, setShowAllottement] = useState({
    flag: false,
    data: "",
  });
  const [showAddBooking, setShowAddBooking] = useState(false);
  const [addBlukBooking, setAddBulkAddBooking] = useState(false);
  const [unAllottedPagination, setunAllottedPagination] = useState({
    lastPage: 0,
    currentPage: 1,
    pageSize: 100,
  });

  const RoomBookingSlice = useSelector((state) => state.booking);
  // const AuthDataSlice = useSelector((state) => state.login);
  const roomSlice = useSelector((state) => state.room);

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
                src={IDProofIcon}
                className={style.idProof}
                onClick={() =>
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
              <img
                onClick={() => setShowAllottement({ flag: true, data })}
                className={style.AddRoomIcon}
                src={AddRoomIcon}
              />
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
            // Build our expander column
            id: "expander", // Make sure it has an ID
            Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }) => (
              <span {...getToggleAllRowsExpandedProps()}>
                {isAllRowsExpanded ? (
                  <img src={DownArrow} className={style.idProof} />
                ) : (
                  <img src={RightArrow} className={style.idProof} />
                )}
              </span>
            ),
            Cell: ({ row }) => (
              // Use Cell to render an expander for each row.
              // We can use the getToggleRowExpandedProps prop-getter
              // to build the expander.
              <span {...row.getToggleRowExpandedProps()}>
                {row.isExpanded ? (
                  <img src={DownArrow} className={style.idProof} />
                ) : (
                  <img src={RightArrow} className={style.idProof} />
                )}
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
              <img
                src={IDProofIcon}
                className={style.idProof}
                onClick={() =>
                  setIdproof({
                    flag: true,
                    id: data.userBookingData.identityProof,
                  })
                }
              />
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

  useEffect(() => {
    if (!roomSlice.roomData) {
      dispatch(getRoomCount());
    }
  }, [roomSlice]);

  useEffect(() => {
    if (!RoomBookingSlice.booking) {
      dispatch(getBookedRooms());
    }
  }, [RoomBookingSlice.booking]);

  useEffect(() => {
    dispatch(unAlottedMember(unAllottedPagination));
  }, [unAllottedPagination]);

  const filterAlottedData =
    selectedName.value !== ""
      ? RoomBookingSlice.booking.filter(
          (f) => f.userBookingData.fullName === selectedName.value
        )
      : RoomBookingSlice.booking;

  const filterUnAlottedData =
    selectedName.value !== ""
      ? RoomBookingSlice.unAlottedMember.filter(
          (f) => f.fullName === selectedName.value
        )
      : RoomBookingSlice.unAlottedMember;

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

  if (RoomBookingSlice.loading) {
    return <Loading />;
  }

  const nameOption =
    (Array.isArray(RoomBookingSlice.booking) &&
      getReactSelectData(RoomBookingSlice.booking, "allotted")) ||
    [];

  const unAlottedNameOption =
    (Array.isArray(RoomBookingSlice.unAlottedMember) &&
      getReactSelectData(RoomBookingSlice.unAlottedMember, "unAllotted")) ||
    [];

  const bhavanOption = [];
  Array.isArray(RoomBookingSlice.booking) &&
    RoomBookingSlice.booking.map((m) => {
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
            <button
              className={`${style.addRoomBtn} ${
                (roomSlice.roomData?.emptyRoom || 0) === 0 && style.btnDisable
              }`}
              onClick={() => navigate("/addBooking")}
            >
              <Plus color="#fff" /> Booking
            </button>
            <button
              className={`${style.addRoomBtn}`}
              onClick={() => setAddBulkAddBooking(true)}
            >
              <img
                src={ExcelUpload}
                alt="excel upload"
                className={style.addIcon}
              />
            </button>
            <img
              src={refreshIcon}
              onClick={() => {
                dispatch(unAlottedMember());
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
              }}
            />
            <label className={style.alottedLabel}>
              {alottedMemberFlag ? "Alotted" : "Un-Alotted"} Member Table
            </label>
          </div>
          {/* {!alottedMemberFlag && ( */}
          <div className={style.roomIndicatorsParent}>
            <div className={style.roomIndicatorLabel}>Room:</div>
            <div className={style.roomIndicators}>
              <div
                className={`${style.indicatorContainer} ${style.primaryCard}`}
              >
                <label>Total: </label>
                <label>{roomSlice.roomData?.totalNoRoom || 0}</label>
              </div>
              <div
                className={`${style.indicatorContainer} ${style.secondaryCard}`}
              >
                <label>Allotted: </label>
                <label>{roomSlice.roomData?.allotedRoom || 0}</label>
              </div>
              <div
                className={`${style.indicatorContainer} ${style.tertiaryCard}`}
              >
                <label>Empty: </label>
                <label>{roomSlice.roomData?.emptyRoom || 0}</label>
              </div>
            </div>
          </div>
          {/* )} */}
        </div>
        <div className={style.roomBookingTableContainer}>
          {alottedMemberFlag ? (
            <>
              {Array.isArray(RoomBookingSlice.booking) && (
                <>
                  <ReactTable
                    data={filterAlottedData}
                    columns={alottedColumns}
                    key="alottedTable"
                    renderRowSubComponent={renderRowSubComponent}
                  />
                  {RoomBookingSlice.booking.length === 0 && (
                    <div className={style.noData}>No Data !</div>
                  )}
                </>
              )}
            </>
          ) : (
            <>
              {Array.isArray(RoomBookingSlice.unAlottedMember) && (
                <>
                  <ReactTable
                    columns={unAlottedColumns}
                    data={filterUnAlottedData}
                  />
                  {RoomBookingSlice.unAlottedMember.length === 0 && (
                    <div className={style.noData}>No Data !</div>
                  )}
                  {RoomBookingSlice.unAllottedPagination.lastPage > 1 && (
                    <div className={style.bottomParentContainer}>
                      <div className={style.bottomContainer}>
                        <div className={style.inforContainer}>
                          <div className={style.leftContainer}>
                            <div className={style.labelContaine}>
                              <label className={style.paginationLabel}>
                                Showing{" "}
                              </label>
                              <label className={style.paginationLabel}>
                                {unAllottedPagination.pageSize *
                                  (RoomBookingSlice.unAllottedPagination
                                    .currentPage -
                                    1) +
                                  1}
                              </label>
                              <label className={style.paginationLabel}>
                                to
                              </label>
                              <label className={style.paginationLabel}>
                                {RoomBookingSlice.unAllottedPagination
                                  .currentPage * unAllottedPagination.pageSize}
                              </label>
                              <label className={style.paginationLabel}>
                                of
                              </label>
                              {
                                RoomBookingSlice.unAllottedPagination
                                  .totalDocument
                              }
                            </div>
                            <div className={style.labelContaine}>
                              <label>Page Size</label>
                              <ReactSelect
                                menuPlacement="top"
                                className={style.pageFilter}
                                value={unAllottedPagination.pageSize}
                                placeholder={unAllottedPagination.pageSize}
                                options={pageSizeOption}
                                defaultValue={unAllottedPagination.pageSize}
                                onChange={({ value }) => {
                                  setunAllottedPagination({
                                    ...unAllottedPagination,
                                    pageSize: value || 0,
                                  });
                                }}
                              />
                            </div>
                          </div>
                          <div className={style.rightContainer}>
                            <div className={style.labelContaine}>
                              <label className={style.paginationLabel}>
                                Page
                              </label>
                              <label className={style.paginationLabel}>
                                {unAllottedPagination.currentPage}
                              </label>
                              <label className={style.paginationLabel}>
                                {" "}
                                of
                              </label>
                              {RoomBookingSlice.unAllottedPagination.lastPage}
                            </div>
                            <div className={style.arrowContainer}>
                              <img
                                src={LeftPagiationArrow}
                                alt="left arrow"
                                className={style.paginationArrow}
                                onClick={() =>
                                  unAllottedPagination.currentPage > 1 &&
                                  setunAllottedPagination({
                                    ...unAllottedPagination,
                                    currentPage:
                                      unAllottedPagination.currentPage - 1,
                                  })
                                }
                              />
                              <input
                                type="number"
                                value={unAllottedPagination.currentPage}
                                className={style.paginationInput}
                                onChange={(e) =>
                                  setunAllottedPagination({
                                    ...unAllottedPagination,
                                    currentPage: e.target.value,
                                  })
                                }
                              />
                              <img
                                src={RightPaginationArrow}
                                alt="Right arrow"
                                className={style.paginationArrow}
                                onClick={() =>
                                  unAllottedPagination.currentPage <
                                    RoomBookingSlice.unAllottedPagination
                                      .lastPage &&
                                  setunAllottedPagination({
                                    ...unAllottedPagination,
                                    currentPage:
                                      unAllottedPagination.currentPage + 1,
                                  })
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
      {showAllottement.flag && <RoomAllotteFromTable />}
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
