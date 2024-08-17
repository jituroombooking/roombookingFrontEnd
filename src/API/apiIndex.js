const v1 = "/api/v1";

const signinV1 = `${v1}/login`;
const roomV1 = `${v1}/room`;
const roomBookingV1 = `${v1}/booking`;
const labourV1 = `${v1}/labour`;
const attendenceV1 = `${v1}/attendence`;
const eventv1 = `${v1}/event`;
const eventMemoryv1 = `${v1}/eventMemory`;

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
  updateBooking: `${roomBookingV1}/updateBooking`,
  bulkUpload: `${roomBookingV1}/bulkUpload`,
  autoAssign: `${roomBookingV1}/autoAssign`,
  viewSingleRoom: `${roomV1}/viewSingleBooking`,
  editRoom: `${roomV1}/edit`,
  getBookedRooms: `${roomBookingV1}/getRooms`,
  deleteBooking: `${roomBookingV1}/deleteBookedRoom`,
  unAlottedMember: `${roomBookingV1}/unAlottedMember`,
  editRoomWithUser: `${roomBookingV1}/editRoom`,
  editRoomWithNewUser: `${roomBookingV1}/editRoomWithNewUser`,
  deleteRoomEdit: `${roomBookingV1}/deleteRoom`,
  addLabour: `${labourV1}/add`,
  deleteLabour: `${labourV1}`,
  updateLabour: `${labourV1}/update`,
  getLabour: `${labourV1}/`,
  markAttendence: `${labourV1}/markAttendence`,
  getAttendence: `${attendenceV1}`,
  getSingleLabour: `${labourV1}`,
  addEvent: `${eventv1}/add`,
  getEventData: `${eventv1}`,
  editEventData: `${eventv1}/edit`,
  addEventMemory: `${eventMemoryv1}/add`,
  getEventMemory: `${eventMemoryv1}`,
  editEventMemory: `${eventMemoryv1}/edit`,
  deleteEventMemory: `${eventMemoryv1}/delete`,
  deleteEventData: `${eventv1}/delete`,
  addStaff: `${signinV1}/addStaff`,
  getStaff: `${signinV1}/getStaff`,
  deleteStaff: `${signinV1}/deleteStaff`,
  getLabourPost: `${labourV1}/labourPost`,
  addLabourPost: `${labourV1}/addLabourPost`,
  deleteLabourPost: `${labourV1}/deletePost`,
  markAsPaid: `${labourV1}/paid`,
};
