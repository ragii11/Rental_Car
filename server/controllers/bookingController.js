import Booking from "../models/bookingModel.js";
import Car from "../models/carModel.js";
import PaymentHistory from "../models/paymentHistoryModel.js";
import Razorpay from "razorpay";
import crypto from "crypto";

// Initialize Razorpay instance
const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const currency = process.env.CURRENCY || "inr";

// Create a new booking + Razorpay order (payment pending)
const createBooking = async (req, res) => {
  try {
    const { carId, pickupDate, returnDate } = req.body;
    const userId = req.userId;

    // Validation
    if (!carId || !pickupDate || !returnDate) {
      return res.status(400).json({
        success: false,
        message: "Car ID, pickup date, and return date are required",
      });
    }

    // Find the car
    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({ success: false, message: "Car not found" });
    }

    // Calculate days and total price
    const pickup = new Date(pickupDate);
    const returnD = new Date(returnDate);

    if (isNaN(pickup.getTime()) || isNaN(returnD.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid date format",
      });
    }

    if (returnD <= pickup) {
      return res.status(400).json({
        success: false,
        message: "Return date must be after pickup date",
      });
    }

    const days = Math.ceil((returnD - pickup) / (1000 * 60 * 60 * 24));
    const totalPrice = days * car.price;

    // Save booking with status "Pending"
    const newBooking = new Booking({
      userId,
      carId,
      pickupDate: pickup,
      returnDate: returnD,
      days,
      totalPrice,
      status: "Pending",
      payment: false,
    });

    await newBooking.save();

    // Create Razorpay order (amount in paise — smallest currency unit)
    const razorpayOrder = await razorpayInstance.orders.create({
      amount: totalPrice * 100,
      currency: currency.toUpperCase(),
      receipt: newBooking._id.toString(),
    });

    // Store Razorpay order ID on the booking
    newBooking.razorpayOrderId = razorpayOrder.id;
    await newBooking.save();

    res.status(201).json({
      success: true,
      message: "Booking created. Complete payment to confirm.",
      booking: newBooking,
      order: razorpayOrder,
    });
  } catch (error) {
    console.error("createBooking error:", error);
    res.status(500).json({ success: false, message: "Error creating booking" });
  }
};

// Verify Razorpay payment after checkout
const verifyPayment = async (req, res) => {
  try {
    const { bookingId, razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!bookingId || !razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Missing payment verification data",
      });
    }

    // Verify signature using HMAC SHA256
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed — invalid signature",
      });
    }

    // Mark booking as paid and confirmed
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    booking.payment = true;
    booking.paymentId = razorpay_payment_id;
    booking.status = "Confirmed";
    await booking.save();

    // Log the payment history
    await PaymentHistory.create({
      bookingId: booking._id,
      userId: booking.userId,
      amount: booking.totalPrice,
      razorpayPaymentId: razorpay_payment_id,
      razorpayOrderId: razorpay_order_id,
      status: "Success",
    });

    res.json({
      success: true,
      message: "Payment verified! Booking confirmed.",
    });
  } catch (error) {
    console.error("verifyPayment error:", error);
    res.status(500).json({ success: false, message: "Error verifying payment" });
  }
};

// Get user's bookings
const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.userId })
      .populate("carId")
      .sort({ createdAt: -1 });

    res.json({ success: true, bookings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error fetching bookings" });
  }
};

// Get all bookings (Admin)
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({})
      .populate("carId")
      .populate("userId", "name email")
      .sort({ createdAt: -1 });

    res.json({ success: true, bookings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error fetching bookings" });
  }
};

// Cancel a booking
const cancelBooking = async (req, res) => {
  try {
    const { bookingId } = req.body;

    if (!bookingId) {
      return res.status(400).json({
        success: false,
        message: "Booking ID is required",
      });
    }

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    // Verify owner
    if (booking.userId.toString() !== req.userId) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    if (booking.status === "Cancelled") {
      return res.status(400).json({
        success: false,
        message: "Booking is already cancelled",
      });
    }

    booking.status = "Cancelled";
    await booking.save();

    res.json({ success: true, message: "Booking cancelled" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error cancelling booking" });
  }
};

// Update booking status (Admin)
const updateBookingStatus = async (req, res) => {
  try {
    const { bookingId, status } = req.body;

    if (!bookingId || !status) {
      return res.status(400).json({
        success: false,
        message: "Booking ID and status are required",
      });
    }

    const validStatuses = ["Pending", "Confirmed", "Cancelled", "Completed"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Status must be one of: ${validStatuses.join(", ")}`,
      });
    }

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ success: false, message: "Booking not found" });
    }

    booking.status = status;
    await booking.save();

    res.json({ success: true, message: "Booking status updated", booking });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error updating booking status" });
  }
};

export {
  createBooking,
  verifyPayment,
  getUserBookings,
  getAllBookings,
  cancelBooking,
  updateBookingStatus,
};
