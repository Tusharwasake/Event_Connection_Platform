import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Footer Logo and Description */}
        <div className="footer-row">
          <div className="footer-column">
            <h2 className="footer-logo">Event Connection</h2>
            <p className="footer-description">
              "Discover your favorite things with ease, all from the comfort of your home. Enjoy!"
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-column">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/event">Event</a></li>
              <li><a href="/event">Booking</a></li>
              <li><a href="/help">Help</a></li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div className="footer-column">
            <h3>Connect With Us</h3>
            <ul className="social-icons">
              <li>
                <a href="https://facebook.com" target="_blank" rel="noreferrer">In
                  <i className="fab fa-facebook-f"></i>
                </a>
              </li>
              <li>
                <a href="https://twitter.com" target="_blank" rel="noreferrer">Tx
                  <i className="fab fa-twitter"></i>
                </a>
              </li>
              <li>
                <a href="https://linkedin.com" target="_blank" rel="noreferrer">X
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </li>
              <li>
                <a href="" target="_blank" rel="noreferrer">FB
                  <i className="fab fa-instagram"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="footer-bottom">
          <p>&copy; 2025 Event Connection | Built during Hackathon</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
