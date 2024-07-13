import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import userAvatar from "../../util/Assets/Icon/userAvatar.png";
import { logoutUser } from "../../Redux/Slice/login";

import style from "./header.module.scss";

function Header() {
  const AuthSlice = useSelector((state) => state.login);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className={style.headerContainer}>
      {JSON.stringify(AuthSlice.loginData) != "{}" && (
        <button
          className={style.buttonToggleMenu}
          // onClick={() => openCloseDrawer(!drawerOpenClose)}
        >
          {/* <div className={style.menuLine} />
          <div className={style.menuLine} />
          <div className={style.menuLine} /> */}
        </button>
      )}
      {JSON.stringify(AuthSlice.loginData) != "{}" ? (
        <div
          className={style.userAvatarContainer}
          onClick={() => {
            navigate("/updateProfile");
          }}
        >
          <img src={userAvatar} className={style.userAvatarIcon} />
        </div>
      ) : (
        <div className={style.loginBtnContainer}>
          <button
            onClick={() => {
              dispatch(logoutUser());
              navigate("/login");
            }}
          >
            Login
          </button>
        </div>
      )}
    </div>
  );
}

export default Header;
