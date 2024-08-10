import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import { toast, ToastContainer } from "react-toastify";

import { deleteRoom, getRooms } from "../../../Redux/Slice/room";
import refreshIcon from "../../../util/Assets/Icon/refresh.png";
import deleteIcon from "../../../util/Assets/Icon/delete.png";
import editIcon from "../../../util/Assets/Icon/edit.png";
import Loading from "../../../Component/Loading/Loading";
import PageTitle from "../../../Component/PageTitle/PageTitle";
import ConfirmModalPopup from "../../../Component/ConfirmModalPopup/ConfirmModalPopup";

import style from "./roomList.module.scss";
import "react-tooltip/dist/react-tooltip.css";
import "react-toastify/dist/ReactToastify.min.css";

function RoomList() {
  const [showConfirmation, setShowConfirmation] = useState({
    flag: false,
    data: "",
  });

  const roomsSlice = useSelector((state) => state.room);
  const authData = useSelector((state) => state.login);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // if (!roomsSlice.rooms) {
    dispatch(getRooms());
    // }
  }, [roomsSlice.rooms]);

  const generateRoomCircle = (rm, index) => (
    <div
      key={`${rm.roomNumber}-${index}`}
      data-tooltip-id={`room-tool-tip-${index}`}
      className={style.roomCircle}
      style={{
        backgroundColor:
          rm.noOfBed === rm.bookerIds.length
            ? "red"
            : rm.bookerIds.length === 0
            ? "#19891c"
            : "#F7EA00",
      }}
      onClick={() => {
        navigate("/viewBooking", {
          state: {
            roomId: rm._id,
          },
        });
      }}
    >
      {rm.roomNumber}
      <Tooltip
        id={`room-tool-tip-${index}`}
        place="bottom"
        content={<div>{rm.noOfBed}</div>}
      />
    </div>
  );

  if (roomsSlice.loading) {
    return <Loading />;
  }

  return (
    <div className={style.roomContainer}>
      <div className={style.roomHeading}>
        <PageTitle />
        <div className={style.actionContainer}>
          <img
            src={refreshIcon}
            onClick={() => dispatch(getRooms())}
            className={style.refreshIocn}
          />
          <button
            className={style.addRoomBtn}
            onClick={() => navigate("/addRoom")}
          >
            Add Rooms
          </button>
        </div>
      </div>
      <ToastContainer />
      <div className={style.roomTableContainer}>
        {Array.isArray(roomsSlice.roomData) && (
          <>
            <table className={style.roomTable}>
              <tr className={style.tableHeaderRow}>
                <th className={style.tableHeaderRowItem}>Bhavan name</th>
                <th className={style.tableHeaderRowItem}>Landmark</th>
                <th className={style.tableHeaderRowItem}>Room</th>
                <th className={style.tableHeaderRowItem}>Beds</th>
                <th className={style.tableHeaderRowItem}>Amount</th>
                <th className={style.tableHeaderRowItem}>Room Number</th>

                {authData.loginData.role === "superAdmin" && (
                  <th className={style.tableHeaderRowItem}>Action</th>
                )}
              </tr>
              {roomsSlice.roomData.map((m, i) => (
                <tr className={style.tableDataRow} key={m._id}>
                  <td className={style.tableDataRowItem}>{m.bhavanName}</td>
                  <td className={style.tableDataRowItem}>{m.landmark}</td>
                  <td className={style.tableDataRowItem}>
                    {m.rooms.length || 0}
                  </td>
                  <td className={style.tableDataRowItem}>
                    {m.rooms.length}X{m.noOfBedperRoom}
                  </td>
                  <td className={style.tableDataRowItem}>{m.roomAmount}</td>
                  <td
                    className={`${style.roomCircleContainer} ${style.tableDataRowItem}`}
                  >
                    {m.rooms.map((rm, index) => generateRoomCircle(rm, index))}
                  </td>
                  {authData.loginData.role === "superAdmin" && (
                    <td className={style.tableDataRowItem}>
                      <img
                        src={editIcon}
                        onClick={() =>
                          navigate("/addRoom", {
                            state: {
                              pageTitle: "Edit Room",
                              roomEditData: roomsSlice.roomData[i],
                            },
                          })
                        }
                        className={style.actionIcon}
                      />
                      <img
                        src={deleteIcon}
                        onClick={() =>
                          setShowConfirmation({ flag: true, data: m._id })
                        }
                        className={style.actionIcon}
                      />
                    </td>
                  )}
                </tr>
              ))}
            </table>
            {roomsSlice.roomData.length === 0 && (
              <div className={style.noData}>No Data !</div>
            )}
          </>
        )}
      </div>
      {showConfirmation.flag && (
        <ConfirmModalPopup
          onCancle={() => setShowConfirmation({ flag: false, data: "" })}
          descText="Deleting Bhnvan will delete the User Booking also"
          onSuccess={() => {
            dispatch(deleteRoom(showConfirmation.data)).then((delRes) => {
              if (delRes.payload.status === 200) {
                toast.success("Bhavan deleted successfully");
                setShowConfirmation({ flag: false, data: "" });
              }
            });
          }}
        />
      )}
    </div>
  );
}

export default RoomList;
