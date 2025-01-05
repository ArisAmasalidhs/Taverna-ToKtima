const express = require('express');
const {
  addMenuItem,
  addCarouselImage,
  approveReservation
} = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

const router = express.Router();

// Add a new menu item (Admin only)
router.post('/menu', authMiddleware, adminMiddleware, addMenuItem);

// Add a new carousel image (Admin only)
router.post('/carousel', authMiddleware, adminMiddleware, addCarouselImage);

// Approve a pending reservation (Admin only)
router.put('/reservations/approve', authMiddleware, adminMiddleware, approveReservation);

module.exports = router;
