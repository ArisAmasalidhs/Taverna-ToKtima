const Menu = require('../models/Menu');
const Carousel = require('../models/Carousel');
const Reservation = require('../models/Reservation');

// Add a new menu item
const addMenuItem = async (req, res) => {
  try {
    const newMenuItem = new Menu(req.body);
    const savedItem = await newMenuItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    console.error("Error adding menu item:", error.message);
    res.status(500).json({ message: "Failed to add menu item" });
  }
};

// Add a new carousel image
const addCarouselImage = async (req, res) => {
  try {
    const newCarouselImage = new Carousel(req.body);
    const savedImage = await newCarouselImage.save();
    res.status(201).json(savedImage);
  } catch (error) {
    console.error("Error adding carousel image:", error.message);
    res.status(500).json({ message: "Failed to add carousel image" });
  }
};

// Approve a reservation
const approveReservation = async (req, res) => {
  try {
    const { reservationId } = req.body; // Expecting reservation ID in the body
    const updatedReservation = await Reservation.findByIdAndUpdate(
      reservationId,
      { status: 'Confirmed' }, // Update status to Confirmed
      { new: true }
    );

    if (!updatedReservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    res.status(200).json(updatedReservation);
  } catch (error) {
    console.error("Error approving reservation:", error.message);
    res.status(500).json({ message: "Failed to approve reservation" });
  }
};

module.exports = {
  addMenuItem,
  addCarouselImage,
  approveReservation
};
