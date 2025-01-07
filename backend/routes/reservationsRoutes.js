const express = require('express');
const {
  createReservation,
  getUserReservations,
  getAllReservations, // New function
  updateReservationStatus,
  deleteReservation,
} = require('../controllers/reservationController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

const router = express.Router();

// Create reservation
router.post('/', authMiddleware, createReservation);

// Get all reservations (Admin only)
router.get('/', authMiddleware, adminMiddleware, getAllReservations);

// Get user reservations
router.get('/user', authMiddleware, getUserReservations);

// Approve reservation (Admin only)
router.put('/:id/approve', authMiddleware, adminMiddleware, updateReservationStatus);

// Delete reservation
router.delete('/:reservationId', authMiddleware, deleteReservation);

module.exports = router;
