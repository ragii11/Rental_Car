import express from "express";
import multer from "multer";
import authMiddleware from "../middleware/auth.js";
import adminMiddleware from "../middleware/admin.js";
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

carRouter.post("/add", authMiddleware, adminMiddleware, upload.single("image"), addCar);
carRouter.get("/list", listCars);
carRouter.get("/:id", getCarById);
carRouter.post("/remove", authMiddleware, adminMiddleware, removeCar);
carRouter.post("/toggle", authMiddleware, adminMiddleware, toggleAvailability);

export default carRouter;

