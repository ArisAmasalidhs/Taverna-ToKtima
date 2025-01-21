import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../styles/ProfilePage.css";

const ProfilePage = ({ user, setUser }) => {
  const [reservations, setReservations] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editForm, setEditForm] = useState({ comment: "", rating: "" });
  const [username, setUsername] = useState(user.name);
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [profilePicture, setProfilePicture] = useState(user.profilePicture || null);
  const fileInput = useRef(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = { headers: { Authorization: `Bearer ${token}` } };

        const reservationsResponse = await axios.get("/api/reservations/user", config);
        setReservations(reservationsResponse.data || []);

        const reviewsResponse = await axios.get("/api/reviews/user", config);
        setReviews(reviewsResponse.data || []);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setReservations([]);
        setReviews([]);
      }
    };

    fetchUserData();
  }, []);

  const handleUpdateSettings = async (e) => {
    e.preventDefault();

    if (newPassword && newPassword !== confirmNewPassword) {
      alert("New passwords do not match!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("username", username);
      if (newPassword) formData.append("newPassword", newPassword);
      if (fileInput.current.files[0]) formData.append("profilePicture", fileInput.current.files[0]);

      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const response = await axios.put("/api/users/update", formData, config);

      setUser(response.data);
      setProfilePicture(response.data.profilePicture);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert(error.response?.data?.message || "Error updating profile!");
    }
  };

  const handleDeleteReservation = async (reservationId) => {
    const confirmation = window.confirm("Are you sure you want to delete this reservation?");
    if (!confirmation) return;

    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };

      await axios.delete(`/api/reservations/${reservationId}`, config);

      setReservations(reservations.filter((res) => res._id !== reservationId));
      alert("Reservation deleted successfully!");
    } catch (error) {
      console.error("Error deleting reservation:", error);
      alert("Failed to delete reservation. Please try again.");
    }
  };

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

  const startEditReview = (review) => {
    setEditingReviewId(review._id);
    setEditForm({ comment: review.comment, rating: review.rating });
  };

  const handleUpdateReview = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const response = await axios.put(`/api/reviews/${editingReviewId}`, editForm, config);

      setReviews(
        reviews.map((review) =>
          review._id === editingReviewId ? { ...review, ...response.data } : review
        )
      );
      setEditingReviewId(null);
      alert("Review updated successfully!");
    } catch (error) {
      console.error("Error updating review:", error);
      alert("Failed to update review. Please try again.");
    }
  };

  const getReservationStatusMessage = (status) => {
    switch (status) {
      case "Confirmed":
        return "Your reservation has been confirmed. Get ready for your meal!";
      case "Rejected":
        return "Your reservation has been canceled due to unavailability.";
      case "Pending":
      default:
        return "Your reservation is currently pending.";
    }
  };

  return (
    <div className="profile-page">
      <section className="profile-card">
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        {profilePicture ? (
          <img
            src={`http://localhost:5000/uploads/${profilePicture}`}
            alt="Profile"
            className="profile-picture"
          />
        ) : (
          <p>No profile picture uploaded.</p>
        )}
      </section>

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
          />
          <input
            type="password"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            placeholder="Confirm New Password"
          />
          <input type="file" ref={fileInput} />
          <button type="submit">Save Changes</button>
        </form>
      </section>

      <section className="reservations-section">
        <h2>Your Reservations</h2>
        {reservations.length === 0 ? (
          <p>No reservations yet.</p>
        ) : (
          reservations.map((reservation) => (
            <div key={reservation._id} className="reservation">
              <p>
                Reservation at: {reservation.date} {reservation.time}
              </p>
              <p>Guests: {reservation.numberOfGuests}</p>
              <p>
                Status: <strong>{reservation.status}</strong>
              </p>
              <p className="status-message">{getReservationStatusMessage(reservation.status)}</p>
              <button onClick={() => handleDeleteReservation(reservation._id)}>
                Delete Reservation
              </button>
            </div>
          ))
        )}
      </section>

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
