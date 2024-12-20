const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'No token, authorization denied!' });

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified.id; // Attach user ID to request
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid!' });
  }
};

module.exports = authMiddleware;
