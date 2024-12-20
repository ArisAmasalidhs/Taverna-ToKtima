import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import MenuPage from "./pages/MenuPage";
import ReservationPage from "./pages/ReservationPage";
import ReviewPage from "./pages/ReviewPage";
import LoginRegisterPage from "./pages/LoginRegisterPage";
import ProfilePage from "./pages/ProfilePage"; // Import ProfilePage

function App() {
  const [user, setUser] = useState(null);

  // Persist user session (check if user is already logged in)
  useEffect(() => {
    const token = localStorage.getItem("token"); // Retrieve JWT token from localStorage
    if (token) {
      try {
        // Decode the token to get user info
        const userData = JSON.parse(atob(token.split(".")[1])); // Extract payload
        setUser({
          id: userData.id,
          name: userData.name,
          email: userData.email,
        }); // Update state
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token"); // Remove invalid token
      }
    }
  }, []);

  // Handle logout logic
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token"); // Clear token from localStorage
  };

  return (
    <Router>
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route
          path="/login"
          element={<LoginRegisterPage setUser={setUser} />}
        />
        <Route path="/reviews" element={<ReviewPage />} />

        {/* Protected Routes */}
        <Route
          path="/reservations"
          element={user ? <ReservationPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/reviews"
          element={user ? <ReviewPage /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={
            user ? (
              <ProfilePage user={user} setUser={setUser} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
