const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  try {
    // Extract the Authorization header
    const authHeader = req.header("Authorization");
    if (!authHeader) {
      console.error("No Authorization header provided");
      return res.status(401).json({ message: "No token provided" });
    }

    // Split and verify the token
    const token = authHeader.split(" ")[1];
    if (!token) {
      console.error("Token is missing from Authorization header");
      return res.status(401).json({ message: "Token is missing" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id; // Attach user ID from token

    // Fetch the user details from the database
    const user = await User.findById(req.user);
    if (!user) {
      console.error("User not found in the database");
      return res.status(404).json({ message: "User not found" });
    }

    req.role = user.role; // Attach user role for further validation
    console.log(`Authenticated user: ${user.name}, Role: ${user.role}`);
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    console.error("Authorization error:", err.message);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;
