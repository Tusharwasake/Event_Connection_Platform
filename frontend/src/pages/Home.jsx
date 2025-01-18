import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the user is logged in (using a token stored in localStorage)
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Set true if token exists, false otherwise
  }, []);

  const handleLogout = () => {
    // Remove token and user data from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false); // Update state
    navigate("/"); // Redirect to login or home
  };

  const handleSignIn = () => {
    navigate("/login"); // Redirect to login page
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-container">
          {/* Logo */}
          <h1 className="logo" onClick={() => navigate("/")}>LinkUp!</h1>

          {/* Search Bar */}
          <div className="search-bar">
            <span className="icon">&#128269;</span>
            <input type="text" placeholder="Search events" />
            <span className="divider"></span>
            <span className="icon">&#128205;</span>
            <span className="location">Bhopal</span>
          </div>

          {/* Navigation Links */}
          <div className="nav-links">
            <button onClick={() => navigate("/find-events")}>Find Events</button>
            <button onClick={() => navigate("/create-events")}>Create Events</button>
            <button onClick={() => navigate("/my-tickets")}>My Tickets</button>
            {/* Conditionally render buttons based on login state */}
            {isLoggedIn ? (
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            ) : (
              <button onClick={handleSignIn} className="signin-btn">
                Sign In
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1>Foster Meaningful Connections at Events</h1>
          <p>Create profiles, discover like-minded individuals, and initiate connections seamlessly.</p>
          <button onClick={() => navigate("/features")} className="hero-btn">
            Learn More
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="container">
          <h2>Features</h2>
          <div className="features-grid">
            {/* Feature Cards */}
            <div className="feature-card">
              <h3>Unique Code-Based Profiles</h3>
              <p>Link your unique code to a personalized profile and make it easy for others to connect with you.</p>
            </div>
            <div className="feature-card">
              <h3>AI-Powered Compatibility Insights</h3>
              <p>Let AI help you find meaningful connections with compatibility scores and personalized recommendations.</p>
            </div>
            <div className="feature-card">
              <h3>Secure User Verification</h3>
              <p>Verify profiles through government-issued ID and selfie validation for a secure experience.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="container">
          <p>&copy; 2025 Event Connection Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
