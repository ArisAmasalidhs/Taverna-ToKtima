const User = require('../models/User');

const adminMiddleware = async (req, res, next) => {
  try {
    const user = await User.findById(req.user); // Retrieve user details using `req.user` from authMiddleware
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    console.error("Admin authorization error:", err.message);
    res.status(500).json({ message: 'Server error.' });
  }
};

module.exports = adminMiddleware;
