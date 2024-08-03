import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ReactDatePicker from "react-datepicker";
import { toast, ToastContainer } from "react-toastify";
import { useLocation } from "react-router-dom";

import PageTitle from "../../../Component/PageTitle/PageTitle";
import { bookRoom } from "../../../Redux/Slice/booking";
import { validatemobile } from "../../../util/util";
import ViewIdProof from "../../../Component/ViewIdProof/ViewIdProof";

import style from "./addBooking.module.scss";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.min.css";

const initialState = {
  fullName: "",
  familyMember: 0,
  identityProof: "",
  bookingFrom: new Date(Date.now()),
  bookingTill: new Date(Date.now() + 3600 * 1000 * 48),
  mobileNumber: "",
};

function AddBooking({ noBgColor = false }) {
  const [boodkingData, setBookingData] = useState({ ...initialState });
  const [formvalidation, setFormValidation] = useState(false);
  const [showProof, setShowProof] = useState({ flag: false, id: "" });

  const dispatch = useDispatch();
  const { state } = useLocation();

  useEffect(() => {
    if (state) {
      setBookingData({ ...state?.editBookingData?.userBookingData });
    }
  }, [state]);

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

  return (
    <div
      className={`${style.addBookingContainer} ${noBgColor && style.noBgColor}`}
    >
      <PageTitle />
      <ToastContainer />
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
              {state?.editBookingData && (
                <button
                  onClick={() =>
                    setShowProof({ flag: true, id: boodkingData.identityProof })
                  }
                >
                  View Id Proof
                </button>
              )}
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
                maxDate={boodkingData.bookingTill}
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
                minDate={boodkingData.bookingFrom}
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
      {showProof.flag && (
        <ViewIdProof
          onClose={() => setShowProof({ flag: false, id: "" })}
          idProof={showProof.id}
          path="userbooking"
        />
      )}
    </div>
  );
}

export default AddBooking;
