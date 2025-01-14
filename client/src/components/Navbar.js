import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = ({ user, onLogout }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const isStaticBackground = location.pathname !== '/';

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <nav
      className={`navbar ${
        scrolled || isStaticBackground ? 'scrolled static-background' : ''
      }`}
    >
      <div className="navbar-logo">
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <h1>Το Κτήμα</h1>
        </Link>
      </div>
      <button className="navbar-toggle" onClick={toggleMenu}>
        ☰
      </button>
      <div className={`navbar-links ${menuOpen ? 'active' : ''}`}>
        <Link to="/">Welcome</Link>
        {user?.role === 'admin' ? (
          <Link to="/admin">Admin Panel</Link>
        ) : (
          <>
            <Link to="/menu">Menu</Link>
            <Link to="/reservations">Reservations</Link>
            <Link to="/reviews">Reviews</Link>
            <Link to="/contact">Contact</Link>
          </>
        )}
      </div>
      <div className={`navbar-auth ${menuOpen ? 'active' : ''}`}>
        {user ? (
          <>
            {user.profilePicture && (
              <Link to="/profile">
                <img
                  src={`http://localhost:5000/uploads/${user.profilePicture}`}
                  alt="Profile"
                  className="navbar-profile-image"
                />
              </Link>
            )}
            <Link to="/profile">Profile</Link>
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
