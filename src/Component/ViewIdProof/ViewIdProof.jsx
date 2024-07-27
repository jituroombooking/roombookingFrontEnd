import React from "react";

import CloseIcon from "../../util/Assets/Icon/cross.png";

import style from "./viewIdProof.module.scss";

function ViewIdProof({ onClose, idProof }) {
  return (
    <div className={style.idProofParentContainer}>
      <div className={style.idProofContainer}>
        <div className={style.header}>
          <img src={CloseIcon} className={style.idProof} onClick={onClose} />
        </div>
        <div>
          {idProof.split(".").pop() === "pdf" ? (
            <embed
              src={`https://jituroombooking.s3.eu-north-1.amazonaws.com/userbooking/${idProof}`}
              type="application/pdf"
              width="100%"
              height="600px"
            ></embed>
          ) : (
            <img
              src={`https://jituroombooking.s3.eu-north-1.amazonaws.com/userbooking/${idProof}`}
              alt="userId"
              className={style.userIdImg}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewIdProof;
