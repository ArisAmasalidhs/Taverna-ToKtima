import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="homepage-container">
      <h1 className="homepage-title">Welcome to Το Κτήμα</h1>
      <p className="homepage-description">
        Experience authentic Greek cuisine in the comfort of our cozy taverna. Explore our menu, reserve a table, or share your experience with us!
      </p>
      <div className="homepage-links">
        <Link to="/menu" className="homepage-button">View Menu</Link>
        <Link to="/reservations" className="homepage-button">Book a Table</Link>
        <Link to="/reviews" className="homepage-button">See Reviews</Link>
      </div>
    </div>
  );
};

export default HomePage;
