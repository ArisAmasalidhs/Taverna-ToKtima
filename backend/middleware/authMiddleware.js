const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader)
      return res.status(401).json({ message: "No token provided" });

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id; // Attach user ID from token

    const user = await User.findById(req.user); // Fetch user details from DB
    if (!user) return res.status(404).json({ message: "User not found" });

    req.role = user.role; // Attach role to request object for further verification
    next();
  } catch (err) {
    console.error("Authorization error:", err.message);
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
