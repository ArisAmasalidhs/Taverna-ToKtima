const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    const token = req.header('Authorization');
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied!' });
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Attach the full decoded user data to the request
    next();
  } catch (error) {
    console.error('Authorization error:', error.message);
    res.status(401).json({ message: 'Token is not valid!' });
  }
};

module.exports = authMiddleware;
