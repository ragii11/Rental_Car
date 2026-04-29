import Admin from "../models/adminModel.js";
import Car from "../models/carModel.js";
import Booking from "../models/bookingModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Create admin JWT token
const createAdminToken = (id) => {
  return jwt.sign({ id, role: "admin" }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// Admin login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required" });
    }

    // Find admin
    const admin = await Admin.findOne({ email: email.toLowerCase() });
    if (!admin) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid admin credentials" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid admin credentials" });
    }

    // Generate token
    const token = createAdminToken(admin._id);

    res.json({ success: true, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error logging in" });
  }
};

// Add car
const addCar = async (req, res) => {
  try {
    const { name, type, year, seats, fuel, transmission, location, price, description, image, features } = req.body;

    // Validation
    if (!name || !type || !year || !seats || !fuel || !transmission || !location || !price) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided",
      });
    }

    if (price <= 0) {
      return res.status(400).json({
        success: false,
        message: "Price must be greater than 0",
      });
    }

    if (seats <= 0 || year < 1900) {
      return res.status(400).json({
        success: false,
        message: "Invalid seats or year",
      });
    }

    const car = new Car({
      name,
      type,
      year,
      seats,
      fuel,
      transmission,
      location,
      price,
      description: description || "",
      image: image || "",
      features: features || [],
    });

    await car.save();
    res.json({ success: true, message: "Car added successfully", car });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error adding car" });
  }
};

// List all cars (admin view)
const listCars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.json({ success: true, cars });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error fetching cars" });
  }
};

// Update car
const updateCar = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Validate updates
    if (updates.price && updates.price <= 0) {
      return res.status(400).json({
        success: false,
        message: "Price must be greater than 0",
      });
    }

    if (updates.seats && updates.seats <= 0) {
      return res.status(400).json({
        success: false,
        message: "Seats must be greater than 0",
      });
    }

    const car = await Car.findByIdAndUpdate(id, updates, { new: true });
    if (!car) {
      return res.status(404).json({ success: false, message: "Car not found" });
    }

    res.json({ success: true, message: "Car updated successfully", car });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error updating car" });
  }
};

// Delete car
const deleteCar = async (req, res) => {
  try {
    const { id } = req.params;

    const car = await Car.findByIdAndDelete(id);
    if (!car) {
      return res.status(404).json({ success: false, message: "Car not found" });
    }

    res.json({ success: true, message: "Car deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error deleting car" });
  }
};

// Get all bookings (admin view)
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("userId", "name email").populate("carId", "name");
    res.json({ success: true, bookings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error fetching bookings" });
  }
};

// Seed default admin (called once on first server start if no admin exists)
const seedAdmin = async () => {
  try {
    const existingAdmin = await Admin.findOne({});
    if (!existingAdmin) {
      const defaultPassword = process.env.ADMIN_DEFAULT_PASSWORD || "admin123";
      if (!process.env.ADMIN_DEFAULT_PASSWORD) {
        console.warn("⚠️  ADMIN_DEFAULT_PASSWORD not set in .env — using insecure fallback!");
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(defaultPassword, salt);

      const defaultEmail = process.env.ADMIN_DEFAULT_EMAIL || "admin@carrental.com";
      const admin = new Admin({
        email: defaultEmail,
        password: hashedPassword,
      });
      await admin.save();
      console.log(
        `Default admin created — email: ${defaultEmail}`
      );
      console.log("⚠️  Change the default admin password immediately!");
    }
  } catch (error) {
    console.error("Error seeding admin:", error.message);
  }
};

export { adminLogin, addCar, listCars, updateCar, deleteCar, getAllBookings, seedAdmin };
