const Review = require('../models/Review');

// Get all reviews
const getAllReviews = async (req, res) => {
  try {
    console.log('Fetching all reviews...');
    const reviews = await Review.find(); // Fetch all reviews from the database
    res.status(200).json(reviews); // Send the reviews back as JSON
  } catch (err) {
    console.error('Error fetching reviews:', err);
    res.status(500).json({ message: 'Error fetching reviews', error: err.message });
  }
};

// Create a new review
const createReview = async (req, res) => {
  try {
    console.log('Incoming review payload:', req.body);
    const { customerName, rating, comment } = req.body;

    // Validate incoming data
    if (!customerName || !rating || !comment) {
      console.error('Validation Error: Missing required fields');
      return res.status(400).json({
        message: 'All fields (customerName, rating, comment) are required.',
      });
    }

    // Ensure `rating` is a number within the range 1-5
    const parsedRating = parseInt(rating, 10);
    if (isNaN(parsedRating) || parsedRating < 1 || parsedRating > 5) {
      console.error('Validation Error: Invalid rating:', rating);
      return res.status(400).json({
        message: 'Rating must be a number between 1 and 5.',
      });
    }

    // Create and save the review
    const newReview = new Review({
      customerName,
      rating: parsedRating,
      comment,
    });

    const savedReview = await newReview.save();
    console.log('Review created successfully:', savedReview);
    res.status(201).json(savedReview);
  } catch (err) {
    console.error('Error creating review:', err);
    res.status(500).json({ message: 'Error creating review', error: err.message });
  }
};

// Delete a review by ID
const deleteReview = async (req, res) => {
    try {
      const reviewId = req.params.id;
      const deletedReview = await Review.findByIdAndDelete(reviewId);
  
      if (!deletedReview) {
        return res.status(404).json({ message: "Review not found" });
      }
  
      res.status(200).json({ message: "Review deleted successfully" });
    } catch (err) {
      console.error("Error deleting review:", err);
      res.status(500).json({ message: "Error deleting review" });
    }
  };
module.exports = { getAllReviews, createReview, deleteReview };
