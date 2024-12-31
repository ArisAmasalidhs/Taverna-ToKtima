import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";
import logo from "../assets/GreekTaverna-Logo.png";

const Navbar = ({ user, onLogout }) => {
  const [scrolled, setScrolled] = useState(false);

  // Add scroll event listener to change navbar background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      {/* Header */}
      <div className="navbar-logo">
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <h1>Το Κτήμα</h1>
        </Link>
      </div>

      {/* Center Logo */}
      <div className="navbar-center-logo">
        <Link to="/">
          <img src={logo} alt="Greek Taverna Logo" />
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="navbar-links">
        <Link to="/">Welcome</Link>
        <Link to="/menu">Menu</Link>

        <Link to="/locations">Locations</Link>
        <Link to="/reservations">Reservations</Link>

        <Link to="/contact">Contact</Link>
      </div>

      {/* Auth Section */}
      <div className="navbar-auth">
        {user ? (
          <>
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
