import React, { useEffect, useState } from "react";
import { Slide, toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";

import {
  addEventMemory,
  deleteEventMemory,
  editEventMemory,
  getEventMemories,
} from "../../../Redux/Slice/event";
import Loading from "../../../Component/Loading/Loading";
import deleteIcon from "../../../util/Assets/Icon/delete.png";
import editIcon from "../../../util/Assets/Icon/edit.png";
import refreshIcon from "../../../util/Assets/Icon/refresh.png";

import style from "./eventMemories.module.scss";
import "react-toastify/dist/ReactToastify.min.css";

const initialState = {
  eventImage: "",
  eventTitle: "",
};

function EventMemory() {
  const [eventData, setEventData] = useState(initialState);
  const [edit, setEdit] = useState(false);

  const [formvalidation, setFormvalidation] = useState(false);

  const EventSlice = useSelector((state) => state.event);

  useEffect(() => {
    if (!EventSlice.eventMemory) {
      dispatch(getEventMemories());
    }
  }, [EventSlice.eventMemory]);

  const dispatch = useDispatch();

  const submitEventData = () => {
    if ((!edit && eventData.eventImage === "") || eventData.eventTitle === "") {
      setFormvalidation(true);
    } else {
      edit
        ? dispatch(editEventMemory(eventData)).then((editRes) => {
            if (editRes.payload.status === 200) {
              setEdit(false);
              setEventData(initialState);
              toast.success("Event Edited successfully");
            }
          })
        : dispatch(addEventMemory(eventData)).then((addRes) => {
            if (addRes.payload.status === 201) {
              toast.success("Event added successfully");
              setEventData(initialState);
            }
          });
    }
  };

  return (
    <div className={style.eventMemoryContainer}>
      {EventSlice.loading ? (
        <Loading />
      ) : (
        <div className={style.parentContainer}>
          <ToastContainer transition={Slide} />
          <div className={style.roomHeading}>
            <img
              src={refreshIcon}
              onClick={() => dispatch(getEventMemories())}
              className={style.refreshIocn}
            />
          </div>
          <div className={style.mainContainer}>
            <div className={style.eventListContainer}>
              {Array.isArray(EventSlice.eventMemory) &&
                EventSlice.eventMemory.length === 0 && (
                  <div className={style.noData}>No Data !</div>
                )}
              <ul className={style.eventMemoryList}>
                {Array.isArray(EventSlice.eventMemory) &&
                  EventSlice.eventMemory.map((m) => (
                    <li className={style.eventMemoryItem} key={m._id}>
                      <div className={style.imgTitleContainer}>
                        <label className={style.eventTitle}>
                          {m.eventTitle}
                        </label>
                        <img
                          src={`https://jituroombooking.s3.eu-north-1.amazonaws.com/event/${m.eventImg}`}
                          alt="eventImg"
                          className={style.eventImg}
                        />
                      </div>
                      <div className={style.iconContainer}>
                        <img
                          src={editIcon}
                          alt="eventImg"
                          className={style.actionIcon}
                          onClick={() => {
                            setEventData({
                              ...m,
                              oldImg: m.eventImg,
                              eventImage: "",
                            });
                            setEdit(true);
                          }}
                        />
                        <img
                          src={deleteIcon}
                          alt="eventImg"
                          className={style.actionIcon}
                          onClick={() =>
                            dispatch(
                              deleteEventMemory({
                                _id: m._id,
                                imgId: m.eventImg,
                              })
                            ).then((deleteRes) => {
                              if (deleteRes.payload.status === 200) {
                                toast.success("Delete Sucessfully");
                              }
                            })
                          }
                        />
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
            <div className={style.eventFormContainer}>
              <div className={style.formRow}>
                <div className={style.formItem}>
                  <labal className={style.eventLabel}>Event image*</labal>
                  <div className={style.formItem}>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,"
                      className={style.eventInput}
                      onChange={(e) => {
                        setEventData({
                          ...eventData,
                          eventImage: e.target.files[0],
                        });
                      }}
                    />
                    {edit && (
                      <>
                        <label>Old Image</label>
                        <img
                          className={style.displyImg}
                          src={`https://jituroombooking.s3.eu-north-1.amazonaws.com/event/${eventData.oldImg}`}
                        />
                      </>
                    )}
                    {formvalidation && eventData.eventImage === "" && (
                      <div className={style.formValidationError}>
                        Event image is required
                      </div>
                    )}
                  </div>
                </div>
                <div className={style.formItem}>
                  <labal className={style.eventLabel}>Event title*</labal>
                  <div className={style.formItem}>
                    <input
                      className={style.eventInput}
                      value={eventData.eventTitle}
                      onChange={(e) =>
                        setEventData({
                          ...eventData,
                          eventTitle: e.target.value,
                        })
                      }
                    />
                    {formvalidation && eventData.eventTitle === "" && (
                      <div className={style.formValidationError}>
                        Event title is required
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className={style.formDevider} />
              <div className={style.btnContainer}>
                <button
                  className={style.resetBtn}
                  onClick={() => setEventData({ ...initialState })}
                >
                  Reset
                </button>

                <button
                  className={style.submitbtn}
                  onClick={() => submitEventData()}
                >
                  {edit ? "Edit" : "Add"} Event Memories
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EventMemory;
