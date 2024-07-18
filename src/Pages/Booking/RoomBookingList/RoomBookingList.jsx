import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
// import { Viewer, Worker } from "@react-pdf-viewer/core";
// import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

// import "@react-pdf-viewer/core/lib/styles/index.css";
// import "@react-pdf-viewer/default-layout/lib/styles/index.css";

import Loading from "../../../Component/Loading/Loading";
import refreshIcon from "../../../util/Assets/Icon/refresh.png";
import deleteIcon from "../../../util/Assets/Icon/delete.png";
import { deleteBookedRoom, getBookedRooms } from "../../../Redux/Slice/booking";
import IDProofIcon from "../../../util/Assets/Icon/id.png";
import CloseIcon from "../../../util/Assets/Icon/cross.png";
// import ReactPDF from "react-pdf";

import style from "./roomBookingList.module.scss";

function RoomBookingList() {
  const [idProof, setIdproof] = useState({ flag: false, id: "" });
  const RoomBookingSlice = useSelector((state) => state.booking);
  const AuthDataSlice = useSelector((state) => state.login);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!RoomBookingSlice.booking) {
      dispatch(getBookedRooms());
    }
  }, [RoomBookingSlice.booking]);

  return (
    <div className={style.roomBookingContainer}>
      {RoomBookingSlice.loading ? (
        <Loading />
      ) : (
        <div>
          <div className={`${style.roomHeading} `}>
            <img
              src={refreshIcon}
              onClick={() => dispatch(getBookedRooms())}
              className={style.refreshIocn}
            />
          </div>
          <div className={style.roomBookingTableContainer}>
            {Array.isArray(RoomBookingSlice.booking) && (
              <table className={style.roomTable}>
                <tr className={style.tableHeaderRow}>
                  <th
                    scope="col"
                    rowspan="2"
                    className={style.tableHeaderRowItem}
                  >
                    Sr #
                  </th>
                  <th
                    scope="col"
                    rowspan="2"
                    className={style.tableHeaderRowItem}
                  >
                    Booking Name
                  </th>
                  <th colspan="2" className={style.tableHeaderRowItem}>
                    Members
                  </th>
                  <th
                    scope="col"
                    rowspan="2"
                    className={style.tableHeaderRowItem}
                  >
                    Mobile Number
                  </th>
                  <th className={style.tableHeaderRowItem}>Id Proof</th>
                  <th
                    scope="col"
                    rowspan="2"
                    className={style.tableHeaderRowItem}
                  >
                    Booking From
                  </th>
                  <th
                    scope="col"
                    rowspan="2"
                    className={style.tableHeaderRowItem}
                  >
                    Booking Till
                  </th>
                  {AuthDataSlice.loginData.role === "superAdmin" && (
                    <th className={style.tableHeaderRowItem}>Action</th>
                  )}
                </tr>
                <tr>
                  <th
                    scope="col"
                    className={`${style.tableHeaderRowItem} ${style.extraCol}`}
                  >
                    Total
                  </th>
                  <th
                    scope="col"
                    className={`${style.tableHeaderRowItem} ${style.extraCol}`}
                  >
                    Alloted
                  </th>
                </tr>
                {RoomBookingSlice.booking.map((m, i) => (
                  <tr className={style.tableDataRow} key={m._id}>
                    <td className={style.tableDataRowItem}>{i + 1}</td>
                    <td className={style.tableDataRowItem}>{m.fullName}</td>
                    <td className={style.tableDataRowItem}>{m.familyMember}</td>
                    <td className={style.tableDataRowItem}>
                      {m.memberAllotted}
                    </td>
                    <td className={style.tableDataRowItem}>{m.mobileNumber}</td>
                    <td className={style.tableDataRowItem}>
                      <img
                        src={IDProofIcon}
                        className={style.idProof}
                        onClick={() =>
                          setIdproof({ flag: true, id: m.identityProof })
                        }
                      />
                    </td>
                    <td className={style.tableDataRowItem}>
                      {moment().format("YYYY/MM/DD", m.bookingFrom)}
                    </td>
                    <td className={style.tableDataRowItem}>
                      {moment().format("YYYY/MM/DD", m.bookingTill)}
                    </td>
                    {AuthDataSlice.loginData.role === "superAdmin" && (
                      <td className={style.tableDataRowItem}>
                        <img
                          src={deleteIcon}
                          onClick={() => dispatch(deleteBookedRoom(m._id))}
                          className={style.actionIcon}
                        />
                      </td>
                    )}
                  </tr>
                ))}
              </table>
            )}
            {Array.isArray(RoomBookingSlice.booking) &&
              RoomBookingSlice.booking.length === 0 && (
                <div className={style.noData}>No Data !</div>
              )}
          </div>
        </div>
      )}
      {idProof.flag && (
        <div className={style.idProofParentContainer}>
          <div className={style.idProofContainer}>
            <div className={style.header}>
              <img
                src={CloseIcon}
                className={style.idProof}
                onClick={() => setIdproof({ flag: false, id: "" })}
              />
            </div>
            <div>
              {idProof.id.split(".").pop() === "pdf" ? (
                <embed
                  src={`https://jituroombooking.s3.eu-north-1.amazonaws.com/userbooking/${idProof.id}`}
                  type="application/pdf"
                  width="100%"
                  height="600px"
                ></embed>
              ) : (
                <img
                  src={`https://jituroombooking.s3.eu-north-1.amazonaws.com/userbooking/${idProof.id}`}
                  alt="userId"
                  className={style.userIdImg}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default RoomBookingList;
