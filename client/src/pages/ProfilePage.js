import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/ProfilePage.css";

const ProfilePage = ({ user, setUser }) => {
  const [reservations, setReservations] = useState([]); // User reservations
  const [reviews, setReviews] = useState([]); // User reviews
  const [editingReviewId, setEditingReviewId] = useState(null); // Track review being edited
  const [editForm, setEditForm] = useState({ comment: "", rating: "" }); // Edit form state
  const [username, setUsername] = useState(user.name);
  const [newPassword, setNewPassword] = useState(""); // New password
  const [confirmNewPassword, setConfirmNewPassword] = useState(""); // Confirm new password

  // Fetch user's reservations and reviews
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = { headers: { Authorization: `Bearer ${token}` } };

        // Fetch user reservations
        const reservationsResponse = await axios.get("/api/reservations/user", config); // Use new endpoint
        setReservations(
          Array.isArray(reservationsResponse.data) ? reservationsResponse.data : []
        );

        // Fetch user's reviews
        const reviewsResponse = await axios.get("/api/reviews/user", config);
        setReviews(
          Array.isArray(reviewsResponse.data) ? reviewsResponse.data : []
        );
      } catch (error) {
        console.error("Error fetching user data:", error);
        setReservations([]); // Reset to an empty array in case of an error
        setReviews([]);
      }
    };

    fetchUserData();
  }, []);

  // Handle username and password update
  const handleUpdateSettings = async (e) => {
    e.preventDefault();

    if (newPassword.trim() === "") {
      alert("Password cannot be empty!");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      alert("New passwords do not match!");
      return;
    }

    const confirmation = window.confirm("Are you sure you want to update your settings?");
    if (!confirmation) return;

    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const response = await axios.put(
        "/api/users/update",
        { username, newPassword },
        config
      );
      setUser({ ...user, name: response.data.name }); // Update user state
      alert("Settings updated successfully!");
      setNewPassword(""); // Clear password fields
      setConfirmNewPassword("");
    } catch (error) {
      console.error("Error updating user:", error);
      alert(error.response?.data?.message || "Error updating settings!");
    }
  };

  // Handle review delete
  const handleDeleteReview = async (reviewId) => {
    const confirmation = window.confirm("Are you sure you want to delete this review?");
    if (!confirmation) return;

    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };

      await axios.delete(`/api/reviews/${reviewId}`, config);
      setReviews(reviews.filter((review) => review._id !== reviewId));
      alert("Review deleted successfully!");
    } catch (error) {
      console.error("Error deleting review:", error);
      alert("Error deleting review!");
    }
  };

  // Start editing a review
  const startEditReview = (review) => {
    setEditingReviewId(review._id); // Set the review being edited
    setEditForm({ comment: review.comment, rating: review.rating }); // Prefill form
  };

  // Handle review update
  const handleUpdateReview = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const response = await axios.put(`/api/reviews/${editingReviewId}`, editForm, config);

      // Update reviews in the state
      setReviews(
        reviews.map((review) =>
          review._id === editingReviewId ? { ...review, ...response.data } : review
        )
      );
      setEditingReviewId(null); // Exit edit mode
      alert("Review updated successfully!");
    } catch (error) {
      console.error("Error updating review:", error);
      alert("Failed to update review. Please try again.");
    }
  };

  return (
    <div className="profile-page">
      <section className="profile-card">
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </section>

      {/* Update User Settings */}
      <section className="settings-section">
        <h2>Update Your Settings</h2>
        <form onSubmit={handleUpdateSettings}>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Update Username"
            required
          />
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="New Password"
            required
          />
          <input
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            placeholder="Confirm New Password"
            required
          />
          <button type="submit">Save Changes</button>
        </form>
      </section>

      {/* User Reservations */}
      <section className="reservations-section">
        <h2>Your Reservations</h2>
        {reservations.length === 0 ? (
          <p>No reservations yet.</p>
        ) : (
          reservations.map((reservation) => (
            <div key={reservation._id} className="reservation">
              <p>Date: {new Date(reservation.date).toLocaleDateString()}</p>
              <p>Time: {reservation.time}</p>
              <p>Guests: {reservation.numberOfGuests}</p>
              <p>Notes: {reservation.notes || "No additional notes"}</p>
            </div>
          ))
        )}
      </section>

      {/* User Reviews */}
      <section className="reviews-section">
        <h2>Your Reviews</h2>
        {reviews.length === 0 ? (
          <p>No reviews yet.</p>
        ) : (
          reviews.map((review) => (
            <div key={review._id} className="review">
              {editingReviewId === review._id ? (
                <form onSubmit={handleUpdateReview}>
                  <textarea
                    value={editForm.comment}
                    onChange={(e) =>
                      setEditForm({ ...editForm, comment: e.target.value })
                    }
                    required
                  />
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={editForm.rating}
                    onChange={(e) =>
                      setEditForm({ ...editForm, rating: e.target.value })
                    }
                    required
                  />
                  <button type="submit">Save</button>
                  <button type="button" onClick={() => setEditingReviewId(null)}>
                    Cancel
                  </button>
                </form>
              ) : (
                <>
                  <p>{review.comment}</p>
                  <p>⭐ {review.rating}/5</p>
                  <button onClick={() => startEditReview(review)}>Edit</button>
                  <button onClick={() => handleDeleteReview(review._id)}>Delete</button>
                </>
              )}
            </div>
          ))
        )}
      </section>
    </div>
  );
};

export default ProfilePage;
