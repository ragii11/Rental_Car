import jwt from "jsonwebtoken";

const adminAuthMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Not authorized. Admin login required.",
      });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin access only.",
      });
    }

    req.adminId = decoded.id;
    next();
  } catch (error) {
    console.error(error);
    res
      .status(401)
      .json({ success: false, message: "Admin token expired or invalid." });
  }
};

export default adminAuthMiddleware;