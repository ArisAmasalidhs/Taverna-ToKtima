import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/ProfilePage.css";

const ProfilePage = ({ user, setUser }) => {
  const [reservations, setReservations] = useState([]); // Initialize as an array
  const [reviews, setReviews] = useState([]);
  const [username, setUsername] = useState(user.name);
  const [password, setPassword] = useState("");

  // Fetch user's reservations and reviews
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = { headers: { Authorization: `Bearer ${token}` } };
  
        // Fetch reservations
        const reservationsResponse = await axios.get("/api/reservations", config);
        setReservations(Array.isArray(reservationsResponse.data) ? reservationsResponse.data : []);
  
        // Fetch reviews
        const reviewsResponse = await axios.get("/api/reviews", config);
        setReviews(Array.isArray(reviewsResponse.data) ? reviewsResponse.data : []);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setReservations([]);
        setReviews([]);
      }
    };
  
    fetchUserData();
  }, []);
  

  // Handle username and password update
  const handleUpdateSettings = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };

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
    const confirmation = window.confirm("Are you sure you want to delete this review?");
    if (!confirmation) return; // Exit the function if the user cancels
  
    try {
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };
  
      await axios.delete(`http://localhost:5000/api/reviews/${reviewId}`, config); // Correct URL
      setReviews(reviews.filter((review) => review._id !== reviewId)); // Update state
      alert("Review deleted successfully!");
    } catch (error) {
      console.error("Error deleting review:", error);
      alert("Error deleting review!");
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
              <button onClick={() => handleDeleteReview(review._id)}>Delete</button>
            </div>
          ))
        )}
      </section>
    </div>
  );
};

export default ProfilePage;
