import express from "express";
import multer from "multer";
import adminAuth from "../middleware/adminAuth.js";
import authMiddleware from "../middleware/auth.js";
import {
  addCar,
  listCars,
  getCarById,
  removeCar,
  toggleAvailability,
} from "../controllers/carController.js";

const carRouter = express.Router();

// Multer storage configuration
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Admin route to add car
carRouter.post("/add", adminAuth, upload.single("image"), addCar);
// User route to list/add their car (from the client "List Cars" page)
carRouter.post("/user-add", authMiddleware, upload.single("image"), addCar);
carRouter.get("/list", listCars);
carRouter.get("/:id", getCarById);
carRouter.post("/remove", adminAuth, removeCar);
carRouter.post("/toggle", adminAuth, toggleAvailability);

export default carRouter;
