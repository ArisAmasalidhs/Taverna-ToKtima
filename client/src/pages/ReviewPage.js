import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/ReviewPage.css';

const ReviewPage = () => {
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({
    comment: '',
    rating: '',
  });

  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);

  // Fetch all reviews
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/reviews');
        setReviews(response.data);
      } catch (err) {
        console.error('Error fetching reviews:', err);
      }
    };

    fetchReviews();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/reviews', form);
      setSuccessMessage('Review Submitted Successfully!');
      setError(null);
      setForm({ comment: '', rating: '' });
      const response = await axios.get('http://localhost:5000/api/reviews'); // Refresh reviews
      setReviews(response.data);
    } catch (err) {
      setError('Failed to submit your review. Please try again.');
      setSuccessMessage(null);
    }
  };

  return (
    <div className="review-container">
      <h2>Your Reviews</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="review-form">
        <textarea
          name="comment"
          placeholder="Write your review here..."
          value={form.comment}
          onChange={handleChange}
          required
        />
        <input
          name="rating"
          type="number"
          min="1"
          max="5"
          placeholder="Rating (1-5)"
          value={form.rating}
          onChange={handleChange}
          required
        />
        <button type="submit">Submit Review</button>
      </form>
      <h3>All Reviews</h3>
      <div className="reviews-list">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review._id} className="review">
              <p>💬 "{review.comment}"</p>
              <p>⭐ {review.rating}/5</p>
            </div>
          ))
        ) : (
          <p>No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default ReviewPage;
