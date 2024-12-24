import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import ReservationPage from './pages/ReservationPage';
import ReviewPage from './pages/ReviewPage';
import LoginRegisterPage from './pages/LoginRegisterPage';
import ProfilePage from './pages/ProfilePage';
import axios from 'axios';

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const rehydrateUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.log('No token found. User is not logged in.');
          setIsLoading(false);
          return;
        }

        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        if (decodedToken.exp * 1000 < Date.now()) {
          console.log('Token has expired.');
          localStorage.removeItem('token'); 
          setIsLoading(false);
          return;
        }

        console.log('Token is valid:', decodedToken);

        // Fetch user profile from backend if required
        const response = await axios.get('/api/auth/user', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(response.data); 
      } catch (error) {
        console.error('Error rehydrating user:', error.message);
        localStorage.removeItem('token'); 
      } finally {
        setIsLoading(false); 
      }
    };

    rehydrateUser();
  }, []);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  const ProtectedRoute = ({ children }) => {
    const location = useLocation();
    if (isLoading) return null; 
    if (!user) {
      localStorage.setItem('redirectPath', location.pathname); 
      return <Navigate to="/login" />;
    }
    return children;
  };

  useEffect(() => {
    const redirectPath = localStorage.getItem('redirectPath');
    if (redirectPath && user) {
      localStorage.removeItem('redirectPath');
      window.history.replaceState(null, '', redirectPath); 
    }
  }, [user]);

  if (isLoading) {
    return <div>Loading...</div>; 
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
