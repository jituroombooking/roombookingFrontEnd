import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Slide, toast, ToastContainer } from "react-toastify";
import QRCode from "qrcode";

import refreshIcon from "../../../util/Assets/Icon/refresh.png";
import deleteIcon from "../../../util/Assets/Icon/delete.png";
import editIcon from "../../../util/Assets/Icon/edit.png";
import IDProofIcon from "../../../util/Assets/Icon/id.png";
import {
  deleteLabour,
  getLabourList,
  markAttendence,
} from "../../../Redux/Slice/labour";
import QR from "../../../util/Assets/Icon/qr.png";
import Loading from "../../../Component/Loading/Loading";
import QrScaan from "../../../util/Assets/Icon/qrScan.png";
import Scanner from "../Scanner/Scanner";
import AttendenceView from "../../../util/Assets/Icon/eye.png";
import CloseIcon from "../../../util/Assets/Icon/cross.png";

import style from "./labourList.module.scss";
import "react-toastify/dist/ReactToastify.min.css";
import moment from "moment";
import PageTitle from "../../../Component/PageTitle/PageTitle";
import ViewIdProof from "../../../Component/ViewIdProof/ViewIdProof";

function LabourList() {
  const [qrId, setQrId] = useState({ id: "", name: "" });
  const [qrUrl, setQrUrl] = useState({ id: "", name: "", imgUrl: "" });
  const [openScanner, setOpenScanner] = useState({ flag: false, data: "" });
  const [idProof, setIdproof] = useState({ flag: false, id: "" });

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
        <PageTitle />
        <div className={style.actionContainer}>
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
            onClick={() => navigate("/addLabourPost")}
          >
            Add Labour Post
          </button>
          <button
            className={style.addRoomBtn}
            onClick={() => navigate("/addLabour")}
          >
            Add Labour
          </button>
        </div>
      </div>
      <div className={style.tableContainer}>
        {LabourSlice.loading ? (
          <Loading />
        ) : (
          <div className={style.labourTableContainer}>
            <ToastContainer transition={Slide} />
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
                          onClick={() =>
                            setIdproof({ flag: true, id: m.labourIdProof })
                          }
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
                          onClick={() => {
                            navigate("/addLabour", {
                              state: {
                                editLabourData: m,
                                pageTitle: "Edit Labour",
                              },
                            });
                          }}
                        />
                        <img
                          onClick={() =>
                            navigate("/attendenceView", {
                              state: {
                                pageTitle: "Attendence View",
                                attendenceDataId: m._id,
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
                          onClick={() => {
                            dispatch(
                              deleteLabour({
                                labourId: m._id,
                                imgId: m.labourIdProof,
                              })
                            ).then((delRes) => {
                              if (delRes.payload.status === 200) {
                                toast.success("delete sucessfully");
                              }
                            });
                          }}
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
                  const momentDate = moment();
                  setOpenScanner({ flag: false, data });
                  dispatch(
                    markAttendence({
                      data,
                      date: momentDate.format().split("T")[0],
                    })
                  );
                }
              }}
            />
          </div>
        </div>
      )}
      {idProof.flag && (
        <ViewIdProof
          onClose={() => setIdproof({ flag: false, id: "" })}
          idProof={idProof.id}
          path="labour"
        />
      )}
    </div>
  );
}

export default LabourList;
