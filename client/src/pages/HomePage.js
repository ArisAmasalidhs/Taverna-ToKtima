import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/HomePage.css';
import tavernaa from '../assets/tavernaa.jpg';
import tavernaaa from '../assets/tavernaaa.jpg';
import tavernaaaa from '../assets/tavernaaaa.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';

const HomePage = () => {
  const [topCarouselItems, setTopCarouselItems] = useState([]);
  const [bottomCarouselItems, setBottomCarouselItems] = useState([]);
  const [smallCarouselItems] = useState([tavernaa, tavernaaa, tavernaaaa]);
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
    <div className="homepage-footer-map">
      <h4>Find Us in Syros</h4>
      <iframe
        title="Syros Map"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31224.6675888322!2d24.906444028815014!3d37.44227810000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14a0692d8edbb4b7%3A0x53674760d72e8e88!2sSyros!5e0!3m2!1sen!2sgr!4v1645459178663!5m2!1sen!2sgr"
        width="300"
        height="200"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
      ></iframe>
      <p>Kalomenopoulou 2, Syros</p>
    </div>
    <div className="homepage-footer-links">
      <a href="/reviews">Reviews of To Ktima</a>
      <a href="/reservations">Reserve a Table</a>
    </div>
    <div className="homepage-footer-details">
      <p>
        Authentic Greek Comfort Food and Restaurant in Syros | Greek Restaurant
      </p>
      <p>Copyright © 2022, To Ktima. All rights reserved.</p>
      <p>Website crafted by Aristidis Amasalidis.</p>
    </div>
    <div className="homepage-social-icons">
      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faFacebook} />
      </a>
      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faInstagram} />
      </a>
      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
        <FontAwesomeIcon icon={faTwitter} />
      </a>
    </div>
  </div>
</footer>
    </div>
  );
};

export default HomePage;

