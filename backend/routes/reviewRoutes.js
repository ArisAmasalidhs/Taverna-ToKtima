const express = require("express");
const router = express.Router();
const { deleteReview, getAllReviews, createReview } = require("../controllers/reviewController");

// Delete a specific review
router.delete("/:id", deleteReview);

// Other routes
router.get("/", getAllReviews);
router.post("/", createReview);

module.exports = router;
