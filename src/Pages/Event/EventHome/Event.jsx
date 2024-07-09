import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";

import style from "./event.module.scss";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { addEvent } from "../../../Redux/Slice/event";
import Loading from "../../../Component/Loading/Loading";

const initialState = {
  eventStartDate: new Date(),
  eventEndDate: new Date(),
  eventName: "",
  eventVenue: "",
};

function DayEvent() {
  const [eventData, setEventData] = useState({ ...initialState });

  const EventSlice = useSelector((state) => state.event);

  const dispatch = useDispatch();

  const submitEventData = () => {
    console.log(eventData);
    dispatch(addEvent(eventData));
  };

  return (
    <div className={style.eventContainer}>
      {EventSlice.loading ? (
        <Loading />
      ) : (
        <>
          <div className={style.formRow}>
            <div className={style.formItem}>
              <labal className={style.eventLabel}>Event Name*</labal>
              <div className={style.formItem}>
                <input
                  className={style.eventInput}
                  value={eventData.eventName}
                  onChange={(e) =>
                    setEventData({ ...eventData, eventName: e.target.value })
                  }
                />
              </div>
            </div>
            <div className={style.formItem}>
              <labal className={style.eventLabel}>Event Venue*</labal>
              <div className={style.formItem}>
                <input
                  className={style.eventInput}
                  value={eventData.eventVenue}
                  onChange={(e) =>
                    setEventData({ ...eventData, eventVenue: e.target.value })
                  }
                />
              </div>
            </div>
          </div>
          <div className={style.formRow}>
            <div className={style.formItem}>
              <labal className={style.eventLabel}>Event start date*</labal>
              <div className={style.formItem}>
                <ReactDatePicker
                  className={style.dateInput}
                  selected={eventData.eventStartDate}
                  onChange={(date) =>
                    setEventData({ ...eventData, eventStartDate: date })
                  }
                />
              </div>
            </div>
            <div className={style.formItem}>
              <labal className={style.eventLabel}>Event end date*</labal>
              <div className={style.formItem}>
                <ReactDatePicker
                  className={style.dateInput}
                  selected={eventData.eventEndDate}
                  onChange={(date) =>
                    setEventData({ ...eventData, eventEndDate: date })
                  }
                />
              </div>
            </div>
          </div>
          <div className={style.formDevider} />
          <div className={style.btnContainer}>
            <button
              className={style.resetBtn}
              onClick={() => setEventData(initialState)}
            >
              Reset
            </button>
            <button className={style.submitbtn} onClick={submitEventData}>
              Submit
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default DayEvent;
