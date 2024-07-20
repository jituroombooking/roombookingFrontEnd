import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import { labourPost, validatemobile } from "../../../util/util";
import { useDispatch, useSelector } from "react-redux";
import {
  addLabour,
  getLabourPost,
  updateLabour,
} from "../../../Redux/Slice/labour";
import Loading from "../../../Component/Loading/Loading";

import style from "./addLabour.module.scss";

const initialState = {
  labourName: "",
  mobileNumber: "",
  earningPerDay: 0,
  labourPost: "",
  labourIdProof: "",
};

function AddLabour() {
  const [labourData, setLabourData] = useState({ ...initialState });
  const [formvalidation, setFormValidation] = useState(false);

  const LabourSlice = useSelector((state) => state.labour);
  const location = useLocation();

  useEffect(() => {
    if (location.state?.editLabourData) {
      console.log(location.state?.editLabourData, " <>?");
      setLabourData({ ...location.state?.editLabourData });
    }
  }, [location.state]);

  useEffect(() => {
    if (!LabourSlice.labourPost) {
      dispatch(getLabourPost());
    }
  }, [LabourSlice.labourPost]);

  const dispatch = useDispatch();

  const updateLabourData = () => {
    if (
      labourData.labourName === "" ||
      labourData.mobileNumber === "" ||
      labourData.earningPerDay === 0 ||
      labourData.labourPost === "" ||
      labourData.labourIdProof === ""
    ) {
      setFormValidation(true);
    } else {
      labourData.oldProofId = location.state?.editLabourData.labourIdProof;
      dispatch(updateLabour(labourData)).then((addRes) => {
        if (addRes.payload.status === 200) {
          toast.success("Updated sucessfully");
        }
      });
      setLabourData(initialState);
    }
  };

  const submitLabourData = () => {
    if (
      labourData.labourName === "" ||
      labourData.mobileNumber === "" ||
      labourData.earningPerDay === 0 ||
      labourData.labourPost === "" ||
      labourData.labourIdProof === ""
    ) {
      setFormValidation(true);
    } else {
      dispatch(addLabour(labourData)).then((addRes) => {
        console.log(addRes.payload.status);
        if (addRes.payload.status === 201) {
          toast.success("Added sucessfully");
        }
      });
      setLabourData(initialState);
    }
  };
  const labourPostList = Array.isArray(LabourSlice.labourPost)
    ? LabourSlice.labourPost.map((m) => {
        return {
          label: m.labourPost,
          value: m.labourPost,
        };
      })
    : [];

  console.log(labourPostList);

  return (
    <div className={style.addLabourContainer}>
      {LabourSlice.loading ? (
        <Loading />
      ) : (
        <>
          <div className={style.formContainer}>
            <ToastContainer />
            <div className={style.formRow}>
              <div className={style.formItem}>
                <labal className={style.eventLabel}>Labour name*</labal>
                <div className={style.formItem}>
                  <input
                    className={style.eventInput}
                    value={labourData.labourName}
                    onChange={(e) =>
                      setLabourData({
                        ...labourData,
                        labourName: e.target.value,
                      })
                    }
                  />
                  {formvalidation && labourData.labourName === "" && (
                    <div className={style.formValidationError}>
                      Labour name is required
                    </div>
                  )}
                </div>
              </div>
              <div className={style.formItem}>
                <labal className={style.eventLabel}>Mobile number*</labal>
                <div className={style.formItem}>
                  <input
                    type="number"
                    className={style.eventInput}
                    value={labourData.mobileNumber}
                    onChange={(e) =>
                      setLabourData({
                        ...labourData,
                        mobileNumber: e.target.value,
                      })
                    }
                  />
                  {formvalidation && labourData.mobileNumber === "" && (
                    <div className={style.formValidationError}>
                      Mobile number is required.
                    </div>
                  )}
                  {!validatemobile(labourData.mobileNumber) &&
                    labourData.mobileNumber !== "" && (
                      <div className={style.formValidationError}>
                        Mobile number is not valid.
                      </div>
                    )}
                </div>
              </div>
            </div>
            <div className={style.formRow}>
              <div className={style.formItem}>
                <labal className={style.eventLabel}>Labour Id Proof*</labal>
                <div className={style.formItem}>
                  <input
                    type="file"
                    accept="image/jpeg,image/gif,image/png,application/pdf"
                    className={style.eventInput}
                    onChange={(e) =>
                      setLabourData({
                        ...labourData,
                        labourIdProof: e.target.files[0],
                      })
                    }
                  />
                  {location.state?.editLabourData.labourIdProof &&
                  location.state?.editLabourData.labourIdProof
                    .split(".")
                    .pop() === "pdf" ? (
                    <embed
                      style={{ height: "320px" }}
                      src={`https://jituroombooking.s3.eu-north-1.amazonaws.com/labour/${location.state?.editLabourData.labourIdProof}`}
                      type="application/pdf"
                      width="100%"
                      height="600px"
                    ></embed>
                  ) : location.state?.editLabourData.labourIdProof
                      .split(".")
                      .pop() !== undefined ? (
                    <img
                      src={`https://jituroombooking.s3.eu-north-1.amazonaws.com/labour/${location.state?.editLabourData.labourIdProof}`}
                      alt="userId"
                      className={style.userIdImg}
                    />
                  ) : (
                    <></>
                  )}
                  {formvalidation && labourData.labourIdProof === "" && (
                    <div className={style.formValidationError}>
                      Labour Id Proof is required
                    </div>
                  )}
                </div>
              </div>
              <div className={style.formItem}>
                <labal className={style.eventLabel}>Earning Per Day*</labal>
                <div className={style.formItem}>
                  <input
                    type="number"
                    className={style.eventInput}
                    value={labourData.earningPerDay}
                    onChange={(e) =>
                      setLabourData({
                        ...labourData,
                        earningPerDay: parseInt(e.target.value),
                      })
                    }
                  />
                  {formvalidation && labourData.earningPerDay === 0 && (
                    <div className={style.formValidationError}>
                      Earning per day is required.
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className={style.formRow}>
              <div className={style.formItem}>
                <labal className={style.eventLabel}>Labour Post*</labal>
                <div className={style.formItem}>
                  <select
                    className={style.select}
                    value={labourData.labourPost}
                    onChange={(e) => {
                      setLabourData({
                        ...labourData,
                        labourPost: e.target.value,
                      });
                    }}
                  >
                    <option className={style.selectOption}>Select Post</option>
                    {labourPostList.map((m, i) => (
                      <option
                        className={style.selectOption}
                        key={i}
                        value={m.vale}
                      >
                        {m.label}
                      </option>
                    ))}
                  </select>
                  {formvalidation && labourData.labourPost === "" && (
                    <div className={style.formValidationError}>
                      Labour Post is required
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className={style.formDevider} />
          <div className={style.btnContainer}>
            <button
              className={style.resetBtn}
              onClick={() => setLabourData({ ...initialState })}
            >
              Reset
            </button>
            <button
              className={style.submitbtn}
              onClick={() =>
                location.state?.editLabourData.labourIdProof
                  ? updateLabourData()
                  : submitLabourData()
              }
            >
              {location.state?.editLabourData ? "Edit" : "Add"} Labour
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default AddLabour;
