const Reservation = require('../models/Reservation');
const nodemailer = require('nodemailer');

// Create a reservation
const createReservation = async (req, res) => {
  try {
    const { name, email, phone, date, time, numberOfGuests, notes } = req.body;

    const userReservations = await Reservation.find({ user: req.user });
    if (userReservations.length >= 3) {
      return res.status(400).json({ message: 'You can only have up to 3 active reservations.' });
    }

    const newReservation = new Reservation({
      user: req.user,
      name,
      email,
      phone,
      date,
      time,
      numberOfGuests,
      notes,
      status: 'Pending',
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

// Get all reservations (Admin only)
const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.status(200).json(reservations);
  } catch (error) {
    console.error('Error fetching all reservations:', error.message);
    res.status(500).json({ message: 'Error fetching reservations.' });
  }
};

// Update reservation status and send notification (Admin Only)
const updateReservationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { reservationId } = req.params;

    const updatedReservation = await Reservation.findByIdAndUpdate(
      reservationId,
      { status },
      { new: true }
    );

    if (!updatedReservation) {
      return res.status(404).json({ message: 'Reservation not found' });
    }

    // Send email notification to the client
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: updatedReservation.email,
      subject: `Reservation Status Update`,
      text: `Hello ${updatedReservation.name},\n\nYour reservation for ${updatedReservation.date} at ${updatedReservation.time} has been ${status}.\n\nThank you for choosing our restaurant.\n\nBest regards,\nThe Team`,
    };

    await transporter.sendMail(mailOptions);

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
      user: req.user,
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
