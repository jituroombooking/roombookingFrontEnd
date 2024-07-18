import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactDatePicker from "react-datepicker";
import moment from "moment";

import { getRoomCount } from "../../Redux/Slice/room";
import { validatemobile } from "../../util/util";
import { bookRoom } from "../../Redux/Slice/booking";
import Loading from "../../Component/Loading/Loading";
import { getEventData } from "../../Redux/Slice/event";
import LeftArrow from "../../util/Assets/Icon/leftArrow.png";
import RightArrow from "../../util/Assets/Icon/rightArrow.png";

import style from "./home.module.scss";
import "react-datepicker/dist/react-datepicker.css";
import EventList from "../Event/EventList/EventList";

const initialState = {
  fullName: "",
  familyMember: 0,
  identityProof: "",
  bookingFrom: new Date(Date.now()),
  bookingTill: new Date(Date.now() + 3600 * 1000 * 48),
  mobileNumber: "",
};

const roomData = {
  totalNoRoom: 0,
  allotedRoom: 0,
  emptyRoom: 0,
};

function Home() {
  const [boodkingData, setBookingData] = useState({ ...initialState });
  const [formvalidation, setFormValidation] = useState(false);

  const roomSlice = useSelector((state) => state.room);
  const authData = useSelector((state) => state.login);
  const BookingSlice = useSelector((state) => state.booking);
  const EventSlice = useSelector((state) => state.event);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!roomSlice.roomData) {
      dispatch(getRoomCount());
    }
  }, []);

  useEffect(() => {
    if (!EventSlice.eventData) {
      dispatch(getEventData());
    }
  }, [EventSlice.eventData]);
  console.log(EventSlice, "<>?");

  const submitBookingData = () => {
    if (
      boodkingData.fullName === "" ||
      boodkingData.familyMember === 0 ||
      // boodkingData.identityProof === "" ||
      boodkingData.bookingFrom === "" ||
      boodkingData.bookingTill === "" ||
      !validatemobile(boodkingData.mobileNumber)
    ) {
      setFormValidation(true);
    } else {
      setFormValidation(false);
      dispatch(bookRoom(boodkingData));
    }
  };

  return (
    <div className={style.homeContainer}>
      {BookingSlice.loading ? (
        <Loading />
      ) : (
        <>
          <div className={style.cardEventContainer}>
            <div className={style.cardContainer}>
              <div className={`${style.cardItem} ${style.primaryCard}`}>
                <label className={style.cardLabel}>Total no.of rooms</label>
                <div>
                  <label className={style.labelValue}>
                    {roomSlice.roomData?.totalNoRoom || roomData.totalNoRoom}
                  </label>
                </div>
              </div>
              <div className={`${style.cardItem} ${style.secondaryCard}`}>
                <label className={style.cardLabel}>Alotted rooms</label>
                <div>
                  <label className={style.labelValue}>
                    {roomSlice.roomData?.allotedRoom || roomData.allotedRoom}
                  </label>
                </div>
              </div>
              <div className={`${style.cardItem} ${style.tertiaryCard}`}>
                <label className={style.cardLabel}>Empty rooms</label>
                <div>
                  <label className={style.labelValue}>
                    {roomSlice.roomData?.emptyRoom || roomData.emptyRoom}
                  </label>
                </div>
              </div>
            </div>
            <div className={style.eventParentContainer}>
              <EventList showHeading={false} />
            </div>
          </div>
          {authData?.loginData.role === "superAdmin" ||
          authData?.loginData.role === "staff" ? (
            <></>
          ) : (
            <div className={style.bookingFormContainer}>
              <div className={style.formRow}>
                <div className={style.formItem}>
                  <labal className={style.eventLabel}>Full name*</labal>
                  <div className={style.formItem}>
                    <input
                      className={style.eventInput}
                      value={boodkingData.fullName}
                      onChange={(e) =>
                        setBookingData({
                          ...boodkingData,
                          fullName: e.target.value,
                        })
                      }
                    />
                    {formvalidation && boodkingData.fullName === "" && (
                      <div className={style.formValidationError}>
                        Full name is required.
                      </div>
                    )}
                  </div>
                </div>
                <div className={style.formItem}>
                  <labal className={style.eventLabel}>Family members*</labal>
                  <div className={style.formItem}>
                    <input
                      type="number"
                      className={style.eventInput}
                      value={boodkingData.familyMember}
                      onChange={(e) =>
                        setBookingData({
                          ...boodkingData,
                          familyMember: parseInt(e.target.value),
                        })
                      }
                    />
                    {formvalidation && boodkingData.fullName === "" && (
                      <div className={style.formValidationError}>
                        Family members is required.
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className={style.formRow}>
                <div className={style.formItem}>
                  <labal className={style.eventLabel}>Identity proof*</labal>
                  <div className={style.formItem}>
                    <input
                      type="file"
                      accept="image/jpeg,image/gif,image/png,application/pdf"
                      className={style.eventInput}
                      onChange={(e) =>
                        setBookingData({
                          ...boodkingData,
                          identityProof: e.target.files[0],
                        })
                      }
                    />
                    {formvalidation && boodkingData.identityProof === "" && (
                      <div className={style.formValidationError}>
                        Identity proof is required.
                      </div>
                    )}
                  </div>
                </div>
                <div className={style.formItem}>
                  <labal className={style.eventLabel}>Mobile number*</labal>
                  <div className={style.formItem}>
                    <input
                      type="number"
                      className={style.eventInput}
                      value={boodkingData.mobileNumber}
                      onChange={(e) =>
                        setBookingData({
                          ...boodkingData,
                          mobileNumber: e.target.value,
                        })
                      }
                    />
                    {formvalidation && boodkingData.mobileNumber === "" && (
                      <div className={style.formValidationError}>
                        Mobile number is required.
                      </div>
                    )}
                    {!validatemobile(boodkingData.mobileNumber) &&
                      boodkingData.mobileNumber !== "" && (
                        <div className={style.formValidationError}>
                          Mobile number is not valid.
                        </div>
                      )}
                  </div>
                </div>
              </div>
              <div className={style.formRow}>
                <div className={style.formItem}>
                  <labal className={style.eventLabel}>Booking from*</labal>
                  <div className={style.formItem}>
                    <ReactDatePicker
                      selected={boodkingData.bookingFrom}
                      onChange={(date) =>
                        setBookingData({ ...boodkingData, bookingFrom: date })
                      }
                    />
                    {formvalidation && boodkingData.bookingFrom === "" && (
                      <div className={style.formValidationError}>
                        Booking From date is required.
                      </div>
                    )}
                  </div>
                </div>
                <div className={style.formItem}>
                  <labal className={style.eventLabel}>Booking till*</labal>
                  <div className={style.formItem}>
                    <ReactDatePicker
                      selected={boodkingData.bookingTill}
                      onChange={(date) =>
                        setBookingData({ ...boodkingData, bookingTill: date })
                      }
                    />
                    {formvalidation && boodkingData.bookingTill === "" && (
                      <div className={style.formValidationError}>
                        Booking till date is required.
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className={style.btnContainer}>
                <button
                  className={style.resetBtn}
                  onClick={() => setBookingData({ ...initialState })}
                >
                  Reset
                </button>

                <button
                  className={style.submitbtn}
                  onClick={() => submitBookingData()}
                >
                  Book Room
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Home;
