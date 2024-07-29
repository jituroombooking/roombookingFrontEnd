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
import {
  deleteBookedRoom,
  getBookedRooms,
  unAlottedMember,
} from "../../../Redux/Slice/booking";
import PageTitle from "../../../Component/PageTitle/PageTitle";
import ReactTable from "../../../Component/ReactTable/ReactTable";
import RightArrow from "../../../util/Assets/Icon/next.png";
import DownArrow from "../../../util/Assets/Icon/down.png";
import editIcon from "../../../util/Assets/Icon/edit.png";
import ViewIdProof from "../../../Component/ViewIdProof/ViewIdProof";
import { getReactSelectData } from "../../../util/util";

import style from "./roomBookingList.module.scss";

const initialState = { flag: false, id: "" };

function RoomBookingList() {
  const [selectedName, setSelectedName] = useState({ value: "", label: "" });
  const [selectedBhavan, setSelectedBhavan] = useState({
    value: "",
    label: "",
  });
  const [idProof, setIdproof] = useState({ ...initialState });
  const [alottedMemberFlag, setAlottedMemberFlag] = useState(true);

  const RoomBookingSlice = useSelector((state) => state.booking);
  const AuthDataSlice = useSelector((state) => state.login);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const expandedRowColumn = React.useMemo(
    () => [
      {
        Header: "Bhavan",
        columns: [
          {
            id: "bhavanName",
            Header: "Name",
            accessor: (data) => (
              <div className={`${style.mainText} ${style.landmarkContainer}`}>
                {data.bhavanData.map((m) => (
                  <div className={style.landMarkItem}>{m.bhavanName}</div>
                ))}
              </div>
            ),
          },
          {
            Header: "Room #",
            accessor: (data) => (
              <div className={`${style.mainText} ${style.roomCircleContainer}`}>
                {data.roomData.map((m) => (
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
            ),
          },
          {
            Header: "Landmark",
            className: style.landmarkHeader,
            accessor: (data) => (
              <div className={`${style.mainText} ${style.landmarkContainer}`}>
                {data.bhavanData.map((m) => (
                  <div className={style.landMarkItem}>{m.landmark}</div>
                ))}
              </div>
            ),
          },
          {
            Header: "No.Of Bed",
            accessor: (data) => (
              <div
                className={`${style.mainText} ${style.noOfBedperRoomContainer}`}
              >
                {data.bhavanData.map((m) => (
                  <div className={style.noOfBedItem}>{m.noOfBedperRoom}</div>
                ))}
              </div>
            ),
          },
        ],
      },
    ],
    []
  );

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
            Header: "Alotted",
            accessor: (data) => <div>{data.memberAllotted}</div>,
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
            Header: "Alotted",
            accessor: (data) => (
              <div>{data.userBookingData.memberAllotted}</div>
            ),
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
    if (!RoomBookingSlice.booking) {
      dispatch(getBookedRooms());
    }
  }, [RoomBookingSlice.booking]);

  useEffect(() => {
    if (!RoomBookingSlice.unAlottedMember) {
      dispatch(unAlottedMember());
    }
  }, []);
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
    return (
      <ReactTable
        columns={expandedRowColumn}
        data={[filterAlottedData[row.index]]}
      />
    );
  };

  if (RoomBookingSlice.loading) {
    return <Loading />;
  }

  const nameOption =
    (Array.isArray(RoomBookingSlice.booking) &&
      getReactSelectData(RoomBookingSlice.booking)) ||
    [];

  const unAlottedNameOption =
    (Array.isArray(RoomBookingSlice.unAlottedMember) &&
      getReactSelectData(RoomBookingSlice.unAlottedMember)) ||
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
                setSelectedName({ value: "", label: "" });
                setSelectedBhavan({ value: "", label: "" });
              }}
            >
              Clear Filter
            </button>
            <button
              className={style.addRoomBtn}
              onClick={() => navigate("/addBooking")}
            >
              Add Booking
            </button>
            <img
              src={refreshIcon}
              onClick={() => {
                dispatch(unAlottedMember());
                dispatch(getBookedRooms());
              }}
              className={style.refreshIocn}
            />
          </div>
        </div>
        <div className={style.subheading}>
          <ToggleButton
            inactiveLabel=""
            activeLabel=""
            value={alottedMemberFlag}
            onToggle={() => {
              setAlottedMemberFlag(!alottedMemberFlag);
            }}
          />
          <label className={style.alottedLabel}>
            {alottedMemberFlag ? "Alotted" : "Un-Alotted"} Member Table
          </label>
        </div>
        <div className={style.roomBookingTableContainer}>
          {alottedMemberFlag ? (
            <>
              {Array.isArray(RoomBookingSlice.booking) && (
                <ReactTable
                  data={filterAlottedData}
                  columns={alottedColumns}
                  key="alottedTable"
                  renderRowSubComponent={renderRowSubComponent}
                />
              )}
            </>
          ) : (
            <>
              {Array.isArray(RoomBookingSlice.unAlottedMember) && (
                <ReactTable
                  columns={unAlottedColumns}
                  data={filterUnAlottedData}
                />
              )}
            </>
          )}

          {Array.isArray(RoomBookingSlice.booking) &&
            RoomBookingSlice.booking.length === 0 && (
              <div className={style.noData}>No Data !</div>
            )}
        </div>
      </div>
      {idProof.flag && (
        <ViewIdProof
          idProof={idProof.id}
          onClose={() => setIdproof({ ...initialState })}
          path="userbooking"
        />
      )}
    </div>
  );
}

export default RoomBookingList;
