const Reservation = require('../models/Reservation');

// Create a reservation
const createReservation = async (req, res) => {
  try {
    const { name, email, phone, date, time, numberOfGuests, notes } = req.body;

    // Limit active reservations to 3 per user
    const userReservations = await Reservation.find({ user: req.user });
    if (userReservations.length >= 3) {
      return res.status(400).json({ message: 'You can only have up to 3 active reservations.' });
    }

    const newReservation = new Reservation({
      user: req.user, // Attach the user ID from the token
      name,
      email,
      phone,
      date,
      time,
      numberOfGuests,
      notes,
      status: 'Pending', // Default status
    });

    const savedReservation = await newReservation.save();
    res.status(201).json(savedReservation);
  } catch (error) {
    console.error('Error creating reservation:', error.message);
    res.status(500).json({ message: 'Error creating reservation' });
  }
};

// Get reservations for the logged-in user
const getUserReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find({ user: req.user });
    res.status(200).json(reservations);
  } catch (error) {
    console.error('Error fetching user reservations:', error.message);
    res.status(500).json({ message: 'Error fetching reservations' });
  }
};

// Get all reservations (Admin Only)
const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find().populate('user', 'name email'); // Populate user details
    res.status(200).json(reservations);
  } catch (error) {
    console.error('Error fetching all reservations:', error.message);
    res.status(500).json({ message: 'Error fetching all reservations' });
  }
};

// Update reservation status (Admin Only)
const updateReservationStatus = async (req, res) => {
  try {
    const { reservationId, status } = req.body;

    const updatedReservation = await Reservation.findByIdAndUpdate(
      reservationId,
      { status },
      { new: true }
    );

    if (!updatedReservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    res.status(200).json(updatedReservation);
  } catch (error) {
    console.error('Error updating reservation status:', error.message);
    res.status(500).json({ message: 'Error updating reservation status' });
  }
};

// Delete a reservation
const deleteReservation = async (req, res) => {
  try {
    const { reservationId } = req.params;

    const reservation = await Reservation.findOneAndDelete({
      _id: reservationId,
      user: req.user, // Ensure the reservation belongs to the logged-in user
    });

    if (!reservation) {
      return res.status(404).json({ message: 'Reservation not found or does not belong to you.' });
    }

    res.status(200).json({ message: 'Reservation deleted successfully.' });
  } catch (error) {
    console.error('Error deleting reservation:', error.message);
    res.status(500).json({ message: 'Error deleting reservation' });
  }
};

module.exports = {
  createReservation,
  getUserReservations,
  getAllReservations,
  updateReservationStatus,
  deleteReservation,
};
