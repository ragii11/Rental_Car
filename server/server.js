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
    : ["http://localhost:5173", "http://localhost:5174", "http://127.0.0.1:5173", "http://127.0.0.1:5174"],
  credentials: true,
}));

// Serve uploaded images as static files
app.use("/uploads", express.static("uploads"));

// DB connection
connectDB().then(() => {
  seedAdmin();
}).catch(console.error);

// API routes
app.use("/api/user", userRouter);
app.use("/api/car", carRouter);
app.use("/api/booking", bookingRouter);
app.use("/api/admin", adminRouter);

// Root endpoint
app.get("/", (req, res) => {
  res.send("Car Rental API is running");
});

// Start server (only if not running in Vercel serverless)
if (process.env.NODE_ENV !== "production") {
  app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
  });
}

// Export the app for Vercel
export default app;
