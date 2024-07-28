import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import BackArraow from "../../util/Assets/Icon/backArrow.png";

import style from "./pageTitle.module.scss";

function PageTitle() {
  const AuthSlice = useSelector((state) => state.login);

  const { pathname, state } = useLocation();
  const navigate = useNavigate();

  const goBack = () => {
    if (window.history.length && window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/", { replace: true });
    }
  };

  const getPageTitle = () => {
    let str = "";
    const pageName = pathname.split("/").pop();
    for (let i = 0; i < pageName.length; i++) {
      if (pageName[i] === pageName[i].toLocaleUpperCase()) {
        str += ` ${pageName[i]}`;
      } else {
        str += pageName[i];
      }
    }
    return str;
  };

  return (
    <div className={style.pageTitle}>
      {AuthSlice?.loginFlag && (
        <img
          onClick={() => goBack()}
          src={BackArraow}
          className={style.actionIcon}
          alt="back arrow"
        />
      )}
      {(state?.pageTitle && state?.pageTitle) || getPageTitle()}
    </div>
  );
}

export default PageTitle;
