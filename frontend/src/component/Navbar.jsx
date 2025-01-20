import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  // State and Hooks
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [filteredCategories, setFilteredCategories] = useState([]); // Filtered categories state
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("token");

  // Categories for search
  const categories = [
    { to: "/music", title: "Music" },
    { to: "/nightlife", title: "Nightlife" },
    { to: "/arts", title: "Arts" },
    { to: "/technology", title: "Technology" },
    { to: "/health", title: "Health & Wellness" },
    { to: "/kids", title: "Kids & Family" },
    { to: "/charity", title: "Charity" },
    { to: "/gaming", title: "Gaming" },
    { to: "/environment", title: "Environment" },
  ];

  // Handlers
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // Update filtered categories based on the search query
  useEffect(() => {
    const filtered = categories.filter((category) =>
      category.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCategories(filtered);
  }, [searchQuery]);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo Section */}
        <h1 className="logo">
          <Link to="/">LinkUp!</Link>
        </h1>

        {/* New Search Bar Section */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search categories..."
            value={searchQuery}
            onChange={handleSearch}
            className="search-input"
          />
          {searchQuery && (
            <div className="search-dropdown">
              {filteredCategories.map((category, index) => (
                <Link
                  key={index}
                  to={category.to}
                  className="search-result-item"
                  onClick={() => setSearchQuery("")} // Clear search query on selection
                >
                  {category.title}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Navigation Links Section */}
        <ul className={`nav-links ${isMenuOpen ? "active" : ""}`}>
        <li>
            <Link to="/" className="nav-item">
              Home
            </Link>
          </li>
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
            <Link to="/group" className="nav-item">
              Add connection
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

        {/* Mobile Burger Menu */}
        <div className="burger-menu" onClick={toggleMenu}>
          <span className="burger-line"></span>
          <span className="burger-line"></span>
          <span className="burger-line"></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
