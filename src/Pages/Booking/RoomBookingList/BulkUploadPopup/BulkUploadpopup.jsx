import React, { useState } from "react";
import * as XLSX from "xlsx";
import { toast, ToastContainer } from "react-toastify";

import CloseIcon from "../../../../util/Assets/Icon/cross.png";
import ExcelUpload from "../../../../util/Assets/Icon/excel.png";
import userbookingDummy from "../../../../util/Assets/Data/UserBooking.xlsx";

import style from "./bulkUploadpopup.module.scss";
import "react-toastify/dist/ReactToastify.min.css";

function BulkUploadpopup({ onSuccess, onCancle }) {
  const [xlsxData, setxlsxData] = useState(null);
  const [load, setLoad] = useState(false);

  const handleUpload = (file) => {
    console.log(file.size, " <>??");

    if (file.size < 1000000) {
      const reader = new FileReader();
      reader.onloadstart = () => {
        setLoad(true);
      };
      reader.onload = (event) => {
        const wrokbook = XLSX.read(event.target.result, {
          type: "binary",
          raw: true,
          cellDates: true,
        });
        const sheetName = wrokbook.SheetNames[0];
        const sheet = wrokbook.Sheets[sheetName];
        const sheetData = XLSX.utils.sheet_to_json(sheet);

        console.log(sheetData[0], " <>??");

        setxlsxData(sheetData);
      };
      reader.onloadend = () => {
        setLoad(false);
      };

      reader.readAsBinaryString(file);
    } else {
      toast.error("File should be less than 1 MB");
    }
  };

  return (
    <div className={style.popupContainer}>
      <ToastContainer />
      <div className={style.popupModal}>
        <div className={style.popupModalHeader}>
          <img src={CloseIcon} className={style.idProof} onClick={onCancle} />
        </div>
        {load ? (
          <div className={style.loadingContainer}>
            <div className={style.loading} />
          </div>
        ) : (
          <div className={style.modalbody}>
            <div className={style.infoContainer}>
              <label>Uploading data should be in this format. </label>
              <label>Click to view the Excel sheet. </label>
              <a href={userbookingDummy} download="userBookingDummy.xlsx">
                <img
                  src={ExcelUpload}
                  alt="Excel sheet"
                  className={style.sheetIcon}
                />
              </a>
            </div>
            {!Array.isArray(xlsxData) ? (
              <div className={style.uploadFormContainer}>
                <label className={style.fileLabel}>
                  Excel File:
                  <div className={style.validationMessage}>
                    Max file 1MB
                  </div>{" "}
                </label>
                <input
                  type="file"
                  accept=".csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                  onChange={(e) => {
                    if (e.target.files[0]) {
                      handleUpload(e.target.files[0]);
                    }
                  }}
                />
              </div>
            ) : (
              <label>
                Number of Booking will get created: {xlsxData.length}
              </label>
            )}
          </div>
        )}
        <div className={style.btnContainer}>
          {xlsxData && (
            <button
              className={style.successBtn}
              onClick={() => onSuccess(xlsxData)}
            >
              Upload
            </button>
          )}
          <button className={style.cancleBtn} onClick={onCancle}>
            Cancle
          </button>
        </div>
      </div>
    </div>
  );
}

export default BulkUploadpopup;
