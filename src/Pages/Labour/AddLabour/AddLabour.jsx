import React, { useState } from "react";

import { labourPost, validatemobile } from "../../../util/util";
import { useDispatch, useSelector } from "react-redux";
import { addLabour } from "../../../Redux/Slice/labour";
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

  const dispatch = useDispatch();

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
      dispatch(addLabour(labourData));
      setLabourData(initialState);
    }
  };

  return (
    <div className={style.addLabourContainer}>
      {LabourSlice.loading ? (
        <Loading />
      ) : (
        <>
          <div className={style.formContainer}>
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
                    className={style.eventInput}
                    onChange={(e) =>
                      setLabourData({
                        ...labourData,
                        labourIdProof: e.target.files[0],
                      })
                    }
                  />
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
                    onChange={(e) => {
                      setLabourData({
                        ...labourData,
                        labourPost: e.target.value,
                      });
                    }}
                  >
                    <option className={style.selectOption}>Select Post</option>
                    {labourPost.map((m, i) => (
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

            {/* {state?.roomEditData ? (
              <button
                className={style.submitbtn}
                onClick={() => updateRoomData()}
              >
                Update Room
              </button>
            ) : ( */}
            <button
              className={style.submitbtn}
              onClick={() => submitLabourData()}
            >
              Add Labour
            </button>
            {/* )} */}
          </div>
        </>
      )}
    </div>
  );
}

export default AddLabour;
