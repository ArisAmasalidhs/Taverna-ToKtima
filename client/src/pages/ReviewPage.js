import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/ReviewPage.css';

const ReviewPage = ({ user }) => {
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({
    comment: '',
    rating: '',
  });
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  // Fetch all reviews when the page loads
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('/api/reviews'); // Backend endpoint
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setErrorMessage('Failed to load reviews. Please try again.');
      }
    };

    fetchReviews();
  }, []);

  // Handle form changes
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Handle form submission for new reviews
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!user) {
      setErrorMessage('You must be logged in to submit a review.');
      return;
    }
  
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setErrorMessage('Authorization token is missing. Please log in again.');
        return;
      }
  
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
  
      const payload = {
        customerName: user.name,
        rating: form.rating,
        comment: form.comment,
        userId: user.id, // Include userId in the payload
      };
  
      const response = await axios.post('/api/reviews', payload, config);
      setSuccessMessage('Review submitted successfully!');
      setErrorMessage(null);
      setForm({ comment: '', rating: '' });
      setReviews([...reviews, response.data]); // Add new review to the list
    } catch (err) {
      console.error('Error submitting review:', err);
      setSuccessMessage(null);
      setErrorMessage('Failed to submit review. Please try again.');
    }
  };
  

  return (
    <div className="review-page">
      <h2>Leave a Review</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      {/* Review Form */}
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

      {/* Display Reviews */}
      <h3>All Reviews</h3>
      <div className="reviews-list">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review._id} className="review-item">
              <p>
                <strong>{review.customerName}</strong> said:
              </p>
              <p>💬 "{review.comment}"</p>
              <p>⭐ {review.rating}/5</p>
              <p>🕒 {new Date(review.createdAt).toLocaleString()}</p>
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
