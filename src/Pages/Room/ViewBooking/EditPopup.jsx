import React, { useState } from "react";
import ReactSelect from "react-select";
import moment from "moment";
import ReactDatePicker from "react-datepicker";
import ToggleButton from "react-toggle-button";

import CloseIcon from "../../../util/Assets/Icon/cross.png";

import style from "./viewBooking.module.scss";
import "react-datepicker/dist/react-datepicker.css";

function EditPopup({
  setEdit,
  edit,
  reInitilize,
  formvalidation,
  setSelectFamily,
  selectFamily,
  userOption,
  unAlottedMember,
  submitData,
  submitNewMemberData,
}) {
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);

  console.log(edit, " <>? IN EDIT ");

  const submitNewPerson = () => {
    submitData(edit);
  };

  const submitBookingData = () => {
    console.log(edit, " <>? Edit ");
    submitNewMemberData(edit);
  };

  return (
    <div className={style.idProofParentContainer}>
      <div className={style.idProofContainer}>
        <div className={style.header}>
          <div className={style.newPersonContainer}>
            {!edit.newEdit && (
              <div className={style.subheading}>
                <ToggleButton
                  inactiveLabel=""
                  activeLabel=""
                  value={edit.newPerson}
                  onToggle={() => {
                    setEdit({ ...edit, newPerson: !edit.newPerson });
                  }}
                />
                <label className={style.alottedLabel}>
                  {edit.newPerson ? "New" : "Existing"} Member
                </label>
              </div>
            )}
          </div>
          <img
            src={CloseIcon}
            className={style.idProof}
            onClick={reInitilize}
          />
        </div>
        <div className={style.parentBookingFormContainer}>
          {edit.newPerson ? (
            <div className={style.bookingFormContainer}>
              <div className={style.formRow}>
                <div className={style.formItem}>
                  <labal className={style.eventLabel}>Full name*</labal>
                  <div className={style.formItem}>
                    <input
                      className={style.eventInput}
                      value={edit.fullName}
                      onChange={(e) =>
                        setEdit({
                          ...edit,
                          fullName: e.target.value,
                        })
                      }
                    />
                    {formvalidation && edit.fullName === "" && (
                      <div className={style.formValidationError}>
                        Full name is required.
                      </div>
                    )}
                  </div>
                </div>
                <div className={style.formItem}>
                  <labal className={style.eventLabel}>
                    Family members* (Max {edit.emptyBed} member can be alotted)
                  </labal>
                  <div className={style.formItem}>
                    <input
                      type="number"
                      className={style.eventInput}
                      value={!edit.emptyBed ? 1 : edit.familyMember}
                      disabled={!edit.emptyBed}
                      onBlur={(e) => {
                        if (parseInt(e.target.value) > edit.emptyBed) {
                          setEdit({ ...edit, familyMember: edit.emptyBed });
                        }
                      }}
                      onChange={(e) =>
                        setEdit({
                          ...edit,
                          familyMember: parseInt(e.target.value),
                        })
                      }
                    />
                    {formvalidation && edit.fullName === "" && (
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
                        setEdit({
                          ...edit,
                          identityProof: e.target.files[0],
                        })
                      }
                    />
                    {formvalidation && edit.identityProof === "" && (
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
                      value={edit.mobileNumber}
                      onChange={(e) =>
                        setEdit({
                          ...edit,
                          mobileNumber: e.target.value,
                        })
                      }
                    />
                    {formvalidation && edit.mobileNumber === "" && (
                      <div className={style.formValidationError}>
                        Mobile number is required.
                      </div>
                    )}
                    {/* {edit.mobileNumber !== "" &&
          !validatemobile(edit.mobileNumber) && (
            <div className={style.formValidationError}>
              Mobile number is not valid.
            </div>
          )} */}
                  </div>
                </div>
              </div>
              <div className={style.formRow}>
                <div className={style.formItem}>
                  <labal className={style.eventLabel}>Booking from*</labal>
                  <div className={style.formItem}>
                    <ReactDatePicker
                      selected={edit.bookingFrom}
                      onChange={(date) =>
                        setEdit({ ...edit, bookingFrom: date })
                      }
                    />
                    {formvalidation && edit.bookingFrom === "" && (
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
                      selected={edit.bookingTill}
                      onChange={(date) =>
                        setEdit({ ...edit, bookingTill: date })
                      }
                    />
                    {formvalidation && edit.bookingTill === "" && (
                      <div className={style.formValidationError}>
                        Booking till date is required.
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className={style.formDevider} />
              <div className={style.btnContainer}>
                <button
                  className={style.resetBtn}
                  // onClick={() => setEdit({ ...initialState })}
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
          ) : (
            <div className={style.existingUserContainer}>
              <div className={style.bookingFormContainer}>
                <div className={style.row}>
                  <div className={style.rowItem}>
                    <label className={style.labelValue}>
                      Full Name: {edit.fullName}
                    </label>
                  </div>
                  <div className={style.rowItem}>
                    <label className={style.labelValue}>
                      Mobile Number : {edit.mobileNumber}
                    </label>
                  </div>
                  <div className={style.rowItem}>
                    <label className={style.labelValue}>
                      <button
                        className={`${style.viewIdBtn} ${
                          !edit.identityProof && style.btnDisable
                        }`}
                        onClick={() => {
                          console.log("again clicked <>?");
                          edit.identityProof && setOpen(true);
                        }}
                      >
                        View ID Proof
                      </button>
                      <div
                        className={`${style.idProofParentContainer} ${
                          open ? style.block : style.hidden
                        }`}
                      >
                        <div className={style.idProofContainer}>
                          <div className={style.closeHeader}>
                            <button
                              className={style.closeBtn}
                              onClick={() => setOpen(false)}
                            >
                              Close
                            </button>
                          </div>
                          <div>
                            {edit.identityProof &&
                            edit.identityProof.split(".").pop() === "pdf" ? (
                              <div className={style.pdfContainer}>
                                <embed
                                  src={`https://jituroombooking.s3.eu-north-1.amazonaws.com/userbooking/${edit.identityProof}`}
                                  type="application/pdf"
                                  width="100%"
                                  height="600px"
                                />
                              </div>
                            ) : (
                              <img
                                src={`https://jituroombooking.s3.eu-north-1.amazonaws.com/userbooking/${edit.identityProof}`}
                                alt="userId"
                                className={style.userIdImg}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </label>
                  </div>
                  <div className={style.rowItem}>
                    <label className={style.labelValue}>
                      Booking from:{" "}
                      {moment(edit.bookingFrom).format("DD/MM/YYYY")}
                    </label>
                  </div>
                  <div className={style.rowItem}>
                    <label className={style.labelValue}>
                      Booking TIll :{" "}
                      {moment(edit.bookingTill).format("DD/MM/YYYY")}
                    </label>
                  </div>
                  <div className={style.rowItem}>
                    <label className={style.labelValue}>
                      Family Members: {edit.familyMember}
                    </label>
                  </div>
                  <div className={style.rowItem}>
                    <label className={style.labelValue}>
                      Alotted Member :{edit.memberAllotted}
                    </label>
                  </div>
                  <div className={style.rowItem}>
                    <label className={style.labelValue}>
                      One Family Member from "{edit.fullName}" will be added to{" "}
                      {edit.bhavanData.bhavanName} Bhavan
                    </label>
                  </div>
                </div>

                <div className={style.btnContainer}>
                  <button
                    className={style.resetBtn}
                    // onClick={() => setEdit({ ...initialState })}
                  >
                    Reset
                  </button>

                  <button
                    className={style.submitbtn}
                    onClick={() => submitNewPerson()}
                  >
                    Add Family Member
                  </button>
                </div>
              </div>
              <div className={style.parentUserList}>
                <div className={style.headerContainer}>
                  <ReactSelect
                    className={style.selectFilter}
                    // styles={colourStyles}
                    placeholder={
                      selectFamily.value === ""
                        ? "Family Names"
                        : selectFamily.value
                    }
                    value={selectFamily.value}
                    defaultValue={selectFamily.value}
                    onChange={(e) => setSelectFamily(e)}
                    options={userOption}
                  />
                  <div className={style.labelContainer}>
                    <label className={style.countLabel}>
                      Count:{unAlottedMember.length || 0}
                    </label>
                  </div>
                </div>
                <div className={style.userItem}>
                  <div className={style.firstCol}>Name</div>
                  <div className={style.secondCol}>Family Member</div>
                  <div className={style.thirdCol}>Member Allotted</div>
                </div>
                <ul className={style.userList}>
                  {unAlottedMember
                    .filter((f) => f.fullName.includes(selectFamily.value))
                    .map((m) => (
                      <li
                        className={`${style.userItem} ${
                          selected === m._id && style.selectedCell
                        }`}
                        onClick={() => {
                          setSelected(m._id);
                          setEdit({ ...edit, ...m });
                        }}
                      >
                        <div className={style.firstCol}>{m.fullName}</div>
                        <div className={style.secondCol}>{m.familyMember}</div>
                        <div className={style.thirdCol}>{m.memberAllotted}</div>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EditPopup;
