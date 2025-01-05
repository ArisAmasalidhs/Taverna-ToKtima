const Carousel = require('../models/Carousel');

// Add a new carousel image
const addCarouselImage = async (req, res) => {
  try {
    const newImage = await Carousel.create(req.body);
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

module.exports = { addCarouselImage, getCarouselImages };
