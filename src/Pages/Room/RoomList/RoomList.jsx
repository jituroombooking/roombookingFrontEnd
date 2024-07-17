import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";

import { deleteRoom, getRooms } from "../../../Redux/Slice/room";
import refreshIcon from "../../../util/Assets/Icon/refresh.png";
import deleteIcon from "../../../util/Assets/Icon/delete.png";
import editIcon from "../../../util/Assets/Icon/edit.png";
import Loading from "../../../Component/Loading/Loading";

import style from "./roomList.module.scss";
import "react-tooltip/dist/react-tooltip.css";

function RoomList() {
  const roomsSlice = useSelector((state) => state.room);
  const authData = useSelector((state) => state.login);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(!roomsSlice.rooms, " <>? MAIN");
    // if (!roomsSlice.rooms) {
    dispatch(getRooms());
    // }
  }, [roomsSlice.rooms]);

  const generateRoomCircle = (rm, index) => (
    <div
      key={`${rm.roomNumber}-${index}`}
      data-tooltip-id={`room-tool-tip-${index}`}
      className={style.roomCircle}
      style={{ backgroundColor: rm.availabel ? "#19891c" : "red" }}
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

  console.log(roomsSlice, " <>?");

  return (
    <div className={style.roomContainer}>
      {roomsSlice.loading ? (
        <Loading />
      ) : (
        <>
          <div className={style.roomHeading}>
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
                        {m.rooms.map((rm, index) =>
                          generateRoomCircle(rm, index)
                        )}
                      </td>
                      {authData.loginData.role === "superAdmin" && (
                        <td className={style.tableDataRowItem}>
                          <img
                            src={editIcon}
                            onClick={() =>
                              navigate("/addRoom", {
                                state: {
                                  roomEditData: roomsSlice.roomData[i],
                                },
                              })
                            }
                            className={style.actionIcon}
                          />
                          <img
                            src={deleteIcon}
                            onClick={() => dispatch(deleteRoom(m._id))}
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
        </>
      )}
    </div>
  );
}

export default RoomList;
