import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import QRCode from "qrcode";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer";
import moment from "moment";

import refreshIcon from "../../../util/Assets/Icon/refresh.png";
import deleteIcon from "../../../util/Assets/Icon/delete.png";
import editIcon from "../../../util/Assets/Icon/edit.png";
import IDProofIcon from "../../../util/Assets/Icon/id.png";
import { getLabourList, markAttendence } from "../../../Redux/Slice/labour";
import QR from "../../../util/Assets/Icon/qr.png";
import Loading from "../../../Component/Loading/Loading";
import QrScaan from "../../../util/Assets/Icon/qrScan.png";
import Scanner from "../Scanner/Scanner";
import AttendenceView from "../../../util/Assets/Icon/eye.png";
import CloseIcon from "../../../util/Assets/Icon/cross.png";

import style from "./labourList.module.scss";

function LabourList() {
  const [qrId, setQrId] = useState({ id: "", name: "" });
  const [qrUrl, setQrUrl] = useState({ id: "", name: "", imgUrl: "" });
  const [openScanner, setOpenScanner] = useState({ flag: false, data: "" });

  const LabourSlice = useSelector((state) => state.labour);
  const authData = useSelector((state) => state.login);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (qrUrl.imgUrl !== "" && qrUrl.id !== "") {
      const downloadLink = document.createElement("a");
      const fileName = `${qrUrl.name}${qrUrl.id.slice(6)}.png`;
      downloadLink.href = qrUrl.imgUrl;
      downloadLink.download = fileName;
      downloadLink.click();
    }
  }, [qrUrl.imgUrl]);

  useEffect(() => {
    if (!LabourSlice.labourData) {
      dispatch(getLabourList());
    }
  }, [LabourSlice.labourData]);

  const generateQR = useCallback((data) => {
    QRCode.toDataURL(data.id, { type: "image/png", width: "350" })
      .then((img) => {
        setQrUrl({ id: data.id, name: data.name, imgUrl: img });
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={style.labourContainer}>
      <div className={style.roomHeading}>
        <img
          src={QrScaan}
          className={style.refreshIocn}
          onClick={() => setOpenScanner({ flag: true })}
        />
        <img
          src={refreshIcon}
          onClick={() => dispatch(getLabourList())}
          className={style.refreshIocn}
        />
        <button
          className={style.addRoomBtn}
          onClick={() => navigate("/addLabour")}
        >
          Add Labour
        </button>
      </div>
      <div className={style.tableContainer}>
        {LabourSlice.loading ? (
          <Loading />
        ) : (
          <div className={style.labourTableContainer}>
            {Array.isArray(LabourSlice.labourData) && (
              <>
                <table className={style.labourTable}>
                  <tr className={style.tableHeaderRow}>
                    <th className={style.tableHeaderRowItem}>Sr no.</th>
                    <th className={style.tableHeaderRowItem}>Labour Name</th>
                    <th className={style.tableHeaderRowItem}>Labour Post</th>
                    <th className={style.tableHeaderRowItem}>mobile Number</th>
                    <th className={style.tableHeaderRowItem}>Id Proof</th>
                    <th className={style.tableHeaderRowItem}>
                      Earning Per Day
                    </th>
                    <th className={style.tableHeaderRowItem}>Action</th>
                  </tr>
                  {LabourSlice.labourData.map((m, i) => (
                    <tr className={style.tableDataRow} key={m._id}>
                      <td className={style.tableDataRowItem}>{i + 1}</td>
                      <td className={style.tableDataRowItem}>{m.labourName}</td>
                      <td className={style.tableDataRowItem}>{m.labourPost}</td>
                      <td className={style.tableDataRowItem}>
                        {m.mobileNumber}
                      </td>
                      <td className={style.tableDataRowItem}>
                        <img
                          src={IDProofIcon}
                          className={style.idProof}
                          alt="id"
                        />
                      </td>
                      <td className={style.tableDataRowItem}>
                        {m.earningPerDay}
                      </td>
                      <td className={style.tableDataRowItem}>
                        <img
                          src={QR}
                          alt="QR"
                          onClick={() => {
                            setQrId({
                              id: m._id,
                              name: m.labourName,
                            });
                            generateQR({ id: m._id, name: m.labourName });
                          }}
                          className={style.actionIcon}
                        />
                        <img
                          alt="QR"
                          src={editIcon}
                          className={style.actionIcon}
                        />
                        <img
                          onClick={() =>
                            navigate("/attendenceView", {
                              state: {
                                attendenceData: m,
                              },
                            })
                          }
                          alt="Attencence view"
                          src={AttendenceView}
                          className={style.actionIcon}
                        />
                        <img
                          alt="delete icon"
                          src={deleteIcon}
                          className={style.actionIcon}
                        />
                      </td>
                    </tr>
                  ))}
                </table>
                {Array.isArray(LabourSlice.labourData) &&
                  LabourSlice.labourData.length === 0 && (
                    <div className={style.noData}>No Data !</div>
                  )}
              </>
            )}
          </div>
        )}
      </div>
      {openScanner.flag && (
        <div className={style.scannerContainer}>
          <div className={style.scannerInnerContainer}>
            <img
              src={CloseIcon}
              onClick={() => setOpenScanner(false)}
              className={style.scannerCloseIcon}
            />
            <Scanner
              onClose={(data) => {
                if (data) {
                  const date = new Date();
                  date.setDate(date.getDate() - 2);
                  setOpenScanner({ flag: false, data });
                  dispatch(
                    markAttendence({
                      data,
                      date: date.toISOString().split("T")[0],
                    })
                  );
                }
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default LabourList;
