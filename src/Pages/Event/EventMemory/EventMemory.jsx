import React, { useState } from "react";

import style from "./eventMemories.module.scss";
import { useDispatch } from "react-redux";

const initialState = {
  eventImage: "",
  eventTitle: "",
};

function EventMemory() {
  const [eventData, setEventData] = useState(initialState);
  const [formvalidation, setFormvalidation] = useState(false);

  const dispatch = useDispatch();

  const submitEventData = () => {
    if (eventData.eventImage === "" || eventData.eventTitle === "") {
      setFormvalidation(true);
    } else {
    }
  };

  return (
    <div className={style.eventMemoryContainer}>
      <div className={style.formItem}>
        <labal className={style.eventLabel}>Event image*</labal>
        <div className={style.formItem}>
          <input
            type="file"
            accept="image/jpeg,image/png,"
            className={style.eventInput}
            onChange={(e) =>
              setEventData({
                ...eventData,
                eventImage: e.target.files[0],
              })
            }
          />
          {formvalidation && eventData.eventImage === "" && (
            <div className={style.formValidationError}>
              Event image is required
            </div>
          )}
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

        <button className={style.submitbtn} onClick={() => submitEventData()}>
          Add Labour
        </button>
      </div>
    </div>
  );
}

export default EventMemory;
