import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <h1 className="logo">
          <Link to="/">LinkUp!</Link>
        </h1>

        {/* Search Bar */}
        <div className="search-bar">
          <span className="icon">&#128269;</span>
          <input
            type="text"
            placeholder="Search events"
            className="search-input"
          />
          <span className="divider"></span>
          <span className="icon">&#128205;</span>
          <span className="location">Bhopal</span>
        </div>

        {/* Links and Buttons */}
        <ul className={`nav-links ${isMenuOpen ? "active" : ""}`}>
          <li>
            <Link to="/event" className="nav-item">
              Find Events
            </Link>
          </li>
          <li>
            <Link to="/createform" className="nav-item">
              Create Events
            </Link>
          </li>
          <li>
            <Link to="/my-tickets" className="nav-item">
              My Tickets
            </Link>
          </li>
          {isLoggedIn ? (
            <button className="auth-btn logout-btn" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <Link to="/login" className="auth-btn signin-btn">
              Sign In
            </Link>
          )}
        </ul>

        {/* Burger Menu for Mobile */}
        <div className="burger-menu" onClick={toggleMenu}>
          ☰
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
