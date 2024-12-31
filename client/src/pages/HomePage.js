import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/HomePage.css';
import carousel1img from '../assets/carousel1img.jpg';
import carousel2img from '../assets/carousel2img.jpg';
import carousel3img from '../assets/carousel3img.jpg';
import tavernaa from '../assets/tavernaa.jpg';
import tavernaaa from '../assets/tavernaaa.jpg';
import tavernaaaa from '../assets/tavernaaaa.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';

const HomePage = () => {
  const [topCarouselItems] = useState([
    { imageUrl: carousel1img, name: 'Authentically Greek', description: 'Experience the true flavors of Greece.' },
    { imageUrl: carousel2img, name: 'Mediterranean Delights', description: 'Enjoy traditional Mediterranean recipes.' },
    { imageUrl: carousel3img, name: 'Taste of Syros', description: 'Fresh ingredients from the heart of Syros.' },
  ]);
  const [bottomCarouselItems, setBottomCarouselItems] = useState([]);
  const [smallCarouselItems] = useState([tavernaa, tavernaaa, tavernaaaa]);
  const [currentSmallIndex, setCurrentSmallIndex] = useState(0);
  const [topCarouselIndex, setTopCarouselIndex] = useState(0);
  const [bottomCarouselIndex, setBottomCarouselIndex] = useState(0);

  // Fetch menu data for the bottom carousel
  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/menu');
        const menuItems = response.data;
        setBottomCarouselItems(menuItems.slice(3, 6));
      } catch (error) {
        console.error('Error fetching menu data:', error);
      }
    };

    fetchMenuData();
  }, []);

  // Auto-swiping effect for carousels
  useEffect(() => {
    const interval = setInterval(() => {
      setTopCarouselIndex((prevIndex) => (prevIndex + 1) % topCarouselItems.length);
      setBottomCarouselIndex((prevIndex) => (prevIndex + 1) % bottomCarouselItems.length);
      setCurrentSmallIndex((prevIndex) => (prevIndex + 1) % smallCarouselItems.length);
    }, 5000);

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [topCarouselItems.length, bottomCarouselItems.length, smallCarouselItems.length]);

  const handleCarouselNext = (setIndex, items) => {
    setIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const handleCarouselPrev = (setIndex, items) => {
    setIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  };

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

  return (
    <div className="homepage">
      {/* Large Top Carousel */}
      <section className="homepage-large-carousel">
        <div className="homepage-carousel-wrapper">
          <button
            className="homepage-carousel-buttons prev"
            onClick={() => handleCarouselPrev(setTopCarouselIndex, topCarouselItems)}
          >
            ❮
          </button>
          <div className="homepage-carousel-item">
            <img
              src={topCarouselItems[topCarouselIndex]?.imageUrl}
              alt={topCarouselItems[topCarouselIndex]?.name}
            />
            <div className="homepage-carousel-text">
              <h2>{topCarouselItems[topCarouselIndex]?.name}</h2>
              <p>{topCarouselItems[topCarouselIndex]?.description}</p>
            </div>
            <div className="homepage-carousel-overlay">
              <h2>Delicious and Authentic Greek Food</h2>
              <p>Experience the best flavors from Syros, crafted with love.</p>
            </div>
          </div>
          <button
            className="homepage-carousel-buttons next"
            onClick={() => handleCarouselNext(setTopCarouselIndex, topCarouselItems)}
          >
            ❯
          </button>
        </div>
      </section>

      {/* About Section */}
      <section className="homepage-about-section">
        <h2>About Taverna To Ktima</h2>
        <div className="homepage-about-container">
          <div className="homepage-about-text">
            <p>
              From its historic and beautiful island to its stunning sea-swept coasts, Syros is a Greek gem
              rich in tradition and character.
            </p>
            <p>
              At Το Κτήμα, enjoy fine Greek dining and authentic specialties, all prepared with the freshest,
              hand-selected ingredients.
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
              src="https://www.google.com/maps/embed?...(YourEmbedLink)"
              width="300"
              height="200"
              style={{ border: 0 }}
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
            <a href="https://facebook.com">
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a href="https://instagram.com">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="https://twitter.com">
              <FontAwesomeIcon icon={faTwitter} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
