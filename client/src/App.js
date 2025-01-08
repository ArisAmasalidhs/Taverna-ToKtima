import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import MenuPage from "./pages/MenuPage";
import ReservationPage from "./pages/ReservationPage";
import ReviewPage from "./pages/ReviewPage";
import LoginRegisterPage from "./pages/LoginRegisterPage";
import ProfilePage from "./pages/ProfilePage";
import Contact from "./pages/Contact";
import AdminPanel from "./pages/AdminPanel";
import axios from "axios";

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      console.log("Axios default header set on load:", axios.defaults.headers.common["Authorization"]);
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [user]);

  useEffect(() => {
    const rehydrateUser = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Token from localStorage during rehydrateUser:", token);

        if (!token) {
          setIsLoading(false);
          return;
        }

        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        const response = await axios.get("/api/auth/user");
        setUser(response.data);
      } catch (error) {
        console.error("Error rehydrating user:", error.message);
        localStorage.removeItem("token");
      } finally {
        setIsLoading(false);
      }
    };

    rehydrateUser();
  }, []);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];
  };

  const handleLogin = async (token) => {
    try {
      if (!token) {
        console.error("No token provided to handleLogin");
        return;
      }

      localStorage.setItem("token", token);
      console.log("Stored token in localStorage:", localStorage.getItem("token"));

      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      console.log("Axios Authorization Header After Login:", axios.defaults.headers.common["Authorization"]);

      const response = await axios.get("/api/auth/user");
      console.log("User fetched after login:", response.data); // Debug log
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user after login:", error.message);
      localStorage.removeItem("token"); // Clear invalid token
    }
  };

  // ProtectedRoute definition
  const ProtectedRoute = ({ children }) => {
    const location = useLocation();
    if (isLoading) return null;
    if (!user) {
      localStorage.setItem("redirectPath", location.pathname);
      return <Navigate to="/login" />;
    }
    return children;
  };

  // AdminRoute definition
  const AdminRoute = ({ children }) => {
    if (isLoading) return null;
    if (!user || user.role !== "admin") {
      return <Navigate to="/" />;
    }
    return children;
  };

  useEffect(() => {
    const redirectPath = localStorage.getItem("redirectPath");
    if (redirectPath && user) {
      localStorage.removeItem("redirectPath");
      window.history.replaceState(null, "", redirectPath);
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
        <Route
          path="/login"
          element={<LoginRegisterPage setUser={(user) => handleLogin(user.token)} />}
        />
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
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminPanel />
            </AdminRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
