import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import MenuPage from './pages/MenuPage';
import ReservationPage from './pages/ReservationPage';
import ReviewPage from './pages/ReviewPage';
import LoginRegisterPage from './pages/LoginRegisterPage';

function App() {
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    setUser(null);
    // Add logic to remove user session (if any)
  };

  return (
    <Router>
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/reservations" element={<ReservationPage />} />
        <Route path="/reviews" element={<ReviewPage />} />
        <Route path="/login" element={<LoginRegisterPage setUser={setUser} />} />
        <Route path="/" element={<h1>Welcome to Το Κτήμα!</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
