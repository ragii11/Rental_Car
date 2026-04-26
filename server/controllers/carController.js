import Car from "../models/carModel.js";
import imagekit from "../config/imagekit.js";
import fs from "fs";

// Add a new car (Admin)
const addCar = async (req, res) => {
  try {
    const { name, type, year, seats, fuel, transmission, location, price, description, features } = req.body;

    // Validation
    if (!name || !type || !year || !seats || !fuel || !transmission || !location || !price) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided",
      });
    }

    const numPrice = Number(price);
    const numYear = Number(year);
    const numSeats = Number(seats);

    if (numPrice <= 0 || numYear < 1900 || numSeats <= 0) {
      return res.status(400).json({
        success: false,
        message: "Price and seats must be positive, year must be 1900 or later",
      });
    }

    let imageUrl = "";

    // Upload image to ImageKit if provided
    if (req.file) {
      try {
        const fileBuffer = fs.readFileSync(req.file.path);
        const uploadResponse = await imagekit.upload({
          file: fileBuffer,
          fileName: req.file.originalname,
          folder: "/car-rental",
        });
        imageUrl = uploadResponse.url;

        // Remove temp file
        fs.unlinkSync(req.file.path);
      } catch (imageError) {
        console.error("Image upload error:", imageError);
        return res.status(500).json({
          success: false,
          message: "Error uploading image",
        });
      }
    }

    const newCar = new Car({
      name,
      type,
      year: numYear,
      seats: numSeats,
      fuel,
      transmission,
      location,
      price: numPrice,
      description: description || `A great ${name} available for rent in ${location}.`,
      image: imageUrl,
      features: features
        ? Array.isArray(features)
          ? features
          : (() => {
              try {
                return JSON.parse(features);
              } catch {
                return features.split(",").map((f) => f.trim());
              }
            })()
        : [],
      available: true,
    });

    await newCar.save();
    res.json({ success: true, message: "Car added successfully", car: newCar });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error adding car" });
  }
};

// Get all cars
const listCars = async (req, res) => {
  try {
    const cars = await Car.find({});
    res.json({ success: true, cars });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error fetching cars" });
  }
};

// Get single car by ID
const getCarById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Car ID is required",
      });
    }

    const car = await Car.findById(id);
    if (!car) {
      return res.status(404).json({ success: false, message: "Car not found" });
    }
    res.json({ success: true, car });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error fetching car" });
  }
};

// Remove a car (Admin)
const removeCar = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Car ID is required",
      });
    }

    const car = await Car.findByIdAndDelete(id);
    if (!car) {
      return res.status(404).json({ success: false, message: "Car not found" });
    }

    res.json({ success: true, message: "Car removed successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error removing car" });
  }
};

// Toggle car availability (Admin)
const toggleAvailability = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Car ID is required",
      });
    }

    const car = await Car.findById(id);
    if (!car) {
      return res.status(404).json({ success: false, message: "Car not found" });
    }
    car.available = !car.available;
    await car.save();
    res.json({ success: true, message: "Availability updated", car });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error updating availability" });
  }
};

export { addCar, listCars, getCarById, removeCar, toggleAvailability };
