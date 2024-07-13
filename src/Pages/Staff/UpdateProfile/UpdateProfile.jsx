import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Loading from "../../../Component/Loading/Loading";
import { validateEmail, validatemobile } from "../../../util/util";
import {
  logoutUser,
  updatePassword,
  updateProfile,
} from "../../../Redux/Slice/login";

import style from "./updateProfile.module.scss";

const initialState = {
  email: "",
  mobileNumber: "",
  fullName: "",
};

const initialStatePassword = {
  oldPassword: "",
  password: "",
  confirmPassword: "",
};

function UpdateProfile() {
  const [staffData, setStaffData] = useState({ ...initialState });
  const [formvalidation, setFormvalidation] = useState(false);
  const [passwordData, setPasswordData] = useState({ ...initialStatePassword });
  const [passwordvalidation, setPasswordvalidation] = useState(false);

  const AuthSlice = useSelector((state) => state.login);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (AuthSlice.loginData) {
      const { password, ...restProps } = AuthSlice.loginData;
      setStaffData({ ...restProps });
    }
  }, []);

  console.log(AuthSlice, " <>?");

  const updateProfileFun = () => {
    if (
      staffData.email === "" ||
      !validateEmail(staffData.email) ||
      staffData.fullName === "" ||
      staffData.mobileNumber === "" ||
      !validatemobile(staffData.mobileNumber)
    ) {
      setFormvalidation(true);
    } else {
      dispatch(updateProfile(staffData));
    }
  };

  const updatePasswordFun = () => {
    if (
      passwordData.password === "" ||
      passwordData.confirmPassword === "" ||
      passwordData.password !== passwordData.confirmPassword
    ) {
      setPasswordvalidation(true);
    } else {
      const { confirmPassword, ...restPasswordData } = passwordData;
      console.log(restPasswordData, " <>?");
      dispatch(updatePassword({ _id: staffData._id, ...restPasswordData }));
    }
  };

  return (
    <div className={style.updateProfileContainer}>
      {AuthSlice.loading ? (
        <Loading />
      ) : (
        <div className={style.updateProfileFormContainer}>
          <div className={style.loggedInAsLabel}>
            <label>Logged in as:</label>
            <label className={style.loggedInValue}>
              {AuthSlice?.loginData?.role}
            </label>
          </div>
          <button
            className={style.logoutBtn}
            onClick={() => {
              dispatch(logoutUser());
              navigate("/login");
            }}
          >
            Log out
          </button>
          <div className={style.formRow}>
            <div className={style.formItem}>
              <labal className={style.eventLabel}>Full name*</labal>
              <div className={style.formItem}>
                <input
                  className={style.eventInput}
                  value={staffData.fullName}
                  onChange={(e) =>
                    setStaffData({ ...staffData, fullName: e.target.value })
                  }
                />
                {formvalidation && staffData.fullName === "" && (
                  <div className={style.formValidationError}>
                    Full name is required
                  </div>
                )}
              </div>
            </div>
            <div className={style.formItem}>
              <labal className={style.eventLabel}>Mobile Number*</labal>
              <div className={style.formItem}>
                <input
                  className={style.eventInput}
                  value={staffData.mobileNumber}
                  onChange={(e) =>
                    setStaffData({
                      ...staffData,
                      mobileNumber: e.target.value,
                    })
                  }
                />
                {formvalidation && staffData.mobileNumber === "" && (
                  <div className={style.formValidationError}>
                    Mobile number is required
                  </div>
                )}
                {staffData.mobileNumber !== "" &&
                  !validatemobile(staffData.mobileNumber) && (
                    <div className={style.formValidationError}>
                      Mobile number is invalid
                    </div>
                  )}
              </div>
            </div>
          </div>
          <div className={style.formRow}>
            <div className={style.formItem}>
              <labal className={style.eventLabel}>Email *</labal>
              <div className={style.formItem}>
                <input
                  className={style.eventInput}
                  value={staffData.email}
                  onChange={(e) =>
                    setStaffData({ ...staffData, email: e.target.value })
                  }
                />
                {formvalidation && staffData.email === "" && (
                  <div className={style.formValidationError}>
                    Email is required
                  </div>
                )}
                {staffData.email !== "" && !validateEmail(staffData.email) && (
                  <div className={style.formValidationError}>
                    Email is invalid
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className={style.formDevider} />
          <div className={style.btnContainer}>
            <button
              className={style.resetBtn}
              onClick={() => setStaffData(initialState)}
            >
              Reset
            </button>
            <button
              className={style.submitbtn}
              onClick={() => updateProfileFun()}
            >
              Update Profile
            </button>
          </div>
          <div className={style.formRow}>
            <div className={style.formItem}>
              <labal className={style.eventLabel}>Password *</labal>
              <div className={style.formItem}>
                <input
                  type="password"
                  className={style.eventInput}
                  value={passwordData.password}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      password: e.target.value,
                    })
                  }
                />
                {passwordvalidation && passwordData.password === "" && (
                  <div className={style.formValidationError}>
                    New Password is required
                  </div>
                )}
              </div>
            </div>
            <div className={style.formItem}>
              <labal className={style.eventLabel}>Conform Password *</labal>
              <div className={style.formItem}>
                <input
                  type="password"
                  className={style.eventInput}
                  value={passwordData.confirmPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      confirmPassword: e.target.value,
                    })
                  }
                />
                {passwordvalidation && passwordData.confirmPassword === "" && (
                  <div className={style.formValidationError}>
                    Conform Password is required
                  </div>
                )}
                {passwordData.password !== "" &&
                  passwordData.confirmPassword !== "" &&
                  passwordData.password !== passwordData.confirmPassword && (
                    <div className={style.formValidationError}>
                      Password and conform is not same
                    </div>
                  )}
              </div>
            </div>
          </div>
          <div className={style.formDevider} />
          <div className={style.btnContainer}>
            <button
              className={style.resetBtn}
              onClick={() => setStaffData(initialState)}
            >
              Reset
            </button>
            <button
              className={style.submitbtn}
              onClick={() => updatePasswordFun()}
            >
              Update Password
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UpdateProfile;
