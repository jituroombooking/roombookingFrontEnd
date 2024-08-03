import React, { useMemo, useState } from "react";
import ReactSelect from "react-select";
import moment from "moment";
import ReactDatePicker from "react-datepicker";
import ToggleButton from "react-toggle-button";
import ReactTable from "../../../Component/ReactTable/ReactTable";
import CloseIcon from "../../../util/Assets/Icon/cross.png";
import IDProofIcon from "../../../util/Assets/Icon/id.png";

import style from "./viewBooking.module.scss";
import "react-datepicker/dist/react-datepicker.css";
import ViewIdProof from "../../../Component/ViewIdProof/ViewIdProof";

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
  setFormvalidation,
}) {
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);

  const existingMemberColumn = useMemo(
    () => [
      {
        id: "select",
        Header: "Select",
        accessor: (data) => {
          return (
            <input
              type="checkbox"
              className={style.selectmemberBox}
              checked={selected._id === data._id}
              onChange={() => {
                setSelected(data);
                setEdit({ ...edit, ...data });
              }}
            />
          );
        },
      },
      {
        id: "name",
        Header: "Name",
        accessor: (data) => <div>{data.fullName}</div>,
      },
      {
        id: "member",
        Header: "Member",
        columns: [
          {
            id: "familyMember",
            Header: "Total",
            accessor: (data) => <div>{data.familyMember}</div>,
          },
          {
            id: "memberAllotted",
            Header: "Allotted",
            accessor: (data) => <div>{data.memberAllotted}</div>,
          },
          {
            id: "pending",
            Header: "Un-Allotted",
            accessor: (data) => (
              <div>{data.familyMember - data.memberAllotted}</div>
            ),
          },
        ],
      },
    ],
    [selected]
  );

  const submitNewPerson = () => {
    if (
      edit.emptyBed > 1 &&
      (edit.newFamilyMember === 0 || !edit.newFamilyMember)
    ) {
      setFormvalidation(true);
    } else {
      submitData(edit);
    }
  };

  const submitBookingData = () => {
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
                    Family members* (Max {edit.emptyBed} member can be allotted)
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
                {selected !== "" ? (
                  <>
                    <div className={style.row}>
                      <div
                        className={`${style.rowItem} ${style.nameIconContainer}`}
                      >
                        <label className={style.labelValue}>
                          Full Name: {edit.fullName}
                        </label>
                        <label className={style.labelValue}>
                          <img
                            src={IDProofIcon}
                            className={`${style.idProof} ${style.lmargin}`}
                            onClick={() => {
                              edit.identityProof && setOpen(true);
                            }}
                          />
                          <div
                            className={`${style.idProofParentContainer} ${
                              open ? style.block : style.hidden
                            }`}
                          >
                            <ViewIdProof
                              idProof={edit.identityProof}
                              path="userbooking"
                              onClose={() => setOpen(false)}
                            />
                          </div>
                        </label>
                      </div>
                      <div className={style.rowItem}>
                        <label className={style.labelValue}>
                          Mobile Number : {edit.mobileNumber}
                        </label>
                      </div>
                      <div className={style.rowItem}>
                        <label className={style.labelValue}></label>
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
                          Total Members: {edit.familyMember}.
                        </label>
                        <label
                          className={`${style.labelValue} ${style.lmargin}`}
                        >
                          Alotted Member: {edit.memberAllotted}
                        </label>
                      </div>
                      {edit.emptyBed > 1 ? (
                        <div>
                          <div className={style.formItem}>
                            <labal className={style.eventLabel}>
                              Family members* (Max {edit.emptyBed} member can be
                              allotted)
                            </labal>
                            <div className={style.formItem}>
                              <input
                                type="number"
                                className={style.eventInput}
                                value={
                                  !edit.emptyBed ? 1 : edit.newFamilyMember
                                }
                                disabled={!edit.emptyBed}
                                onBlur={(e) => {
                                  if (
                                    parseInt(e.target.value) > edit.emptyBed
                                  ) {
                                    setEdit({
                                      ...edit,
                                      newFamilyMember: edit.emptyBed,
                                    });
                                  }
                                }}
                                onChange={(e) =>
                                  setEdit({
                                    ...edit,
                                    newFamilyMember: parseInt(e.target.value),
                                  })
                                }
                              />
                              {formvalidation &&
                                (edit.newFamilyMember === 0 ||
                                  !edit.newFamilyMember) && (
                                  <div className={style.formValidationError}>
                                    New Family members is required.
                                  </div>
                                )}
                            </div>
                          </div>
                          <div className={`${style.rowItem} ${style.tmargin}`}>
                            <label className={`${style.labelValue} `}>
                              {edit.newFamilyMember} Family Member from "
                              {edit.fullName}" will be added to{" "}
                              {edit.bhavanData.bhavanName} Bhavan
                            </label>
                          </div>
                        </div>
                      ) : (
                        <div className={style.rowItem}>
                          <label className={style.labelValue}>
                            One Family Member from "{edit.fullName}" will be
                            added to {edit.bhavanData.bhavanName} Bhavan
                          </label>
                        </div>
                      )}
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
                  </>
                ) : (
                  <div className={style.row}>
                    <div className={style.rowItem}>
                      <label className={style.labelValue}>
                        Select fammily member from table
                      </label>
                    </div>
                  </div>
                )}
              </div>
              <div className={style.parentUserList}>
                <div className={style.headerContainer}>
                  <ReactSelect
                    className={style.selectFilter}
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
                <ReactTable
                  columns={existingMemberColumn}
                  data={unAlottedMember.filter((f) =>
                    f.fullName.includes(selectFamily.value)
                  )}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EditPopup;
