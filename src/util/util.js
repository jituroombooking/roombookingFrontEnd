import moment from "moment";

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
