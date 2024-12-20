import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import ReservationPage from './pages/ReservationPage';
import ReviewPage from './pages/ReviewPage';
import LoginRegisterPage from './pages/LoginRegisterPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Rehydrate user from localStorage on page load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const userData = JSON.parse(atob(token.split('.')[1]));
        setUser({
          id: userData.id,
          name: userData.name,
          email: userData.email,
        });
      } catch (error) {
        console.error('Invalid token:', error);
        localStorage.removeItem('token');
      }
    }
    setIsLoading(false); // Ensure loading state is turned off
  }, []);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  const ProtectedRoute = ({ children }) => {
    const location = useLocation();
    if (isLoading) return null; // Prevent flashing login during loading
    if (!user) {
      localStorage.setItem('redirectPath', location.pathname); // Save current path
      return <Navigate to="/login" />;
    }
    return children;
  };

  useEffect(() => {
    const redirectPath = localStorage.getItem('redirectPath');
    if (redirectPath && user) {
      localStorage.removeItem('redirectPath');
      window.history.replaceState(null, '', redirectPath); // Restore path without reloading
    }
  }, [user]);

  if (isLoading) {
    return <div>Loading...</div>; // Placeholder while verifying token
  }

  return (
    <Router>
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/login" element={<LoginRegisterPage setUser={setUser} />} />
        <Route
          path="/reservations"
          element={
            <ProtectedRoute>
              <ReservationPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/reviews"
          element={
            <ProtectedRoute>
              <ReviewPage user={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage user={user} setUser={setUser} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
