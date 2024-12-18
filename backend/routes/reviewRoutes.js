const express = require('express');
const Review = require('../models/Review');
const router = express.Router();

// Add a review
router.post('/', async (req, res) => {
  const review = new Review(req.body);
  try {
    const savedReview = await review.save();
    res.status(201).json(savedReview);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
