const Carousel = require('../models/Carousel');

// Add a new carousel image
const addCarouselImage = async (req, res) => {
  try {
    const { imageUrl, carouselType } = req.body;

    // Validate the carousel type
    if (!["top", "small", "bottom"].includes(carouselType)) {
      return res.status(400).json({ message: 'Invalid carousel type.' });
    }

    const newImage = await Carousel.create({ imageUrl, carouselType });
    res.status(201).json(newImage);
  } catch (err) {
    res.status(500).json({ message: 'Failed to add carousel image.' });
  }
};

// Fetch all carousel images
const getCarouselImages = async (req, res) => {
  try {
    const images = await Carousel.find();
    res.status(200).json(images);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch carousel images.' });
  }
};

// Delete a carousel image
const deleteCarouselImage = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedImage = await Carousel.findByIdAndDelete(id);
    if (!deletedImage) {
      return res.status(404).json({ message: 'Carousel image not found.' });
    }

    res.status(200).json({ message: 'Carousel image deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete carousel image.' });
  }
};

// Update a carousel image
const updateCarouselImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { imageUrl, carouselType } = req.body;

    // Validate the carousel type
    if (carouselType && !["top", "small", "bottom"].includes(carouselType)) {
      return res.status(400).json({ message: 'Invalid carousel type.' });
    }

    const updatedImage = await Carousel.findByIdAndUpdate(
      id,
      { imageUrl, carouselType },
      { new: true }
    );

    if (!updatedImage) {
      return res.status(404).json({ message: 'Carousel image not found.' });
    }

    res.status(200).json(updatedImage);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update carousel image.' });
  }
};

module.exports = {
  addCarouselImage,
  getCarouselImages,
  deleteCarouselImage,
  updateCarouselImage,
};
