import React from "react";

import CloseIcon from "../../util/Assets/Icon/cross.png";

import style from "./confirmModalPopup.module.scss";

function ConfirmModalPopup({
  onCancle,
  onSuccess,
  descText = "Please confirm to delete",
}) {
  return (
    <div className={style.popupContainer}>
      <div className={style.popupModal}>
        <div className={style.popupModalHeader}>
          <img src={CloseIcon} className={style.idProof} onClick={onCancle} />
        </div>
        <div className={style.modalbody}>{descText}</div>
        <div className={style.btnContainer}>
          <button className={style.successBtn} onClick={onSuccess}>
            Confirm
          </button>
          <button className={style.cancleBtn} onClick={onCancle}>
            Cancle
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModalPopup;
