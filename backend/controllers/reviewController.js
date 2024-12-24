const Review = require('../models/Review');

// Get all reviews (public access)
const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (err) {
    console.error('Error fetching reviews:', err);
    res.status(500).json({ message: 'Error fetching reviews', error: err.message });
  }
};

// Get reviews for the logged-in user
const getUserReviews = async (req, res) => {
  try {
    const userId = req.user; // Extract userId from auth middleware
    const reviews = await Review.find({ userId }); // Find reviews created by this user
    res.status(200).json(reviews);
  } catch (err) {
    console.error('Error fetching user reviews:', err);
    res.status(500).json({ message: 'Error fetching user reviews', error: err.message });
  }
};

// Create a new review
const createReview = async (req, res) => {
  try {
    const { customerName, rating, comment } = req.body;
    const userId = req.user; // Extract userId from auth middleware

    // Validate input data
    if (!customerName || !rating || !comment) {
      return res.status(400).json({
        message: 'All fields (customerName, rating, comment) are required.',
      });
    }

    // Validate rating range
    const parsedRating = parseInt(rating, 10);
    if (isNaN(parsedRating) || parsedRating < 1 || parsedRating > 5) {
      return res.status(400).json({
        message: 'Rating must be a number between 1 and 5.',
      });
    }

    const newReview = new Review({ customerName, rating: parsedRating, comment, userId });
    const savedReview = await newReview.save();
    res.status(201).json(savedReview);
  } catch (err) {
    console.error('Error creating review:', err);
    res.status(500).json({ message: 'Error creating review', error: err.message });
  }
};

// Delete a review by ID (only if the review belongs to the logged-in user)
const deleteReview = async (req, res) => {
  try {
    const reviewId = req.params.id;
    const userId = req.user;

    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    if (review.userId.toString() !== userId) {
      return res.status(403).json({ message: 'You are not authorized to delete this review' });
    }

    await Review.findByIdAndDelete(reviewId);
    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (err) {
    console.error('Error deleting review:', err);
    res.status(500).json({ message: 'Error deleting review', error: err.message });
  }
};

// Update a review by ID (only if the review belongs to the logged-in user)
const updateReview = async (req, res) => {
  try {
    const reviewId = req.params.id;
    const userId = req.user; // Extract userId from auth middleware
    const { comment, rating } = req.body;

    // Find the review by ID
    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    // Ensure the logged-in user owns the review
    if (review.userId.toString() !== userId) {
      return res.status(403).json({ message: 'You are not authorized to update this review' });
    }

    // Update the review fields
    if (comment) review.comment = comment;
    if (rating) {
      const parsedRating = parseInt(rating, 10);
      if (isNaN(parsedRating) || parsedRating < 1 || parsedRating > 5) {
        return res.status(400).json({
          message: 'Rating must be a number between 1 and 5.',
        });
      }
      review.rating = parsedRating;
    }

    const updatedReview = await review.save();
    res.status(200).json(updatedReview);
  } catch (err) {
    console.error('Error updating review:', err);
    res.status(500).json({ message: 'Error updating review', error: err.message });
  }
};

module.exports = { getAllReviews, getUserReviews, createReview, deleteReview, updateReview };
