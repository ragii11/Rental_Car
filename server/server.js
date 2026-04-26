import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import carRouter from "./routes/carRoute.js";
import bookingRouter from "./routes/bookingRoute.js";
import adminRouter from "./routes/adminRoute.js";
import { seedAdmin } from "./controllers/adminController.js";

// App config
const app = express();
const port = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(",")
    : ["http://localhost:5173", "http://localhost:5174"],
  credentials: true,
}));

// DB connection
await connectDB().then(() => {
  seedAdmin();
});

// API routes
app.use("/api/user", userRouter);
app.use("/api/car", carRouter);
app.use("/api/booking", bookingRouter);
app.use("/api/admin", adminRouter);

// Root endpoint
app.get("/", (req, res) => {
  res.send("Car Rental API is running");
});

// Start server
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
