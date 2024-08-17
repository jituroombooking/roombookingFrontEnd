import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { toast, ToastContainer } from "react-toastify";

import {
  deleteBooking,
  editRoom,
  editRoomNewMember,
  viewSingleRoom,
} from "../../../Redux/Slice/room";
import deleteIcon from "../../../util/Assets/Icon/delete.png";
import editIcon from "../../../util/Assets/Icon/edit.png";
import plusIcon from "../../../util/Assets/Icon/plus.png";
import Loading from "../../../Component/Loading/Loading";
import { getUnAlottedMember } from "../../../Redux/Slice/booking";
import EditPopup from "./EditPopup";
import PageTitle from "../../../Component/PageTitle/PageTitle";
import ConfirmModalPopup from "../../../Component/ConfirmModalPopup/ConfirmModalPopup";

import style from "./viewBooking.module.scss";
import "react-toastify/dist/ReactToastify.min.css";

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
  newFamilyMember: 0,
};

function ViewBooking() {
  const [edit, setEdit] = useState({ ...initialState });
  const [formvalidation, setFormvalidation] = useState(false);
  const [selectFamily, setSelectFamily] = useState({ label: "", value: "" });
  const [userCount, setUserCount] = useState({ first: 0, last: 10 });
  const [showConfirmation, setShowConfirmation] = useState({
    flag: false,
    data: null,
  });

  const roomSlice = useSelector((state) => state.room);
  const AuthSlice = useSelector((state) => state.login);
  const BookingSlice = useSelector((state) => state.booking);

  const { state } = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(viewSingleRoom(state.roomId));
  }, []);

  useEffect(() => {
    if (!BookingSlice.unAlottedMember) {
      dispatch(getUnAlottedMember());
    }
  }, [BookingSlice.unAlottedMember]);

  const userOption = Array.isArray(BookingSlice.unAlottedMember)
    ? BookingSlice.unAlottedMember.map((m) => {
        return { value: m.fullName, label: m.fullName };
      })
    : [{ label: "", value: "" }];

  const submitData = (data) => {
    setEdit({ ...initialState });
    const { flag, bhavanData, ...restProps } = data;
    restProps.bhavanId = bhavanData._id;
    dispatch(editRoom(restProps)).then((editRes) => {
      if (editRes.payload.status === 200) {
        dispatch(viewSingleRoom(state.roomId)).then((getRes) => {
          if (getRes.payload.status === 200) {
            toast.success("Room Edited Successfully");
          }
        });
      }
    });
  };

  const submitNewMemberData = (data) => {
    const {
      roomId,
      removePosition,
      bookingFrom,
      bookingTill,
      fullName,
      identityProof,
      mobileNumber,
      familyMember,
      userId,
      bhavanData,
    } = data;
    const newData = {
      roomId: roomId,
      removePosition,
      bookingFrom,
      bookingTill,
      fullName,
      identityProof,
      mobileNumber,
      userId,
      familyMember: 1,
      bhavanId: bhavanData._id,
    };

    if (data.newEdit) {
      setEdit({ ...initialState });
      dispatch(editRoomNewMember(newData)).then((editRes) => {
        if (editRes.payload.status === 200) {
          dispatch(viewSingleRoom(state.roomId)).then((getRes) => {
            if (getRes.payload.status === 200) {
              toast.success("Room Edited Successfully");
            }
          });
        }
      });
    } else {
      dispatch(editRoom(newData)).then((editRes) => {
        if (editRes.payload.status === 200) {
          dispatch(viewSingleRoom(state.roomId)).then((getRes) => {
            if (getRes.payload.status === 200) {
              toast.success("Room Edited Successfully");
            }
          });
        }
      });
    }
  };

  if (roomSlice.loading || BookingSlice.loading) {
    return <Loading />;
  }

  return (
    <div className={style.viewBookingContainer}>
      <PageTitle />
      <div className={style.productDetialsContainer}>
        <ToastContainer />
        {Array.isArray(roomSlice.singleRoomData?.roomData) &&
          roomSlice.singleRoomData?.roomData.map((rm) => (
            <>
              <div className={style.productContainer}>
                <label className={style.productDetialsLabel}>Bhavan Name</label>
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
                <label className={style.productDetialsLabel}>Room Number</label>
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
                <label className={style.productDetialsLabel}>Empty Beds</label>
                <label className={style.productDetialsValue}>
                  {rm.noOfBed - rm.bookerIds.length}
                </label>
              </div>
              {rm.noOfBed - rm.bookerIds.length > 0 && (
                <div className={style.addMemberBtnContainer}>
                  <button
                    className={style.addMemberBtn}
                    onClick={() =>
                      setEdit({
                        bhavanData: rm.bhavanData[0],
                        roomId: rm._id,
                        emptyBed: rm.noOfBed - rm.bookerIds.length,
                        flag: true,
                        newPerson: true,
                        newEdit: true,
                        familyMember: 1,
                        bookingFrom: new Date(Date.now()),
                        bookingTill: new Date(Date.now() + 3600 * 1000 * 48),
                      })
                    }
                  >
                    <img src={plusIcon} alt="plus" className={style.addIcon} />
                    New Member
                  </button>
                  <button
                    className={style.addExistingMemberBtn}
                    onClick={() => {
                      dispatch(getUnAlottedMember());
                      setEdit({
                        bhavanData: rm.bhavanData[0],
                        roomId: rm._id,
                        emptyBed: rm.noOfBed - rm.bookerIds.length,
                        flag: true,
                        newPerson: false,
                        newEdit: false,
                        familyMember: 1,
                        bookingFrom: new Date(Date.now()),
                        bookingTill: new Date(Date.now() + 3600 * 1000 * 48),
                      });
                    }}
                  >
                    <img src={plusIcon} alt="plus" className={style.addIcon} />
                    Existing Member
                  </button>
                </div>
              )}
              <div className={style.userBookingListContainer}>
                <table className={style.userBookingTable}>
                  <tr className={style.tableHeaderRow}>
                    <td className={style.tableHeaderRowItem}>#</td>
                    <td className={style.tableHeaderRowItem}>Name</td>
                    <td className={style.tableHeaderRowItem}>Mobile Number</td>
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
                                  dispatch(getUnAlottedMember());
                                  setEdit({
                                    flag: true,
                                    roomId: rm._id,
                                    userId: um._id,
                                    bhavanData: rm.bhavanData[0],
                                    removePosition: i,
                                    newPerson: false,
                                    newEdit: false,
                                    bookingFrom: new Date(Date.now()),
                                    bookingTill: new Date(
                                      Date.now() + 3600 * 1000 * 48
                                    ),
                                  });
                                }}
                              />
                              <img
                                alt="delete icon"
                                src={deleteIcon}
                                className={style.actionIcon}
                                onClick={() => {
                                  setShowConfirmation({
                                    flag: true,
                                    data: {
                                      ...um,
                                      bhavanId: rm.bhavanData[0]._id,
                                      roomId: state.roomId,
                                    },
                                  });
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
      {showConfirmation.flag && (
        <ConfirmModalPopup
          onCancle={() => setShowConfirmation(false)}
          onSuccess={() => {
            dispatch(
              deleteBooking({
                userId: showConfirmation.data._id,
                roomId: showConfirmation.data.roomId,
                bhavanId: showConfirmation.data.bhavanId,
              })
            ).then((deleteRes) => {
              dispatch(viewSingleRoom(state.roomId)).then((getRes) => {
                if (getRes.payload.status === 200) {
                  toast.success("Member deleted successfully");
                  setShowConfirmation({ flag: false, data: null });
                }
              });
            });
          }}
        />
      )}
      {edit.flag && (
        <EditPopup
          setEdit={setEdit}
          edit={edit}
          submitData={submitData}
          submitNewMemberData={submitNewMemberData}
          reInitilize={() => setEdit({ ...initialState })}
          formvalidation={formvalidation}
          setFormvalidation={setFormvalidation}
          setSelectFamily={setSelectFamily}
          selectFamily={selectFamily}
          userOption={userOption}
          unAlottedMember={
            Array.isArray(BookingSlice.unAlottedMember)
              ? BookingSlice.unAlottedMember
              : []
          }
        />
      )}
    </div>
  );
}

export default ViewBooking;
