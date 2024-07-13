import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import BackArraow from "../../util/Assets/Icon/backArrow.png";

import style from "./pageTitle.module.scss";

function PageTitle() {
  const AuthSlice = useSelector((state) => state.login);

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const goBack = () => {
    if (window.history.length && window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/", { replace: true });
    }
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
      {pathname.split("/").pop()}
    </div>
  );
}

export default PageTitle;
