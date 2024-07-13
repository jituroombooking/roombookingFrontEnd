import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import moment from "moment";

import refreshIcon from "../../../util/Assets/Icon/refresh.png";
import Loading from "../../../Component/Loading/Loading";
import deleteIcon from "../../../util/Assets/Icon/delete.png";
import editIcon from "../../../util/Assets/Icon/edit.png";
import { deleteStaff, getStaff } from "../../../Redux/Slice/staff";

import style from "./staffList.module.scss";

function StaffList() {
  const StaffSlice = useSelector((state) => state.staff);
  const authData = useSelector((state) => state.login);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!StaffSlice.staffData) {
      dispatch(getStaff());
    }
  }, [StaffSlice.staffData]);

  console.log(StaffSlice.staffData, " <>?");

  return (
    <div className={style.staffContainer}>
      {StaffSlice.loading ? (
        <Loading />
      ) : (
        <>
          <div className={style.roomHeading}>
            <img
              src={refreshIcon}
              onClick={() => dispatch(getStaff())}
              className={style.refreshIocn}
            />
            <button
              className={style.addRoomBtn}
              onClick={() => navigate("/addStaff")}
            >
              Add Staff
            </button>
          </div>
          <div className={style.staffTableContainer}>
            {Array.isArray(StaffSlice.staffData) && (
              <>
                <table className={style.roomTable}>
                  <tr className={style.tableHeaderRow}>
                    <th className={style.tableHeaderRowItem}>Email</th>
                    <th className={style.tableHeaderRowItem}>Role</th>
                    <th className={style.tableHeaderRowItem}>Mobile Number</th>
                    <th className={style.tableHeaderRowItem}>Created At</th>
                    {authData.loginData.role === "superAdmin" && (
                      <th className={style.tableHeaderRowItem}>Action</th>
                    )}
                  </tr>
                  {StaffSlice.staffData.map((m, i) => (
                    <tr className={style.tableDataRow} key={m._id}>
                      <td className={style.tableDataRowItem}>{m.email}</td>
                      <td className={style.tableDataRowItem}>{m.role}</td>
                      <td className={style.tableDataRowItem}>
                        {m.mobileNumber}
                      </td>
                      <td className={style.tableDataRowItem}>
                        {moment(m.createdAt).format("DD/MM/YYYY")}
                      </td>
                      {authData.loginData.role === "superAdmin" && (
                        <td className={style.tableDataRowItem}>
                          <img
                            src={editIcon}
                            onClick={() =>
                              navigate("/addStaff", {
                                state: {
                                  staffEditData: StaffSlice.staffData[i],
                                },
                              })
                            }
                            className={style.actionIcon}
                          />
                          <img
                            src={deleteIcon}
                            onClick={() => dispatch(deleteStaff(m._id))}
                            className={style.actionIcon}
                          />
                        </td>
                      )}
                    </tr>
                  ))}
                </table>
                {StaffSlice.staffData.length === 0 && (
                  <div className={style.noData}>No Data !</div>
                )}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default StaffList;
