import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";

import refreshIcon from "../../../util/Assets/Icon/refresh.png";
import deleteIcon from "../../../util/Assets/Icon/delete.png";
import editIcon from "../../../util/Assets/Icon/edit.png";
import { deleteEvent, getEventData } from "../../../Redux/Slice/event";
import Loading from "../../../Component/Loading/Loading";
import PageTitle from "../../../Component/PageTitle/PageTitle";

import style from "./eventList.module.scss";

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

  if (EventSlice.loading) {
    return <Loading />;
  }

  return (
    <div className={style.eventContainer}>
      {showHeading && (
        <div className={style.roomHeading}>
          <PageTitle />
          <div className={style.actionContainer}>
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
                  <td className={style.tableDataRowItem}>{m.speakerName}</td>
                  {loaction.pathname !== "/" && (
                    <td className={style.tableDataRowItem}>
                      <img
                        alt="edit icon"
                        src={editIcon}
                        className={style.actionIcon}
                        onClick={() =>
                          navigate("/addEvent", {
                            state: {
                              pageTitle: "Edit Event",
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
    </div>
  );
}

export default EventList;
