const express = require('express');
const { registerUser, loginUser, getUser } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware'); // Ensure this is correctly implemented
const router = express.Router();

// Register Route
router.post('/register', registerUser);

// Login Route
router.post('/login', loginUser);

// Fetch User Details Route
router.get('/user', authMiddleware, getUser);

module.exports = router;
