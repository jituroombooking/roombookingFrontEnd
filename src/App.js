import React, { Suspense, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import Header from "./Component/Header/Header";
import Loading from "./Component/Loading/Loading";

import style from "./index.module.scss";
import PageTitle from "./Component/PageTitle/PageTitle";
import LeftNavigation from "./Component/LeftNavigation/LeftNavigation";
import { useSelector } from "react-redux";

const Login = React.lazy(() => import("./Pages/Login/Login"));
const Home = React.lazy(() => import("./Pages/Home/Home"));
const Event = React.lazy(() => import("./Pages/Event/EventHome/Event"));
const EventList = React.lazy(() => import("./Pages/Event/EventList/EventList"));
const AddRoom = React.lazy(() => import("./Pages/Room/AddRoom/AddRoom"));
const RoomList = React.lazy(() => import("./Pages/Room/RoomList/RoomList"));
const ViewBooking = React.lazy(() =>
  import("./Pages/Room/ViewBooking/ViewBooking")
);
const LabourList = React.lazy(() =>
  import("./Pages/Labour/LabourList/LabourList")
);
const AddLabour = React.lazy(() =>
  import("./Pages/Labour/AddLabour/AddLabour")
);
const RoomBooking = React.lazy(() =>
  import("./Pages/Booking/RoomBookingList/RoomBookingList")
);
const MarkAttendence = React.lazy(() =>
  import("./Pages/Labour/Scanner/Scanner")
);
const AttendencView = React.lazy(() =>
  import("./Pages/Labour/Attendence/AttendenceView")
);
const StaffList = React.lazy(() => import("./Pages/Staff/StaffList/StaffList"));
const AddStaff = React.lazy(() => import("./Pages/Staff/AddStaff/AddStaff"));
const UpdateProfile = React.lazy(() =>
  import("./Pages/Staff/UpdateProfile/UpdateProfile")
);

function App() {
  const [openleftNav, setOpenLeftNav] = useState(false);

  const authData = useSelector((state) => state.login);

  const { pathname } = useLocation();

  console.log(authData, " <>?");

  return (
    <div className={style.mainApp}>
      {authData?.loginData &&
        (authData?.loginData?.role === "superAdmin" ||
          authData?.loginData?.role === "staff") && (
          <div
            className={`${style.navigation}
          ${
            openleftNav
              ? style.largVerticalNavigation
              : style.verticalNavigation
          }
        `}
          >
            <LeftNavigation
              openCloseDrawer={(openCloseFlag) => setOpenLeftNav(openCloseFlag)}
              drawerOpenClose={openleftNav}
              openleftNav={openleftNav}
            />
          </div>
        )}
      <div
        className={`${
          openleftNav
            ? style.extraMargin
            : authData?.loginData?.role === "superAdmin" ||
              authData?.loginData?.role === "staff"
            ? style.mainPage
            : style.rmMargin
        }`}
      >
        {pathname !== "/login" && (
          <Header
            openCloseDrawer={(openCloseFlag) => setOpenLeftNav(openCloseFlag)}
            drawerOpenClose={openleftNav}
          />
        )}
        <div className={style.mainPageScss}>
          <PageTitle />
          <Routes>
            <Route
              path="/login"
              element={
                <Suspense fallback={<Loading />}>
                  <Login />
                </Suspense>
              }
            />
            <Route
              path="/"
              element={
                <Suspense fallback={<Loading />}>
                  <Home />
                </Suspense>
              }
            />
            <Route
              path="/eventList"
              element={
                <Suspense fallback={<Loading />}>
                  <EventList />
                </Suspense>
              }
            />
            <Route
              path="/addEvent"
              element={
                <Suspense fallback={<Loading />}>
                  <Event />
                </Suspense>
              }
            />
            <Route
              path="/room"
              element={
                <Suspense fallback={<Loading />}>
                  <RoomList />
                </Suspense>
              }
            />
            <Route
              path="/addRoom"
              element={
                <Suspense fallback={<Loading />}>
                  <AddRoom />
                </Suspense>
              }
            />
            <Route
              path="/viewBooking"
              element={
                <Suspense fallback={<Loading />}>
                  <ViewBooking />
                </Suspense>
              }
            />
            <Route
              path="/labour"
              element={
                <Suspense fallback={<Loading />}>
                  <LabourList />
                </Suspense>
              }
            />
            <Route
              path="/addLabour"
              element={
                <Suspense fallback={<Loading />}>
                  <AddLabour />
                </Suspense>
              }
            />
            <Route
              path="/roomBooking"
              element={
                <Suspense fallback={<Loading />}>
                  <RoomBooking />
                </Suspense>
              }
            />
            <Route
              path="/markAttendence"
              element={
                <Suspense fallback={<Loading />}>
                  <MarkAttendence />
                </Suspense>
              }
            />
            <Route
              path="/attendenceView"
              element={
                <Suspense fallback={<Loading />}>
                  <AttendencView />
                </Suspense>
              }
            />
            <Route
              path="/staffList"
              element={
                <Suspense fallback={<Loading />}>
                  <StaffList />
                </Suspense>
              }
            />
            <Route
              path="/addStaff"
              element={
                <Suspense fallback={<Loading />}>
                  <AddStaff />
                </Suspense>
              }
            />
            <Route
              path="/updateProfile"
              element={
                <Suspense fallback={<Loading />}>
                  <UpdateProfile />
                </Suspense>
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
