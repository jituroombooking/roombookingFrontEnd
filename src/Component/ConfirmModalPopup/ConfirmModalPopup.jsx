import React from "react";
import { Tooltip } from "react-tooltip";

import CloseIcon from "../../util/Assets/Icon/cross.png";
import ConfirmIcon from "../../util/Assets/Icon/confirm.png";
import CancleIcon from "../../util/Assets/Icon/multiply.png";

import style from "./confirmModalPopup.module.scss";
import "react-tooltip/dist/react-tooltip.css";

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
          <img
            data-tooltip-id="confirm"
            className={style.successBtn}
            src={ConfirmIcon}
            onClick={onSuccess}
          />
          <Tooltip id="confirm" place="bottom" content={<div>Confirm</div>} />
          <img
            data-tooltip-id="cancle"
            className={style.successBtn}
            onClick={onCancle}
            src={CancleIcon}
          />
          <Tooltip id="cancle" place="bottom" content={<div>Cancle</div>} />
        </div>
      </div>
    </div>
  );
}

export default ConfirmModalPopup;
