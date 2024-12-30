import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/HomePage.css';
import tavernaa from '../assets/tavernaa.jpg';
import tavernaaa from '../assets/tavernaaa.jpg';
import tavernaaaa from '../assets/tavernaaaa.jpg';

const HomePage = () => {
  const [topCarouselItems, setTopCarouselItems] = useState([]);
  const [bottomCarouselItems, setBottomCarouselItems] = useState([]);
  const [smallCarouselItems] = useState([tavernaa, tavernaaa, tavernaaaa]); // Fixed images for small carousel
  const [currentSmallIndex, setCurrentSmallIndex] = useState(0);
  const [topCarouselIndex, setTopCarouselIndex] = useState(0);
  const [bottomCarouselIndex, setBottomCarouselIndex] = useState(0);

  // Fetch menu data for top and bottom carousels
  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/menu');
        const menuItems = response.data;

        setTopCarouselItems(menuItems.slice(0, 3));
        setBottomCarouselItems(menuItems.slice(3, 6));
      } catch (error) {
        console.error('Error fetching menu data:', error);
      }
    };

    fetchMenuData();
  }, []);

  // Small Carousel Handlers
  const handleSmallPrev = () => {
    setCurrentSmallIndex((prevIndex) =>
      prevIndex === 0 ? smallCarouselItems.length - 1 : prevIndex - 1
    );
  };

  const handleSmallNext = () => {
    setCurrentSmallIndex((prevIndex) =>
      prevIndex === smallCarouselItems.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Large Carousel Handlers
  const handleCarouselNext = (setIndex, items) => {
    setIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const handleCarouselPrev = (setIndex, items) => {
    setIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  };

  return (
    <div className="homepage">
      {/* Large Top Carousel */}
      <section className="homepage-large-carousel">
        <h2>Explore Our Authentic Greek Cuisine</h2>
        <div className="homepage-carousel-wrapper">
          <button
            className="homepage-carousel-buttons prev"
            onClick={() => handleCarouselPrev(setTopCarouselIndex, topCarouselItems)}
            disabled={topCarouselItems.length === 0}
          >
            ❮
          </button>
          {topCarouselItems.length > 0 && (
            <div className="homepage-carousel-item">
              <img
                src={topCarouselItems[topCarouselIndex]?.imageUrl}
                alt={topCarouselItems[topCarouselIndex]?.name}
              />
              <div className="homepage-carousel-text">
                <h3>{topCarouselItems[topCarouselIndex]?.name}</h3>
                <p>{topCarouselItems[topCarouselIndex]?.description}</p>
              </div>
            </div>
          )}
          <button
            className="homepage-carousel-buttons next"
            onClick={() => handleCarouselNext(setTopCarouselIndex, topCarouselItems)}
            disabled={topCarouselItems.length === 0}
          >
            ❯
          </button>
        </div>
      </section>

      {/* About Section with Small Carousel */}
      <section className="homepage-about-section">
        <h2>About Greek Taverna</h2>
        <div className="homepage-about-container">
          {/* About Text */}
          <div className="homepage-about-text">
            <p>
              From its historic and beautiful island to its stunning sea-swept coasts, Syros
              is a Greek gem rich in tradition and character. Experience this old-world charm
              as you dine in the comfort of our lovely restaurant.
            </p>
            <p>
              At Το Κτήμα, enjoy fine Greek dining and authentic specialties, all prepared with
              the freshest, hand-selected ingredients.
            </p>
          </div>
          {/* Small Image Carousel */}
          <div className="homepage-small-carousel">
            <button className="homepage-carousel-arrow left" onClick={handleSmallPrev}>
              ❮
            </button>
            <img
              src={smallCarouselItems[currentSmallIndex]}
              alt={`Small Carousel ${currentSmallIndex + 1}`}
              className="homepage-small-carousel-image"
            />
            <button className="homepage-carousel-arrow right" onClick={handleSmallNext}>
              ❯
            </button>
          </div>
        </div>
      </section>

      {/* Large Bottom Carousel */}
      <section className="homepage-large-carousel">
        <h2>Delightful Greek Dishes</h2>
        <div className="homepage-carousel-wrapper">
          <button
            className="homepage-carousel-buttons prev"
            onClick={() => handleCarouselPrev(setBottomCarouselIndex, bottomCarouselItems)}
            disabled={bottomCarouselItems.length === 0}
          >
            ❮
          </button>
          {bottomCarouselItems.length > 0 && (
            <div className="homepage-carousel-item">
              <img
                src={bottomCarouselItems[bottomCarouselIndex]?.imageUrl}
                alt={bottomCarouselItems[bottomCarouselIndex]?.name}
              />
              <div className="homepage-carousel-text">
                <h3>{bottomCarouselItems[bottomCarouselIndex]?.name}</h3>
                <p>{bottomCarouselItems[bottomCarouselIndex]?.description}</p>
              </div>
            </div>
          )}
          <button
            className="homepage-carousel-buttons next"
            onClick={() => handleCarouselNext(setBottomCarouselIndex, bottomCarouselItems)}
            disabled={bottomCarouselItems.length === 0}
          >
            ❯
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="homepage-footer">
        <div className="homepage-footer-content">
          <div className="homepage-contact">
            <h4>Contact Us</h4>
            <p>Email: info@taverna.com</p>
            <p>Phone: +30 123 456 789</p>
          </div>
          <div className="homepage-social">
            <h4>Follow Us</h4>
            <a href="https://facebook.com">Facebook</a>
            <a href="https://instagram.com">Instagram</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
