const express = require('express');
const { updateUser } = require('../controllers/userControllers'); // Corrected path
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Update user settings
router.put('/update', authMiddleware, updateUser);

module.exports = router;
