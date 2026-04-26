import express from "express";
import { adminLogin, addCar, listCars, updateCar, deleteCar, getAllBookings } from "../controllers/adminController.js";
import adminAuth from "../middleware/adminAuth.js";

const adminRouter = express.Router();

// Admin authentication & car management
adminRouter.post("/login", adminLogin);
adminRouter.post("/add-car", adminAuth, addCar);
adminRouter.get("/list-cars", adminAuth, listCars);
adminRouter.put("/update-car/:id", adminAuth, updateCar);
adminRouter.delete("/delete-car/:id", adminAuth, deleteCar);
adminRouter.get("/all-bookings", adminAuth, getAllBookings);

export default adminRouter;
