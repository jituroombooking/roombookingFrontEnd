import React, { useEffect, useState } from "react";

import style from "./addLabourPost.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  addLabourPost,
  deletePostItem,
  getLabourPost,
} from "../../../Redux/Slice/labour";
import Loading from "../../../Component/Loading/Loading";
import EditIcon from "../../../util/Assets/Icon/edit.png";
import DeleteIcon from "../../../util/Assets/Icon/delete.png";

const initialState = {
  labourPost: "",
};

function AddLabourPost() {
  const [labourPost, setLabourPost] = useState({ ...initialState });
  const [formvalidation, setFormValidation] = useState(false);

  const LabourSlice = useSelector((state) => state.labour);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!LabourSlice.labourPost) {
      dispatch(getLabourPost());
    }
  }, [LabourSlice.labourPost]);

  const submitLabourPostData = () => {
    if (labourPost.labourPost === "") {
      setFormValidation(true);
    } else {
      dispatch(addLabourPost({ labourPost: labourPost.labourPost }));
    }
  };

  return (
    <div className={style.addStaffContainer}>
      {LabourSlice.loading ? (
        <Loading />
      ) : (
        <div className={style.container}>
          <div className={style.labourPostList}>
            <ul className={style.labourPostListUl}>
              {Array.isArray(LabourSlice.labourPost) &&
                LabourSlice.labourPost.map((m) => (
                  <li className={style.labourPostItem}>
                    <div>{m.labourPost}</div>
                    <div className={style.iconContainer}>
                      <img
                        src={DeleteIcon}
                        className={style.icon}
                        onClick={() => dispatch(deletePostItem(m._id))}
                      />
                    </div>
                  </li>
                ))}
            </ul>
          </div>
          <div className={style.labourPostForm}>
            <div className={style.formRow}>
              <div className={style.formItem}>
                <labal className={style.eventLabel}>Labour post*</labal>
                <div className={style.formItem}>
                  <input
                    className={style.eventInput}
                    value={labourPost.labourPost}
                    onChange={(e) =>
                      setLabourPost({
                        ...labourPost,
                        labourPost: e.target.value,
                      })
                    }
                  />
                  {formvalidation && labourPost.labourPost === "" && (
                    <div className={style.formValidationError}>
                      Labour Post is required
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className={style.btnContainer}>
              <button
                className={style.resetBtn}
                onClick={() => setLabourPost(initialState)}
              >
                Reset
              </button>
              <button
                className={style.submitbtn}
                onClick={() => submitLabourPostData()}
              >
                Add Staff
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddLabourPost;
