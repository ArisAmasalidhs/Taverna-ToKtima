import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/ProfilePage.css"; // Add appropriate styling here

const ProfilePage = ({ user, setUser }) => {
  const [reservations, setReservations] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [username, setUsername] = useState(user.name);
  const [password, setPassword] = useState("");

  // Fetch user's reservations and reviews
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = { headers: { Authorization: token } };

        // Fetch reservations
        const reservationsResponse = await axios.get(
          "/api/reservations",
          config
        );
        const reservationsData = Array.isArray(reservationsResponse.data)
          ? reservationsResponse.data
          : []; // Ensure it’s an array
        setReservations(reservationsData);

        // Fetch reviews
        const reviewsResponse = await axios.get("/api/reviews", config);
        const reviewsData = Array.isArray(reviewsResponse.data)
          ? reviewsResponse.data
          : []; // Ensure it’s an array
        setReviews(reviewsData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  // Handle username and password update
  const handleUpdateSettings = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: token } };

      const response = await axios.put(
        "/api/users/update",
        { username, password },
        config
      );
      setUser({ ...user, name: response.data.name }); // Update user state
      alert("Settings updated successfully!");
    } catch (error) {
      alert(error.response?.data?.message || "Error updating settings!");
    }
  };

  // Handle review delete
  const handleDeleteReview = async (reviewId) => {
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: token } };

      await axios.delete(`/api/reviews/${reviewId}`, config);
      setReviews(reviews.filter((review) => review._id !== reviewId)); // Update state
    } catch (error) {
      alert("Error deleting review!");
    }
  };

  return (
    <div className="profile-page">
      <section className="profile-card">
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </section>

      {/* Removed Welcome Heading */}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Update Password"
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
              <p>Reservation at: {reservation.date}</p>
              <p>Guests: {reservation.guests}</p>
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
              <p>{review.comment}</p>
              <button onClick={() => handleDeleteReview(review._id)}>
                Delete
              </button>
            </div>
          ))
        )}
      </section>
    </div>
  );
};

export default ProfilePage;
