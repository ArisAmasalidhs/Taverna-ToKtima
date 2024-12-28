const Reservation = require('../models/Reservation');

// Create a reservation
const createReservation = async (req, res) => {
    try {
      const { name, email, phone, date, time, numberOfGuests, notes } = req.body;
      
      const newReservation = new Reservation({
        user: req.user, 
        name,
        email,
        phone,
        date,
        time,
        numberOfGuests,
        notes,
      });
  
      const savedReservation = await newReservation.save();
      res.status(201).json(savedReservation);
    } catch (error) {
      console.error('Error creating reservation:', error.message);
      res.status(500).json({ message: 'Error creating reservation' });
    }
  };

// Get reservations for logged-in user
const getUserReservations = async (req, res) => {
    try {
      const reservations = await Reservation.find({ user: req.user }); 
      res.status(200).json(reservations);
    } catch (error) {
      console.error('Error fetching user reservations:', error.message);
      res.status(500).json({ message: 'Error fetching reservations' });
    }
  };
  
  module.exports = { createReservation, getUserReservations };
  