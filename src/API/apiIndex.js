const v1 = "/api/v1";

const signinV1 = `${v1}/login`;
const roomV1 = `${v1}/room`;
const roomBookingV1 = `${v1}/booking`;
const labourV1 = `${v1}/labour`;
const attendence = `${v1}/attendence`;
const eventv1 = `${v1}/event`;

export const apiList = {
  login: signinV1,
  updateProfile: `${signinV1}/updateProfile`,
  updatePassword: `${signinV1}/updatePassword`,
  addRoom: `${roomV1}/addRoom`,
  getRoom: roomV1,
  getRoomCount: `${roomV1}/count`,
  updateRoom: `${roomV1}/updateRoom`,
  deleteRoom: roomV1,
  roomBooking: `${roomBookingV1}/addBooking`,
  viewSingleRoom: `${roomV1}/viewSingleBooking`,
  getBookedRooms: `${roomBookingV1}/getRooms`,
  deleteBooking: `${roomBookingV1}/deleteBookedRoom`,
  addLabour: `${labourV1}/add`,
  getLabour: `${labourV1}/`,
  markAttendence: `${labourV1}/markAttendence`,
  getAttendence: `${attendence}`,
  addEvent: `${eventv1}/add`,
  getEventData: `${eventv1}`,
  editEventData: `${eventv1}/edit`,
  deleteEventData: `${eventv1}/delete`,
  addStaff: `${signinV1}/addStaff`,
  getStaff: `${signinV1}/getStaff`,
  deleteStaff: `${signinV1}/deleteStaff`,
};
