import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BlobProvider } from "@react-pdf/renderer";
import { toast, ToastContainer } from "react-toastify";

import refreshIcon from "../../../util/Assets/Icon/refresh.png";
import { getAttendence, markAsPaid } from "../../../Redux/Slice/attendence";
import { getDaysInMonth, months } from "../../../util/util";
import Loading from "../../../Component/Loading/Loading";
import LeftArrow from "../../../util/Assets/Icon/leftArrow.png";
import RightArrow from "../../../util/Assets/Icon/rightArrow.png";
import Invoice from "./Invoice";

import style from "./attendence.module.scss";
import "react-toastify/dist/ReactToastify.min.css";
import { getSingleLabour } from "../../../Redux/Slice/labour";
import moment from "moment";

const styles = {
  container: {
    width: "220px",
    borderRadius: "5px",
    padding: "15px 12px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
  },
  flex: { width: "100%", display: "flex", gap: "5px", alignItems: "center" },
  bold: { fontSize: "13px", fontWeight: 600 },
  thin: { fontSize: "11px", color: "#6f6f6f", fontWeight: 500 },
  btn: {
    borderRadius: "3px",
    border: "1px solid gray",
    display: "flex",
    alignItems: "center",
    gap: "2px",
    padding: "3px",
    fontSize: "11px",
    color: "#4f4f4f",
    fontWeight: 600,
    cursor: "pointer",
    userSelect: "none",
  },
};

function AttendenceView() {
  const [monthDays, setMonthDays] = useState({
    currentMonth: new Date().getMonth() + 1,
    currentYear: new Date().getFullYear(),
  });
  const [currentLabourData, setCurrentLabourData] = useState({});

  const { state } = useLocation();
  const dispatch = useDispatch();

  const date = new Date();
  const firstDay = new Date(
    date.getFullYear(),
    monthDays.currentMonth - 1,
    1
  ).toISOString();
  const lastDay = new Date(
    date.getFullYear(),
    monthDays.currentMonth,
    1
  ).toISOString();

  const AttendenceSlice = useSelector((state) => state.attendence);
  const LabourSlice = useSelector((state) => state.labour);

  useEffect(() => {
    dispatch(getAttendence({ id: state.attendenceDataId, firstDay, lastDay }));
  }, [monthDays.currentMonth]);
  useEffect(() => {
    if (!LabourSlice.singleLabourData) {
      dispatch(getSingleLabour({ id: state.attendenceDataId })).then(
        (getRes) => {
          if (getRes.payload.status === 200) {
            setCurrentLabourData(getRes.payload.data);
          }
        }
      );
    }
  }, [LabourSlice.singleLabourData]);

  const getSalaryForMonth = () => {
    let total = 0;
    Array.isArray(AttendenceSlice.attendenceData) &&
      AttendenceSlice.attendenceData.forEach((fm) => {
        if (fm.present === 1) {
          total = total + currentLabourData?.earningPerDay;
        }
      });
    return total;
  };

  const calendarData = getDaysInMonth(
    monthDays.currentMonth - 1,
    monthDays.currentYear
  ).map((dayM, dayIndex) => {
    const obj = {
      date: dayM,
      id: dayIndex,
      present: false,
    };
    Array.isArray(AttendenceSlice.attendenceData) &&
      AttendenceSlice.attendenceData.map((am) => {
        if (am.attendenceDate.split("T")[0] === dayM) {
          obj.present = true;
        }
      });
    return { ...obj };
  });

  const paymentMarking = () => {
    // if (
    //   !currentLabourData?.monthPaid.includes(
    //     new Date(new Date().getFullYear(), monthDays.currentMonth - 1, 2)
    //       .toISOString()
    //       .split("T")[0]
    //   ) ||
    //   getSalaryForMonth() !== 0
    // ) {
    const year = new Date().getFullYear(),
      month = monthDays.currentMonth;
    const firstDay = new Date(year, month - 1, 2);
    dispatch(
      markAsPaid({
        ...currentLabourData,
        firstDay: firstDay.toISOString().split("T")[0],
      })
    ).then((markAttendenc) => {
      if (markAttendenc.payload.status === 200) {
        dispatch(getAttendence()).then((getAttendenceRes) => {
          if (getAttendenceRes.payload.status === 200) {
            toast.success("Marked Paid Successfully");
            dispatch(
              getSingleLabour({
                id: state.attendenceDataId,
              })
            );
          }
        });
      }
    });
    // }
  };

  const paidStatus =
    currentLabourData?.monthPaid > 0 &&
    currentLabourData?.monthPaid.includes(
      new Date(new Date().getFullYear(), monthDays.currentMonth - 1, 2)
        .toISOString()
        .split("T")[0]
    );
  return (
    <div className={style.attendenceViewContainer}>
      {AttendenceSlice.loading ? (
        <Loading />
      ) : (
        <React.Fragment>
          <div className={style.roomHeading}>
            <ToastContainer />
            <div className={style.labourDataContainer}>
              <div>
                <div className={style.labelHeading}>
                  Labour Name:
                  <span className={style.labelValue}>
                    {currentLabourData?.labourName}
                  </span>
                </div>
                <div className={style.labelHeading}>
                  Earning/Day:
                  <span className={style.labelValue}>
                    {currentLabourData?.earningPerDay}
                  </span>
                </div>
                <div className={style.labelHeading}>
                  Job Title:
                  <span className={style.labelValue}>
                    {currentLabourData?.labourPost}
                  </span>
                </div>
                <div className={style.labelHeading}>
                  Mobile Number:
                  <span className={style.labelValue}>
                    {currentLabourData?.mobileNumber}
                  </span>
                </div>
                <div className={style.labelHeading}>
                  Paid:
                  <span className={style.labelValue}>
                    {currentLabourData?.monthPaid?.includes(
                      new Date(
                        new Date().getFullYear(),
                        monthDays.currentMonth - 1,
                        2
                      )
                        .toISOString()
                        .split("T")[0]
                    )
                      ? "Paid"
                      : "UnPaid"}
                  </span>
                </div>
              </div>
              <div className={style.monthHeading}>
                Salary for
                <span className={style.monthValue}>
                  {" "}
                  {months[monthDays.currentMonth]}{" "}
                </span>
                Month:
                <span className={style.labelValue}>
                  {getSalaryForMonth() || 0} Rs.
                </span>
              </div>
              <div className={style.actionContainer}>
                <div className={style.monthControlContainer}>
                  <div className={style.btnContainer}>
                    <div className={style.arrowContainer}>
                      {" "}
                      <img
                        src={LeftArrow}
                        onClick={() => {
                          if (monthDays.currentMonth > 1) {
                            setMonthDays({
                              ...monthDays,
                              currentMonth: monthDays.currentMonth - 1,
                            });
                          }
                        }}
                        alt="month chnage icon"
                        className={style.refreshIocn}
                      />
                      <img
                        src={RightArrow}
                        onClick={() => {
                          if (monthDays.currentMonth < 12) {
                            setMonthDays({
                              ...monthDays,
                              currentMonth: monthDays.currentMonth + 1,
                            });
                          }
                        }}
                        alt="month chnage icon"
                        className={style.refreshIocn}
                      />
                      <img
                        src={refreshIcon}
                        onClick={() =>
                          dispatch(
                            getAttendence({
                              id: currentLabourData?._id,
                              firstDay,
                              lastDay,
                            })
                          )
                        }
                        className={style.refreshIocn}
                      />
                    </div>
                    <div>
                      {getSalaryForMonth() !== 0 && (
                        <div className={style.btnContainerTwo}>
                          <BlobProvider
                            document={
                              <Invoice
                                data={{
                                  ...currentLabourData,
                                  salaryMonth: monthDays.currentMonth,
                                  salaryYear: monthDays.currentYear,
                                  salary: getSalaryForMonth(),
                                  noOfDays: Array.isArray(
                                    AttendenceSlice.attendenceData
                                  )
                                    ? AttendenceSlice.attendenceData.reduce(
                                        (result, curr) => {
                                          if (curr.present === 1) {
                                            result += 1;
                                          }
                                          return result;
                                        },
                                        0
                                      )
                                    : 0,
                                }}
                              />
                            }
                          >
                            {({ url, blob }) => (
                              <a
                                href={url}
                                target="_blank"
                                className={style.receiptbtn}
                              >
                                <span>Generate Payment receipt</span>
                              </a>
                            )}
                          </BlobProvider>
                          {console.log(
                            currentLabourData?.monthPaid?.includes(
                              new Date(
                                new Date().getFullYear(),
                                monthDays.currentMonth - 1,
                                2
                              )
                                .toISOString()
                                .split("T")[0]
                            ),
                            " <>? JACK"
                          )}
                          {!currentLabourData?.monthPaid?.includes(
                            new Date(
                              new Date().getFullYear(),
                              monthDays.currentMonth - 1,
                              2
                            )
                              .toISOString()
                              .split("T")[0]
                          ) && (
                            <button
                              onClick={() => {
                                paymentMarking();
                              }}
                              className={`${style.markAsPaidbtn}`}
                            >
                              Mark as Paid
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={style.attendenceContainer}>
            {calendarData.map((m, i) => {
              return (
                <div
                  className={`${style.dayContainer} ${
                    m.present && style.dayPresent
                  } ${
                    currentLabourData?.monthPaid?.includes(
                      new Date(
                        new Date().getFullYear(),
                        monthDays.currentMonth - 1,
                        2
                      )
                        .toISOString()
                        .split("T")[0]
                    ) && style.paid
                  }`}
                  key={`day-${m.date}`}
                >
                  <div>
                    {new Date(m.date).toLocaleString("en-us", {
                      weekday: "short",
                    })}
                  </div>
                  <div>{i + 1}</div>
                  <div>{moment(m.date).format("DD/MM/YYYY")}</div>
                </div>
              );
            })}
          </div>
        </React.Fragment>
      )}
    </div>
  );
}

export default AttendenceView;
