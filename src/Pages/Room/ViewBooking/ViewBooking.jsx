import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import ReactDatePicker from "react-datepicker";

import { editRoom, viewSingleRoom } from "../../../Redux/Slice/room";
import deleteIcon from "../../../util/Assets/Icon/delete.png";
import editIcon from "../../../util/Assets/Icon/edit.png";
import Loading from "../../../Component/Loading/Loading";
import CloseIcon from "../../../util/Assets/Icon/cross.png";
import { validatemobile } from "../../../util/util";
import { unAlottedMember } from "../../../Redux/Slice/booking";
import LeftArrow from "../../../util/Assets/Icon/leftArrow.png";
import RightArrow from "../../../util/Assets/Icon/rightArrow.png";

import style from "./viewBooking.module.scss";
import ReactSelect from "react-select";

const initialState = {
  flag: false,
  newPerson: false,
  bookingFrom: "",
  bookingTill: "",
  familyMember: 199,
  fullName: "",
  identityProof: "",
  memberAllotted: 0,
  mobileNumber: "",
  _id: "",
};

function ViewBooking() {
  const [edit, setEdit] = useState({ ...initialState });
  const [formvalidation, setFormvalidation] = useState(false);
  const [selectFamily, setSelectFamily] = useState({ label: "", value: "" });
  const [userCount, setUserCount] = useState({ first: 0, last: 10 });
  const [selected, setSelected] = useState("");

  const roomSlice = useSelector((state) => state.room);
  const AuthSlice = useSelector((state) => state.login);
  const BookingSlice = useSelector((state) => state.booking);

  const { state } = useLocation();
  const dispatch = useDispatch();

  console.log(roomSlice.singleRoomData, " <>?");

  useEffect(() => {
    dispatch(viewSingleRoom(state.roomId));
  }, []);

  useEffect(() => {
    if (!BookingSlice.unAlottedMember) {
      dispatch(unAlottedMember());
    }
  }, [BookingSlice.unAlottedMember]);

  const userOption = Array.isArray(BookingSlice.unAlottedMember)
    ? BookingSlice.unAlottedMember.map((m) => {
        return { value: m.fullName, lable: m.fullName };
      })
    : [{ label: "", value: "" }];

  return (
    <div className={style.viewBookingContainer}>
      {roomSlice.loading || BookingSlice.loading ? (
        <Loading />
      ) : (
        <div className={style.productDetialsContainer}>
          {Array.isArray(roomSlice.singleRoomData?.roomData) &&
            roomSlice.singleRoomData?.roomData.map((rm) => (
              <>
                <div className={style.productContainer}>
                  <label className={style.productDetialsLabel}>
                    Bhavan Name
                  </label>
                  <label className={style.productDetialsValue}>
                    {rm.bhavanData[0].bhavanName}
                  </label>
                </div>
                <div className={style.productContainer}>
                  <label className={style.productDetialsLabel}>Landmark</label>
                  <label className={style.productDetialsValue}>
                    {rm.bhavanData[0].landmark}
                  </label>
                </div>
                <div className={style.productContainer}>
                  <label className={style.productDetialsLabel}>
                    Room Number
                  </label>
                  <label className={style.productDetialsValue}>
                    {rm.roomNumber}
                  </label>
                </div>
                <div className={style.productContainer}>
                  <label className={style.productDetialsLabel}>
                    Number of Beds
                  </label>
                  <label className={style.productDetialsValue}>
                    {rm.noOfBed}
                  </label>
                </div>
                <div className={style.productContainer}>
                  <label className={style.productDetialsLabel}>
                    Empty Beds
                  </label>
                  <label className={style.productDetialsValue}>
                    {rm.noOfBed - rm.bookerIds.length}
                  </label>
                </div>
                <div className={style.userBookingListContainer}>
                  <table className={style.userBookingTable}>
                    <tr className={style.tableHeaderRow}>
                      <td className={style.tableHeaderRowItem}>#</td>
                      <td className={style.tableHeaderRowItem}>Name</td>
                      <td className={style.tableHeaderRowItem}>
                        Mobile Number
                      </td>
                      <td className={style.tableHeaderRowItem}>Booking From</td>
                      <td className={style.tableHeaderRowItem}>Booking Till</td>
                      {(AuthSlice?.loginData?.role === "superAdmin" ||
                        AuthSlice?.loginData?.role === "admin") && (
                        <td className={style.tableHeaderRowItem}>Action</td>
                      )}
                    </tr>
                    {Array.isArray(rm.userBooking) ? (
                      <>
                        {rm.userBooking.map((um, i) => (
                          <tr className={style.tableDataRow} key={um._id}>
                            <td className={style.tableDataRowItem}>{i + 1}</td>
                            <td className={style.tableDataRowItem}>
                              {um.fullName}
                            </td>
                            <td className={style.tableDataRowItem}>
                              {um.mobileNumber}
                            </td>
                            <td className={style.tableDataRowItem}>
                              {moment().format("YYYY/MM/DD", um.bookingFrom)}
                            </td>
                            <td className={style.tableDataRowItem}>
                              {moment().format("YYYY/MM/DD", um.bookingTill)}
                            </td>
                            {(AuthSlice?.loginData?.role === "superAdmin" ||
                              AuthSlice?.loginData?.role === "admin") && (
                              <td className={style.tableHeaderRowItem}>
                                <img
                                  alt="edit icon"
                                  src={editIcon}
                                  className={style.actionIcon}
                                  onClick={() => {
                                    setEdit({
                                      flag: true,
                                      roomId: rm._id,
                                      userId: um._id,
                                    });
                                    // dispatch(editRoom());
                                  }}
                                />
                                <img
                                  alt="delete icon"
                                  src={deleteIcon}
                                  className={style.actionIcon}
                                  onClick={() => {
                                    // dispatch(
                                    //   deleteLabour({
                                    //     labourId: m._id,
                                    //     imgId: m.labourIdProof,
                                    //   })
                                    // ).then((delRes) => {
                                    //   if (delRes.payload.status === 200) {
                                    //     toast.success("delete sucessfully");
                                    //   }
                                    // });
                                  }}
                                />
                              </td>
                            )}
                          </tr>
                        ))}
                      </>
                    ) : (
                      <div className={style.messageText}>
                        No booking for this Room
                      </div>
                    )}
                  </table>
                </div>
              </>
            ))}
        </div>
      )}
      {edit.flag && (
        <div className={style.idProofParentContainer}>
          <div className={style.idProofContainer}>
            <div className={style.header}>
              <div className={style.newPersonContainer}>
                <label htmlFor="newperson" className={style.label}>
                  New Person
                </label>
                <input
                  id="newperson"
                  type="checkbox"
                  className={style.newPersonInput}
                  value={edit.newPerson}
                  onChange={() =>
                    setEdit({ ...edit, newPerson: !edit.newPerson })
                  }
                />
              </div>
              <img
                src={CloseIcon}
                className={style.idProof}
                onClick={() => setEdit({ ...initialState })}
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
                        Family members*
                      </labal>
                      <div className={style.formItem}>
                        <input
                          type="number"
                          className={style.eventInput}
                          value={edit.familyMember}
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
                      <labal className={style.eventLabel}>
                        Identity proof*
                      </labal>
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
                  <div className={style.btnContainer}>
                    <button
                      className={style.resetBtn}
                      // onClick={() => setEdit({ ...initialState })}
                    >
                      Reset
                    </button>

                    <button
                      className={style.submitbtn}
                      // onClick={() => submitBookingData()}
                    >
                      Book Room
                    </button>
                  </div>
                </div>
              ) : (
                <div className={style.existingUserContainer}>
                  <div className={style.bookingFormContainer}>
                    <div className={style.formRow}>
                      <div className={style.formItem}>
                        <labal className={style.eventLabel}>
                          Full name: {edit.fullName}
                        </labal>
                        <labal className={style.eventLabel}>
                          Mobile Number: {edit.mobileNumber}
                        </labal>
                      </div>
                      <div className={style.formItem}>
                        <labal className={style.eventLabel}>
                          Family members*
                        </labal>
                        <div className={style.formItem}>
                          <input
                            type="number"
                            className={style.eventInput}
                            value={edit.familyMember}
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
                    <div className={style.btnContainer}>
                      <button
                        className={style.resetBtn}
                        // onClick={() => setEdit({ ...initialState })}
                      >
                        Reset
                      </button>

                      <button
                        className={style.submitbtn}
                        // onClick={() => submitBookingData()}
                      >
                        Book Room
                      </button>
                    </div>
                  </div>
                  <div className={style.parentUserList}>
                    <ul className={style.userList}>
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
                        <div className={style.arrowContainer}>
                          <img
                            src={LeftArrow}
                            onClick={() => {
                              if (userCount.first > 1) {
                                setUserCount({
                                  first: userCount.first - 10,
                                  last: userCount.last - 10,
                                });
                              }
                            }}
                            alt="month chnage icon"
                            className={style.refreshIocn}
                          />
                          <img
                            src={RightArrow}
                            onClick={() => {
                              if (
                                BookingSlice.unAlottedMember.length >
                                userCount.last
                              ) {
                                setUserCount({
                                  first: userCount.first + 10,
                                  last: userCount.last + 10,
                                });
                              }
                            }}
                            alt="month chnage icon"
                            className={style.refreshIocn}
                          />
                        </div>
                      </div>
                      <div className={style.userItem}>
                        <div className={style.firstCol}>Name</div>
                        <div className={style.secondCol}>Family Member</div>
                        <div className={style.thirdCol}>Member Allotted</div>
                      </div>
                      {Array.isArray(BookingSlice.unAlottedMember) &&
                        BookingSlice.unAlottedMember
                          .slice(userCount.first, userCount.last)
                          .map((m) => (
                            <li
                              className={`${style.userItem} ${
                                selected === m._id && style.selected
                              }`}
                              onClick={() => {
                                setSelected(m._id);
                                setEdit({ ...edit, ...m });
                              }}
                            >
                              <div className={style.firstCol}>{m.fullName}</div>
                              <div className={style.secondCol}>
                                {m.familyMember}
                              </div>
                              <div className={style.thirdCol}>
                                {m.memberAllotted}
                              </div>
                            </li>
                          ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewBooking;
