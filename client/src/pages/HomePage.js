import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HomePage.css';
import seawave from '../assets/seawave.mp4';
import winewaiter from '../assets/winewaiter.mp4';



const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="homepage">
      {/* Left Video */}
      <div className="video-container left-video">
        <video autoPlay loop muted>
          <source src={seawave} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Center Content */}
      <div className="homepage-content">
        <section className="hero-section">
          <div className="hero-content">
            <h1>Welcome to Το Κτήμα</h1>
            <p>Experience authentic Greek cuisine in the heart of tradition.</p>
            <button onClick={() => navigate('/menu')} className="btn-primary">
              View Menu
            </button>
          </div>
        </section>

        {/* About Section */}
        <section className="about-section">
          <h2>About Us</h2>
          <p>
            Το Κτήμα is a traditional Greek taverna, offering authentic dishes made
            with the freshest ingredients. Nestled in the heart of Syros island,
            we bring the flavors of Greece to your table.
          </p>
        </section>

        {/* Featured Menu Items */}
        <section className="featured-menu-section">
          <h2>Our Featured Dishes</h2>
          <div className="menu-cards">
            <div className="menu-card">
              <img
                src="https://www.simplyrecipes.com/thmb/0NrKQlJ691l6L9tZXpL06uOuWis=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Easy-Greek-Salad-LEAD-2-4601eff771fd4de38f9722e8cafc897a.jpg"
                alt="Greek Salad"
              />
              <h3>Greek Salad</h3>
              <p>A fresh salad with tomatoes, cucumbers, onions, and feta cheese.</p>
            </div>
            <div className="menu-card">
              <img
                src="https://www.mygreekdish.com/wp-content/uploads/2013/05/Moussaka-recipe-Traditional-Greek-Moussaka-with-Eggplants.jpg"
                alt="Moussaka"
              />
              <h3>Moussaka</h3>
              <p>A baked dish with eggplant, potatoes, and creamy béchamel sauce.</p>
            </div>
            <div className="menu-card">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Baklava%281%29.png"
                alt="Baklava"
              />
              <h3>Baklava</h3>
              <p>A sweet dessert made with filo pastry, nuts, and honey syrup.</p>
            </div>
          </div>
        </section>

        {/* Call-to-Action for Reservations */}
        <section className="reservation-section">
          <h2>Make a Reservation</h2>
          <button onClick={() => navigate('/reservations')} className="btn-primary">
            Book a Table
          </button>
        </section>

        {/* Customer Reviews */}
        <section className="reviews-section">
          <h2>What Our Customers Say</h2>
          <div className="reviews">
            <div className="review">
              <p>"The best Greek food I've ever had! Highly recommend the souvlaki!"</p>
              <strong>- Maria P.</strong>
            </div>
            <div className="review">
              <p>"Authentic flavors and a cozy atmosphere. 5 stars!"</p>
              <strong>- Alex D.</strong>
            </div>
            <div className="review">
              <p>"Excellent service and amazing dishes. Will visit again!"</p>
              <strong>- Sophia L.</strong>
            </div>
          </div>
        </section>
      </div>

      {/* Right Video */}
      <div className="video-container right-video">
        <video autoPlay loop muted>
          <source src={winewaiter} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default HomePage;
