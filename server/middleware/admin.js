import User from "../models/userModel.js";

const adminMiddleware = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);
    if (!user || user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin access required.",
      });
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(403).json({ success: false, message: "Admin access denied." });
  }
};

export default adminMiddleware;
