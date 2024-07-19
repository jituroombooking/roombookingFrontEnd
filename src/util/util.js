import moment from "moment";
import nature1 from "./Assets/Image/event1.jpg";
import nature2 from "./Assets/Image/event2.jpg";
import nature3 from "./Assets/Image/event3.jpeg";

export const validatemobile = (mobileNumber) => {
  return mobileNumber.match(/^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$/);
};

export const labourPost = [
  {
    label: "Cleaning",
    vale: "cleaning",
  },
  {
    label: "Chef",
    vale: "chef",
  },
];

export const staffPost = [
  {
    label: "Admin",
    vale: "admin",
  },
  {
    label: "Staff",
    vale: "staff",
  },
];

export const getAllDaysInMonth = (month, year) =>
  Array.from(
    { length: new Date(year, month, 0).getDate() },
    (_, i) => new Date(year, month - 1, i + 1)
  );

export function getDaysInMonth(month, year) {
  var date = new Date(year, month, 1);
  var days = [];
  while (date.getMonth() === month) {
    days.push(moment(date).format("YYYY-MM-DD"));
    date.setDate(date.getDate() + 1);
  }
  return days;
}

export const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const months = [
  "",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export const eventdata = [
  {
    id: 0,
    title: "Nature Image",
    img: nature1,
  },
  {
    id: 1,
    title: "Nature Image",
    img: nature2,
  },
  {
    id: 2,
    title: "Nature Image",
    img: nature3,
  },
  {
    id: 3,
    title: "Nature Image",
    img: nature1,
  },
  {
    id: 4,
    title: "Nature Image",
    img: nature2,
  },
  {
    id: 5,
    title: "Nature Image",
    img: nature3,
  },
  {
    id: 6,
    title: "Nature Image",
    img: nature1,
  },
  {
    id: 7,
    title: "Nature Image",
    img: nature2,
  },
  {
    id: 8,
    title: "Nature Image",
    img: nature3,
  },
  {
    id: 9,
    title: "Nature Image",
    img: nature1,
  },
];
