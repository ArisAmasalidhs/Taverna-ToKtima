const User = require('../models/User');

const adminMiddleware = async (req, res, next) => {
  try {
    if (!req.user) {
      console.error("AdminMiddleware: No user found in request.");
      return res.status(401).json({ message: "Unauthorized: No user found." });
    }

    const user = await User.findById(req.user); // Retrieve user from `authMiddleware`
    if (!user || user.role !== 'admin') {
      console.error("AdminMiddleware: Access denied for user:", user);
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    console.error("Admin authorization error:", err.message);
    res.status(500).json({ message: "Server error." });
  }
};

module.exports = adminMiddleware;
