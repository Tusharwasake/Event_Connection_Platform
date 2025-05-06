

import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Search,
  User,
  LogOut,
  HelpCircle,
  Users,
  Settings,
  Calendar,
  PlusCircle,
  ChevronDown,
} from "lucide-react";
import "./Navbar.css";

const Navbar = () => {
  // State and Hooks
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const searchRef = useRef(null);
  const userMenuRef = useRef(null);

  // Get user data from localStorage
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const isLoggedIn = !!localStorage.getItem("token");

  // Categories for search with icons
  const categories = [
    { to: "/music", title: "Music", icon: "🎵" },
    { to: "/nightlife", title: "Nightlife", icon: "🍸" },
    { to: "/arts", title: "Arts", icon: "🎭" },
    { to: "/technology", title: "Technology", icon: "💻" },
    { to: "/health", title: "Health & Wellness", icon: "🧘" },
    { to: "/kids", title: "Kids & Family", icon: "👨‍👩‍👧‍👦" },
    { to: "/charity", title: "Charity", icon: "🤝" },
    { to: "/gaming", title: "Gaming", icon: "🎮" },
    { to: "/environment", title: "Environment", icon: "🌿" },
  ];

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close search dropdown when clicking outside
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }

      // Close user menu when clicking outside
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Update filtered categories based on the search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredCategories([]);
      return;
    }

    const filtered = categories.filter((category) =>
      category.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCategories(filtered);
  }, [searchQuery]);

  // Handlers
  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setShowUserMenu(false);
    navigate("/login");
  }, [navigate]);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prevState) => !prevState);
  }, []);

  const handleSearch = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  const handleSearchFocus = useCallback(() => {
    setIsSearchFocused(true);
  }, []);

  const handleSearchSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (searchQuery.trim()) {
        navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
        setSearchQuery("");
        setIsSearchFocused(false);
      }
    },
    [navigate, searchQuery]
  );

  const handleCategorySelect = useCallback(
    (categoryPath) => {
      setSearchQuery("");
      setIsSearchFocused(false);
      navigate(categoryPath);
    },
    [navigate]
  );

  const toggleUserMenu = useCallback(() => {
    setShowUserMenu((prev) => !prev);
  }, []);

  // Check if the current route matches a nav item
  const isActiveRoute = useCallback(
    (path) => {
      return location.pathname === path;
    },
    [location.pathname]
  );

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo Section */}
        <div className="logo-container">
          <h1 className="logo">
            <Link to="/">LinkUp!</Link>
          </h1>
        </div>

        {/* Search Bar Section */}
        <div className="search-container" ref={searchRef}>
          <form className="search-form" onSubmit={handleSearchSubmit}>
            <div className="search-bar">
              <Search className="search-icon" size={18} />
              <input
                type="text"
                placeholder="Search events, categories, people..."
                value={searchQuery}
                onChange={handleSearch}
                onFocus={handleSearchFocus}
                className="search-input"
                aria-label="Search"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="clear-search"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                >
                  ×
                </button>
              )}
            </div>
          </form>

          {isSearchFocused && (
            <div
              className={`search-dropdown ${
                filteredCategories.length > 0 ? "has-results" : ""
              }`}
            >
              {searchQuery.trim() === "" ? (
                <div className="search-suggestions">
                  <h3>Popular Categories</h3>
                  <div className="popular-categories">
                    {categories.slice(0, 6).map((category, index) => (
                      <button
                        key={index}
                        className="category-pill"
                        onClick={() => handleCategorySelect(category.to)}
                      >
                        <span className="category-icon">{category.icon}</span>
                        <span>{category.title}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : filteredCategories.length > 0 ? (
                <>
                  <div className="search-results-header">
                    <span>Categories</span>
                  </div>
                  <div className="search-results-list">
                    {filteredCategories.map((category, index) => (
                      <button
                        key={index}
                        className="search-result-item"
                        onClick={() => handleCategorySelect(category.to)}
                      >
                        <span className="category-icon">{category.icon}</span>
                        <span className="result-title">{category.title}</span>
                      </button>
                    ))}
                  </div>
                  <div className="search-footer">
                    <button
                      className="view-all-results"
                      onClick={handleSearchSubmit}
                    >
                      Search for "{searchQuery}"
                    </button>
                  </div>
                </>
              ) : (
                <div className="no-results">
                  <p>No results found for "{searchQuery}"</p>
                  <p>Try another search term or browse categories</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Burger Menu */}
        <button
          className={`burger-menu ${isMenuOpen ? "active" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <span className="burger-line"></span>
          <span className="burger-line"></span>
          <span className="burger-line"></span>
        </button>

        {/* Navigation Links Section */}
        <div className={`nav-container ${isMenuOpen ? "menu-open" : ""}`}>
          <div className="nav-links">
            <Link
              to="/event"
              className={`nav-link ${isActiveRoute("/event") ? "active" : ""}`}
              aria-current={isActiveRoute("/event") ? "page" : undefined}
            >
              <Calendar size={20} />
              <span>Find Events</span>
            </Link>

            <Link
              to="/createform"
              className={`nav-link ${
                isActiveRoute("/createform") ? "active" : ""
              }`}
              aria-current={isActiveRoute("/createform") ? "page" : undefined}
            >
              <PlusCircle size={20} />
              <span>Create Event</span>
            </Link>

            <Link
              to="/group"
              className={`nav-link ${isActiveRoute("/group") ? "active" : ""}`}
              aria-current={isActiveRoute("/group") ? "page" : undefined}
            >
              <Users size={20} />
              <span>Connections</span>
            </Link>
          </div>

          {/* User Section */}
          <div className="user-section" ref={userMenuRef}>
            {isLoggedIn ? (
              <div className="user-menu">
                <button
                  className="user-profile-button"
                  onClick={toggleUserMenu}
                  aria-label="User menu"
                  aria-expanded={showUserMenu}
                >
                  <div className="user-avatar">
                    {user?.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <span className="user-label">User</span>
                  <ChevronDown
                    size={16}
                    className={`dropdown-arrow ${showUserMenu ? "up" : "down"}`}
                  />
                </button>

                {showUserMenu && (
                  <div className="user-dropdown">
                    <div className="user-email">
                      {user?.email || "user@example.com"}
                    </div>

                    <Link
                      to="/profile"
                      className="dropdown-item"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <User size={18} />
                      <span>View Profile</span>
                    </Link>

                    <Link
                      to="/connections"
                      className="dropdown-item"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <Users size={18} />
                      <span>My Connections</span>
                    </Link>

                    <Link
                      to="/settings"
                      className="dropdown-item"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <Settings size={18} />
                      <span>Account Settings</span>
                    </Link>

                    <Link
                      to="/help-center"
                      className="dropdown-item"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <HelpCircle size={18} />
                      <span>Help Center</span>
                    </Link>

                    <button
                      className="dropdown-item logout"
                      onClick={handleLogout}
                    >
                      <LogOut size={18} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="auth-buttons">
                <Link to="/login" className="auth-btn signin-btn">
                  Sign In
                </Link>
                <Link to="/register" className="auth-btn register-btn">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
