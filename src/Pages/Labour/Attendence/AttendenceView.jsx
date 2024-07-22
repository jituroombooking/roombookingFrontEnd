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
    dispatch(
      getAttendence({ id: state.attendenceData._id, firstDay, lastDay })
    );
  }, [monthDays.currentMonth]);
  // useEffect(() => {}, []);

  const getSalaryForMonth = () => {
    let total = 0;
    AttendenceSlice.attendenceData.forEach((fm) => {
      if (fm.present === 1) {
        total = total + state.attendenceData.earningPerDay;
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

  const data =
    Array.isArray(LabourSlice.labourData) &&
    LabourSlice.labourData.filter((f) => {
      console.log(f._id, "===", state.attendenceData._id, " <>?>");
      return f._id === state.attendenceData._id;
    });

  console.log(
    state.attendenceData.monthPaid,
    " <>??",
    new Date(
      new Date().getFullYear(),
      monthDays.currentMonth - 1,
      2
    ).toISOString()
  );

  const ab = [];
  ab.includes();

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
                    {state.attendenceData.labourName}
                  </span>
                </div>
                <div className={style.labelHeading}>
                  Earning/Day:
                  <span className={style.labelValue}>
                    {state.attendenceData.earningPerDay}
                  </span>
                </div>
                <div className={style.labelHeading}>
                  Job Title:
                  <span className={style.labelValue}>
                    {state.attendenceData.labourPost}
                  </span>
                </div>
                <div className={style.labelHeading}>
                  Mobile Number:
                  <span className={style.labelValue}>
                    {state.attendenceData.mobileNumber}
                  </span>
                </div>
                <div className={style.labelHeading}>
                  Paid:
                  <span className={style.labelValue}>
                    {state.attendenceData.monthPaid.length > 0 &&
                      state.attendenceData.monthPaid.find(
                        (f) =>
                          f ===
                          new Date(
                            new Date().getFullYear(),
                            monthDays.currentMonth - 1,
                            2
                          ).toISOString()
                      )}
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
                  {Array.isArray(AttendenceSlice.attendenceData)
                    ? getSalaryForMonth()
                    : 0}{" "}
                  Rs.
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
                              id: state.attendenceData._id,
                              firstDay,
                              lastDay,
                            })
                          )
                        }
                        className={style.refreshIocn}
                      />
                    </div>
                    <div>
                      <div className={style.btnContainerTwo}>
                        <BlobProvider
                          document={
                            <Invoice
                              data={{
                                ...state.attendenceData,
                                salary: Array.isArray(
                                  AttendenceSlice.attendenceData
                                )
                                  ? getSalaryForMonth()
                                  : 0,
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
                        <button
                          onClick={() => {
                            const year = new Date().getFullYear(),
                              month = new Date().getMonth() + 1;
                            const firstDay = new Date(year, month - 1, 2);
                            dispatch(
                              markAsPaid({
                                ...state.attendenceData,
                                firstDay,
                              })
                            ).then((markAttendenc) => {
                              if (markAttendenc.payload.status === 200) {
                                dispatch(getAttendence()).then(
                                  (getAttendenceRes) => {
                                    if (
                                      getAttendenceRes.payload.status === 200
                                    ) {
                                      toast.success("Marked Paid Successfully");
                                    }
                                  }
                                );
                              }
                            });
                          }}
                          className={style.markAsPaidbtn}
                        >
                          Mark as Paid
                        </button>
                      </div>
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
                  }`}
                  key={`day-${m.date}`}
                >
                  <div>
                    {new Date(m.date).toLocaleString("en-us", {
                      weekday: "short",
                    })}
                  </div>
                  <div>{i + 1}</div>
                  <div>{m.date}</div>
                </div>
              );
            })}
          </div>
        </React.Fragment>
      )}
      {/* {receipt.flag && (
        <div className={style.idProofParentContainer}>
          <div className={style.idProofContainer}>
            <div className={style.header}>
              <img
                src={CloseIcon}
                className={style.idProof}
                onClick={() => setReceipt({ flag: false, data: null })}
              />
            </div>
            <Document>
              <Page size="A4" style={styles.page}>
                <View style={styles.titleContainer}>
                  <Text style={styles.reportTitle}>TITLE</Text>
                </View>
                <View style={styles.invoiceNoContainer}>
                  <Text style={styles.label}>Invoice No:</Text>
                  <Text style={styles.invoiceDate}>001</Text>
                </View>
                <View style={styles.invoiceDateContainer}>
                  <Text style={styles.label}>Date: </Text>
                  <Text>20/08/1992</Text>
                </View>
                <View style={styles.headerContainer}>
                  <Text style={styles.billTo}>Bill To:</Text>
                  <Text>JACK</Text>
                  <Text>address</Text>
                  <Text>9876543211</Text>
                  <Text>abc@gmail.com</Text>
                </View>
                <View style={styles.tableContainer}>
                  <View style={styles.container}>
                    <Text style={styles.description}>Item Description</Text>
                    <Text style={styles.qty}>Qty</Text>
                    <Text style={styles.rate}>@</Text>
                    <Text style={styles.amount}>Amount</Text>
                  </View>
                  <View style={styles.row} key="!">
                    <Text style={styles.description}>description</Text>
                    <Text style={styles.qty}>23</Text>
                    <Text style={styles.rate}>240</Text>
                    <Text style={styles.amount}>10000</Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.description}>TOTAL</Text>
                    <Text style={styles.total}>20000</Text>
                  </View>
                  <View style={styles.titleContainer}>
                    <Text style={styles.reportTitle}>
                      Thank you for your business
                    </Text>
                  </View>
                </View>
              </Page>
            </Document>
            );
          </div>
        </div>
      )} */}
    </div>
  );
}

export default AttendenceView;
