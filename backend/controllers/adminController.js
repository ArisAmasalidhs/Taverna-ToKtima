const Menu = require("../models/Menu");
const Carousel = require("../models/Carousel");
const Reservation = require("../models/Reservation");

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
    const { carouselSection } = req.body;

    // Validate carousel section
    if (!["top", "about", "bottom"].includes(carouselSection)) {
      return res.status(400).json({ message: "Invalid carousel sections." });
    }

    // Check if a file is uploaded
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded." });
    }

    const imageUrl = `/uploads/${req.file.filename}`; // Construct the URL for the saved image

    const newCarouselImage = new Carousel({ imageUrl, carouselSection });
    const savedImage = await newCarouselImage.save();
    res.status(201).json(savedImage);
  } catch (error) {
    console.error("Error adding carousel image:", error.message);
    res.status(500).json({ message: "Failed to add carousel image" });
  }
};

// Get all carousel images
const getCarouselImages = async (req, res) => {
  try {
    const images = await Carousel.find();
    res.status(200).json(images);
  } catch (error) {
    console.error("Error fetching carousel images:", error.message);
    res.status(500).json({ message: "Failed to fetch carousel images" });
  }
};

// Delete a carousel image
const deleteCarouselImage = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedImage = await Carousel.findByIdAndDelete(id);

    if (!deletedImage) {
      return res.status(404).json({ message: "Carousel image not found." });
    }

    res.status(200).json({ message: "Carousel image deleted successfully." });
  } catch (error) {
    console.error("Error deleting carousel image:", error.message);
    res.status(500).json({ message: "Failed to delete carousel image" });
  }
};

// Update a carousel image
const updateCarouselImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { carouselSection } = req.body;

    if (carouselSection && !["top", "about", "bottom"].includes(carouselSection)) {
      return res.status(400).json({ message: "Invalid carousel section." });
    }

    const updatedImage = await Carousel.findByIdAndUpdate(
      id,
      {
        carouselSection,
        ...(req.file && { imageUrl: `/uploads/${req.file.filename}` }),
      },
      { new: true }
    );

    if (!updatedImage) {
      return res.status(404).json({ message: "Carousel images not found." });
    }

    res.status(200).json(updatedImage);
  } catch (error) {
    console.error("Error updating carousel image:", error.message);
    res.status(500).json({ message: "Failed to update carousel image" });
  }
};

// Approve a reservation
const approveReservation = async (req, res) => {
  try {
    const { reservationId } = req.body;
    const updatedReservation = await Reservation.findByIdAndUpdate(
      reservationId,
      { status: "Confirmed" },
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
  getCarouselImages,
  deleteCarouselImage,
  updateCarouselImage,
  approveReservation,
};
