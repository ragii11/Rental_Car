import mongoose from "mongoose";

const carSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["Sedan", "SUV", "Sports", "Electric", "Hatchback"],
    },
    year: {
      type: Number,
      required: true,
    },
    seats: {
      type: Number,
      required: true,
    },
    fuel: {
      type: String,
      required: true,
      enum: ["Petrol", "Diesel", "Hybrid", "Electric"],
    },
    transmission: {
      type: String,
      required: true,
      enum: ["Automatic", "Manual", "Semi-Automatic"],
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    image: {
      type: String,
      default: "",
    },
    features: {
      type: [String],
      default: [],
    },
    available: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Car = mongoose.model("Car", carSchema);

export default Car;
