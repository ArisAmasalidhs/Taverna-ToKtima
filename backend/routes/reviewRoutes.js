const express = require('express');
const { 
  getAllReviews, 
  getUserReviews, 
  createReview, 
  deleteReview, 
  updateReview 
} = require('../controllers/reviewController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Public route to get all reviews
router.get('/', getAllReviews);

// Protected routes
router.use(authMiddleware);

// Get the logged-in user's reviews
router.get('/user', getUserReviews);

// Create a new review
router.post('/', createReview);

// Delete a review
router.delete('/:id', deleteReview);

// Update a review
router.put('/:id', updateReview);

module.exports = router;
