import express from "express";
import authMiddleware from "../middleware/auth.js";
import adminMiddleware from "../middleware/admin.js";
import {
  createBooking,
  getUserBookings,
  getAllBookings,
  cancelBooking,
  updateBookingStatus,
} from "../controllers/bookingController.js";

const bookingRouter = express.Router();

bookingRouter.post("/create", authMiddleware, createBooking);
bookingRouter.get("/user", authMiddleware, getUserBookings);
bookingRouter.get("/all", authMiddleware, adminMiddleware, getAllBookings);
bookingRouter.post("/cancel", authMiddleware, cancelBooking);
bookingRouter.post("/status", authMiddleware, adminMiddleware, updateBookingStatus);

export default bookingRouter;

