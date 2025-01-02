import React from "react";
import "../styles/Contact.css";
import seawave from "../assets/seawave.mp4"; // Path to your video file

const Contact = () => {
  return (
    <div className="contact-page">
      {/* Background Video */}
      <div className="contact-video">
        <video autoPlay loop muted>
          <source src={seawave} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Content Section */}
      <div className="contact-content">
        {/* Contact Card */}
        <div className="contact-card">
          <h2>Contact Us</h2>
          <p>
            <strong>Address:</strong> Kalomenopoulou 2, Syros, Greece
          </p>
          <p>
            <strong>Phone:</strong> +30 22810 12345
          </p>
          <p>
            <strong>Email:</strong> <a href="mailto:toktima@gmail.com">toktima@gmail.com</a>
          </p>
          <p>
            <strong>Opening Hours:</strong> <br />
            Monday - Sunday: 12:00 PM - 11:00 PM
          </p>
        </div>

        {/* Map Section */}
        <div className="contact-map">
          <h3>Find Us Here</h3>
          <iframe
            title="Syros Map"
            src="https://www.google.com/maps/embed?...(YourEmbedLink)"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
