import React from "react";

import style from "./popupContainer.module.scss";

function PopupContainer({ children }) {
  return <div className={style.popupContainer}>{children}</div>;
}

export default PopupContainer;
