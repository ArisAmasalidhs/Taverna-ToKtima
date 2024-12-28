const express = require('express');
const { createReservation, getUserReservations, updateReservationStatus, deleteReservation } = require('../controllers/reservationController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Create reservation
router.post('/', authMiddleware, createReservation);

// Get user reservations
router.get('/user', authMiddleware, getUserReservations);

router.put('/status', authMiddleware, updateReservationStatus); // Update reservation status

router.delete('/:reservationId', authMiddleware, deleteReservation); // Delete reservation

module.exports = router;
