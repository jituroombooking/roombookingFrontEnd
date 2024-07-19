import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import refreshIcon from "../../../util/Assets/Icon/refresh.png";
import deleteIcon from "../../../util/Assets/Icon/delete.png";
import editIcon from "../../../util/Assets/Icon/edit.png";
import { deleteEvent, getEventData } from "../../../Redux/Slice/event";
import Loading from "../../../Component/Loading/Loading";

import style from "./eventList.module.scss";
import moment from "moment";

function EventList({ showHeading = true }) {
  const EventSlice = useSelector((state) => state.event);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const loaction = useLocation();

  useEffect(() => {
    if (!EventSlice.eventData) {
      dispatch(getEventData());
    }
  }, [EventSlice.eventData]);

  return (
    <div className={style.eventContainer}>
      {EventSlice.loading ? (
        <Loading />
      ) : (
        <>
          {showHeading && (
            <div className={style.roomHeading}>
              <img
                src={refreshIcon}
                onClick={() => dispatch(getEventData())}
                className={style.refreshIocn}
              />
              <button
                className={style.addRoomBtn}
                onClick={() => navigate("/addEventMemories")}
              >
                Add Memories
              </button>
              <button
                className={style.addRoomBtn}
                onClick={() => navigate("/addEvent")}
              >
                Add Event
              </button>
            </div>
          )}
          <div className={style.labourTableContainer}>
            {Array.isArray(EventSlice.eventData) && (
              <>
                <table className={style.labourTable}>
                  <tr className={style.tableHeaderRow}>
                    <th className={style.tableHeaderRowItem}>Sr no.</th>
                    <th className={style.tableHeaderRowItem}>Event Date</th>
                    <th className={style.tableHeaderRowItem}>Event Name</th>
                    <th className={style.tableHeaderRowItem}>Event Venue</th>
                    <th className={style.tableHeaderRowItem}>Event Speaker</th>
                    {loaction.pathname !== "/" && (
                      <th className={style.tableHeaderRowItem}>Action</th>
                    )}
                  </tr>
                  {EventSlice.eventData.map((m, i) => (
                    <tr className={style.tableDataRow} key={m._id}>
                      <td className={style.tableDataRowItem}>{i + 1}</td>
                      <td className={style.tableDataRowItem}>
                        {moment(m.eventStartDate).format("DD/MM/YYYY")}
                      </td>
                      <td className={style.tableDataRowItem}>{m.eventName}</td>
                      <td className={style.tableDataRowItem}>{m.eventVenue}</td>
                      <td className={style.tableDataRowItem}>
                        {m.speakerName}
                      </td>
                      {loaction.pathname !== "/" && (
                        <td className={style.tableDataRowItem}>
                          <img
                            alt="edit icon"
                            src={editIcon}
                            className={style.actionIcon}
                            onClick={() =>
                              navigate("/addEvent", {
                                state: {
                                  editEventData: m,
                                },
                              })
                            }
                          />
                          <img
                            alt="delete icon"
                            src={deleteIcon}
                            className={style.actionIcon}
                            onClick={() => dispatch(deleteEvent(m._id))}
                          />
                        </td>
                      )}
                    </tr>
                  ))}
                </table>
                {Array.isArray(EventSlice.eventData) &&
                  EventSlice.eventData.length === 0 && (
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

export default EventList;
