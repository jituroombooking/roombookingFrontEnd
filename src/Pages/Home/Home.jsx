import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactDatePicker from "react-datepicker";
import Slider from "react-slick";
import { toast, ToastContainer } from "react-toastify";

import { getRoomCount } from "../../Redux/Slice/room";
import { validatemobile } from "../../util/util";
import { bookRoom } from "../../Redux/Slice/booking";
import Loading from "../../Component/Loading/Loading";
import { getEventData, getEventMemories } from "../../Redux/Slice/event";
import EventList from "../Event/EventList/EventList";

import AddBooking from "../Booking/AddBooking/AddBooking";
import style from "./home.module.scss";
import "react-datepicker/dist/react-datepicker.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-toastify/dist/ReactToastify.min.css";

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
var settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: false,
  arrows: false,
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
    if (!EventSlice.eventMemory) {
      dispatch(getEventMemories());
    }
  }, [EventSlice.eventMemory]);

  useEffect(() => {
    if (!EventSlice.eventData) {
      dispatch(getEventData());
    }
  }, [EventSlice.eventData]);

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
      dispatch(bookRoom(boodkingData)).then((addRes) => {
        if (addRes.payload.status === 200) {
          toast.success("Room Booked Successfully");
        }
      });
    }
  };

  if (BookingSlice.loading) {
    return <Loading />;
  }

  return (
    <div className={style.homeContainer}>
      <div className={style.mainEventMemorisContainer}>
        <ToastContainer />
        <label className={style.pageHeading}>Event Photos</label>
        {Array.isArray(EventSlice.eventMemory) &&
          EventSlice.eventMemory.length === 0 && (
            <div className={style.noData}>No Data !</div>
          )}
        <Slider {...settings} className={style.sliderContainer}>
          {Array.isArray(EventSlice.eventMemory) &&
            EventSlice.eventMemory.length !== 0 &&
            EventSlice.eventMemory.map((m) => (
              <div className={style.eventCard} key={m.id}>
                <img
                  src={`https://jituroombooking.s3.eu-north-1.amazonaws.com/event/${m.eventImg}`}
                  className={style.eventImg}
                  alt="eventimg"
                />
                <div className={style.eventTitle}>{m.eventTitle}</div>
              </div>
            ))}
        </Slider>
      </div>
      <div className={style.twoColContainer}>
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
        {(authData?.loginData.role !== "superAdmin" ||
          authData?.loginData.role !== "staff" ||
          authData?.loginData.role !== "admin") && (
          <AddBooking noBgColor={true} />
        )}
      </div>
    </div>
  );
}

export default Home;
