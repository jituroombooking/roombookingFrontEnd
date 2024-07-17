import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import { viewSingleRoom } from "../../../Redux/Slice/room";

import style from "./viewBooking.module.scss";
import Loading from "../../../Component/Loading/Loading";

function ViewBooking() {
  const roomSlice = useSelector((state) => state.room);

  const { state } = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(viewSingleRoom(state.roomId));
  }, []);

  return (
    <div className={style.viewBookingContainer}>
      {roomSlice.loading ? (
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
    </div>
  );
}

export default ViewBooking;
