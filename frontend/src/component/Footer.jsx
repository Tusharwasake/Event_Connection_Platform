import React from "react";
import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Quick Links data
  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "Browse Events", href: "/event" },
    { label: "Create Event", href: "/createform" },
    { label: "Categories", href: "/categories" },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  // Help & Support links data
  const helpLinks = [
    { label: "FAQs", href: "/faq" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Help Center", href: "/help" },
    { label: "Community Guidelines", href: "/guidelines" },
  ];

  // Social media links data
  const socialLinks = [
    { label: "Facebook", href: "https://facebook.com", icon: "facebook" },
    { label: "Twitter", href: "https://twitter.com", icon: "twitter" },
    { label: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" },
    { label: "Instagram", href: "https://instagram.com", icon: "instagram" },
    { label: "YouTube", href: "https://youtube.com", icon: "youtube" },
  ];

  return (
    <footer className="footer">
      {/* Main Footer Content */}
      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">
            {/* Company Info */}
            <div className="footer-column">
              <h2 className="footer-logo">LinkUp!</h2>
              <p className="company-description">
                Connecting people through meaningful events and shared
                experiences. Join our community today!
              </p>
              <div className="contact-info">
                <div className="contact-item">
                  <span className="contact-icon phone-icon"></span>
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="contact-item">
                  <span className="contact-icon email-icon"></span>
                  <span>contact@linkup.com</span>
                </div>
                <div className="contact-item">
                  <span className="contact-icon location-icon"></span>
                  <span>123 Event Street, NY 10001</span>
                </div>
                <div className="contact-item">
                  <span className="contact-icon time-icon"></span>
                  <span>Mon - Fri: 9:00 AM - 6:00 PM</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-column">
              <h3>Quick Links</h3>
              <ul className="footer-links">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Help & Support */}
            <div className="footer-column">
              <h3>Help & Support</h3>
              <ul className="footer-links">
                {helpLinks.map((link, index) => (
                  <li key={index}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Download App */}
            <div className="footer-column">
              <h3>Download Our App</h3>
              <p className="app-description">
                Get the best event experience with our mobile app
              </p>
              <div className="app-buttons">
                <button className="app-button">
                  <div className="app-button-content">
                    <span className="app-icon app-store"></span>
                    <div className="app-text">
                      <span className="app-label">Download on the</span>
                      <span className="app-store-name">App Store</span>
                    </div>
                  </div>
                </button>
                <button className="app-button">
                  <div className="app-button-content">
                    <span className="app-icon play-store"></span>
                    <div className="app-text">
                      <span className="app-label">Get it on</span>
                      <span className="app-store-name">Google Play</span>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="footer-bottom">
            <div className="copyright">
              © {currentYear} LinkUp! | All rights reserved
            </div>
            <div className="social-links">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`social-link ${social.icon}`}
                >
                  <span className="sr-only">{social.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
