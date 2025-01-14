const Reservation = require("../models/Reservation");

// Create a reservation
const createReservation = async (req, res) => {
  try {
    const { name, email, phone, date, time, numberOfGuests, notes } = req.body;

    const userReservations = await Reservation.find({ user: req.user });
    if (userReservations.length >= 3) {
      return res
        .status(400)
        .json({ message: "You can only have up to 3 active reservations." });
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
      status: "Pending",
    });

    const savedReservation = await newReservation.save();
    res.status(201).json(savedReservation);
  } catch (error) {
    console.error("Error creating reservation:", error.message);
    res.status(500).json({ message: "Error creating reservation" });
  }
};

// Get reservations for the logged-in user
const getUserReservations = async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0];
    const reservations = await Reservation.find({
      user: req.user,
      date: { $gte: today },
    });
    res.status(200).json(reservations);
  } catch (error) {
    console.error("Error fetching user reservations:", error.message);
    res.status(500).json({ message: "Error fetching reservations" });
  }
};

// Get all reservations (Admin only)
const getAllReservations = async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0];
    const reservations = await Reservation.find({ date: { $gte: today } });
    res.status(200).json(reservations);
  } catch (error) {
    console.error("Error fetching all reservations:", error.message);
    res.status(500).json({ message: "Error fetching reservations." });
  }
};

// Update reservation status
const updateReservationStatus = async (req, res) => {
  try {
    const { reservationId } = req.params;
    const { status } = req.body;

    const reservation = await Reservation.findById(reservationId);

    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    reservation.status = status;
    reservation.message =
      status === "Confirmed"
        ? "Get ready for your meal! Your reservation has been confirmed."
        : "Your reservation has been canceled due to unavailability.";

    await reservation.save();
    res.status(200).json({
      message: `Reservation successfully ${status.toLowerCase()}`,
      reservation,
    });
  } catch (error) {
    console.error("Error updating reservation status:", error.message);
    res.status(500).json({ message: "Error updating reservation status" });
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
      return res
        .status(404)
        .json({ message: "Reservation not found or does not belong to you." });
    }

    res.status(200).json({ message: "Reservation deleted successfully." });
  } catch (error) {
    console.error("Error deleting reservation:", error.message);
    res.status(500).json({ message: "Error deleting reservation" });
  }
};

module.exports = {
  createReservation,
  getUserReservations,
  getAllReservations,
  updateReservationStatus,
  deleteReservation,
};
