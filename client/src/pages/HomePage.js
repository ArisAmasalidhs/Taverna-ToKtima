import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/HomePage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import menuImage from '../assets/pngegg.png';

const HomePage = () => {
  const [topCarouselItems, setTopCarouselItems] = useState([]);
  const [aboutCarouselItems, setAboutCarouselItems] = useState([]);
  const [bottomCarouselItems, setBottomCarouselItems] = useState([]);
  const [currentSmallIndex, setCurrentSmallIndex] = useState(0);
  const [topCarouselIndex, setTopCarouselIndex] = useState(0);
  const [bottomCarouselIndex, setBottomCarouselIndex] = useState(0);

  // Fetch carousel images for all sections
  useEffect(() => {
    const fetchCarouselImages = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/public/carousel"
        );
        const images = response.data;

        // Categorize images by section
        setTopCarouselItems(
          images.filter((img) => img.carouselSection === "top")
        );
        setAboutCarouselItems(
          images.filter((img) => img.carouselSection === "about")
        );
        setBottomCarouselItems(
          images.filter((img) => img.carouselSection === "bottom")
        );
      } catch (error) {
        console.error("Error fetching carousel images:", error);
      }
    };

    fetchCarouselImages();
  }, []);

  // Auto-swiping effect for carousels
  useEffect(() => {
    const interval = setInterval(() => {
      setTopCarouselIndex(
        (prevIndex) => (prevIndex + 1) % topCarouselItems.length
      );
      setBottomCarouselIndex(
        (prevIndex) => (prevIndex + 1) % bottomCarouselItems.length
      );
      setCurrentSmallIndex(
        (prevIndex) => (prevIndex + 1) % aboutCarouselItems.length
      );
    }, 5000);

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [
    topCarouselItems.length,
    aboutCarouselItems.length,
    bottomCarouselItems.length,
  ]);

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
        <div className="homepage-carousel-wrapper">
          <button
            className="homepage-carousel-buttons prev"
            onClick={() =>
              handleCarouselPrev(setTopCarouselIndex, topCarouselItems)
            }
          >
            ❮
          </button>
          {topCarouselItems.length > 0 ? (
            <div className="homepage-carousel-item">
              <img
                src={
                  topCarouselItems[topCarouselIndex]?.imageUrl ||
                  "https://via.placeholder.com/800x400"
                }
                alt="Top Carousel"
              />
              <div className="homepage-carousel-overlay">
                <h2>
                  {topCarouselItems[topCarouselIndex]?.title ||
                    "Explore Authentic Flavors"}
                </h2>
                <p>
                  {topCarouselItems[topCarouselIndex]?.description ||
                    "Taste the best of Syros."}
                </p>
              </div>
            </div>
          ) : (
            <div className="homepage-carousel-item">
              <img
                src="https://via.placeholder.com/800x400"
                alt="Placeholder"
              />
            </div>
          )}
          <button
            className="homepage-carousel-buttons next"
            onClick={() =>
              handleCarouselNext(setTopCarouselIndex, topCarouselItems)
            }
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
              From its historic and picturesque island to its stunning sea-swept
              coasts, Syros is a Greek gem rich in tradition, culture, and
              culinary excellence. As you stroll through the cobblestone streets
              or admire the sparkling Aegean waters, you'll find yourself
              immersed in the timeless charm of this Mediterranean paradise.
            </p>
            <p>
              At <i>Το Κτήμα</i>, we bring this experience to your table. Our
              menu is a celebration of Greece's culinary heritage, crafted with
              the finest hand-selected ingredients. From our freshly baked bread
              to our delicately prepared seafood dishes, every bite is a
              testament to our dedication to quality and authenticity.
            </p>
            <p>
              Whether you’re savoring a family recipe passed down through
              generations or indulging in our chef’s modern take on a Greek
              classic, each dish at <i>Το Κτήμα</i> tells a story. We invite you
              to join us for an unforgettable dining experience filled with rich
              flavors, warm hospitality, and the spirit of Greece.
            </p>
          </div>
          <div className="homepage-small-carousel">
            <button
              className="homepage-carousel-arrow enhanced-arrow left"
              onClick={() =>
                setCurrentSmallIndex((prevIndex) =>
                  prevIndex === 0
                    ? aboutCarouselItems.length - 1
                    : prevIndex - 1
                )
              }
            >
              ❮
            </button>
            {aboutCarouselItems.length > 0 ? (
              <img
                src={
                  aboutCarouselItems[currentSmallIndex]?.imageUrl ||
                  "https://via.placeholder.com/400x300"
                }
                alt="About Carousel"
                className="homepage-small-carousel-image"
              />
            ) : (
              <img
                src="https://via.placeholder.com/400x300"
                alt="Placeholder About Carousel"
                className="homepage-small-carousel-image"
              />
            )}
            <button
              className="homepage-carousel-arrow enhanced-arrow right"
              onClick={() =>
                setCurrentSmallIndex(
                  (prevIndex) => (prevIndex + 1) % aboutCarouselItems.length
                )
              }
            >
              ❯
            </button>
          </div>
        </div>
      </section>

{/* Large Bottom Carousel */}
<section className="homepage-large-carousel bottom-carousel">
  <div className="homepage-carousel-wrapper">
    {/* Replace the button with a clickable image */}
    <a
      href="/menu"
      className="homepage-bottom-carousel-image-link"
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 2,
      }}
    >
      <img
        src={menuImage}
        alt="Menu"
        className="homepage-bottom-carousel-image"
      />
    </a>
    <button
      className="homepage-carousel-buttons prev"
      onClick={() =>
        handleCarouselPrev(setBottomCarouselIndex, bottomCarouselItems)
      }
    >
      ❮
    </button>
    {bottomCarouselItems.length > 0 ? (
      <div className="homepage-carousel-item">
        <img
          src={
            bottomCarouselItems[bottomCarouselIndex]?.imageUrl ||
            "https://via.placeholder.com/800x400"
          }
          alt="Bottom Carousel"
        />
      </div>
    ) : (
      <div className="homepage-carousel-item">
        <img
          src="https://via.placeholder.com/800x400"
          alt="Placeholder"
        />
      </div>
    )}
    <button
      className="homepage-carousel-buttons next"
      onClick={() =>
        handleCarouselNext(setBottomCarouselIndex, bottomCarouselItems)
      }
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
            <a href="/reviews">Reviews of our restaurant</a>
            <a href="/reservations">Reserve a Table</a>
          </div>
          <div className="homepage-footer-details">
            <p>
              Authentic Greek Comfort Food and Restaurant in Syros | Taverna To
              Ktima
            </p>
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
