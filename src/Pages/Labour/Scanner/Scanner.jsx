import React from "react";
import QRReader from "react-qr-scanner";

import style from "./scanner.module.scss";

function Scanner({ onClose }) {
  const handleScan = (data) => {
    if (data) {
      onClose(data.text);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };
  return (
    <div className={style.scannerContainer}>
      <QRReader onError={handleError} onScan={handleScan} />
    </div>
  );
}

export default Scanner;
