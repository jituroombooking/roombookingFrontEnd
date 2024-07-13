import Event from "../Icon/event.png";
import Room from "../Icon/room.png";
import Dashboard from "../Icon/dashobard.png";
import Worker from "../Icon/workers.png";
import Booking from "../Icon/booking.png";
import Staff from "../Icon/staff.png";

export const routeData = [
  {
    id: 0,
    name: "Dashboard",
    route: "/",
    subRoutes: ["/"],
    img: Dashboard,
    role: ["staff"],
  },
  {
    id: 1,
    name: "Event",
    route: "/eventList",
    subRoutes: ["/eventList", "/addEvent"],
    img: Event,
    role: ["staff"],
  },
  {
    id: 2,
    name: "Rooms",
    route: "/room",
    subRoutes: ["/room", "/addRoom", "/viewBooking"],
    img: Room,
    role: ["staff"],
  },
  {
    id: 3,
    name: "Room Booking",
    route: "/roomBooking",
    subRoutes: ["/roomBooking"],
    img: Booking,
    role: ["staff"],
  },
  {
    id: 4,
    name: "Labour",
    route: "/labour",
    subRoutes: ["/labour", "/addLabour", "/attendenceView"],
    img: Worker,
    role: ["staff"],
  },
  {
    id: 5,
    name: "Staff",
    route: "/staffList",
    subRoutes: ["/addStaff", "/updateProfile", "/staffList"],
    img: Staff,
    role: ["admin"],
  },
];
