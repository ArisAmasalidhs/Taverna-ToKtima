const express = require('express');
const { createReservation, getUserReservations } = require('../controllers/reservationController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Create reservation
router.post('/', authMiddleware, createReservation);

// Get user reservations
router.get('/user', authMiddleware, getUserReservations);

module.exports = router;
