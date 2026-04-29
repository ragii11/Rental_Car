import express from "express";
import authMiddleware from "../middleware/auth.js";
import adminAuth from "../middleware/adminAuth.js";
import {
  createBooking,
  verifyPayment,
  getUserBookings,
  getAllBookings,
  cancelBooking,
  updateBookingStatus,
} from "../controllers/bookingController.js";

const bookingRouter = express.Router();

bookingRouter.post("/create", authMiddleware, createBooking);
bookingRouter.post("/verify", authMiddleware, verifyPayment);
bookingRouter.get("/user", authMiddleware, getUserBookings);
bookingRouter.get("/all", adminAuth, getAllBookings);
bookingRouter.post("/cancel", authMiddleware, cancelBooking);
bookingRouter.post("/status", adminAuth, updateBookingStatus);

export default bookingRouter;
