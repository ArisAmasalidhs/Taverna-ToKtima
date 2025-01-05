const express = require('express');
const {
  createReservation,
  getUserReservations,
  getAllReservations,
  updateReservationStatus,
  deleteReservation,
} = require('../controllers/reservationController');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

const router = express.Router();

// Create reservation
router.post('/', authMiddleware, createReservation);

// Get reservations for the logged-in user
router.get('/user', authMiddleware, getUserReservations);

// Get all reservations (Admin Only)
router.get('/all', authMiddleware, adminMiddleware, getAllReservations);

// Update reservation status (Admin Only)
router.put('/status', authMiddleware, adminMiddleware, updateReservationStatus);

// Delete a reservation
router.delete('/:reservationId', authMiddleware, deleteReservation);

module.exports = router;
