import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = ({ user, onLogout }) => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h1>Το Κτήμα</h1>
      </div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/menu">Menu</Link>
        <Link to="/reservations">Reservations</Link>
        <Link to="/reviews">Reviews</Link>
        {user && <Link to="/profile">Profile</Link>} {/* Profile Link */}
      </div>
      <div className="navbar-search">
        <input
          type="text"
          placeholder="Search for food..."
        />
      </div>
      <div className="navbar-auth">
        {user ? (
          <>
            <button onClick={onLogout}>Log Out</button>
          </>
        ) : (
          <Link to="/login">Login / Register</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
