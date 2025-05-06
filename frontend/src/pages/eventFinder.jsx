import { useState, useEffect, useCallback, useRef } from "react";
import {
  MapPin,
  Clock,
  Calendar,
  DollarSign,
  Search,
  SlidersHorizontal,
  X,
  Users,
  ChevronDown,
  Filter,
  Heart,
  Share2,
  ArrowUpRight,
  Star,
  AlertCircle,
} from "lucide-react";
import axios from "axios";
import "./EventFinder.css";

// Event Card Component
const EventCard = ({ event, isRegistered, onRegister, onViewDetails }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const getCategoryColor = (category) => {
    const colors = {
      Music: "var(--category-music)",
      Technology: "var(--category-technology)",
      Food: "var(--category-food)",
      Arts: "var(--category-arts)",
      Charity: "var(--category-charity)",
      Gaming: "var(--category-gaming)",
      Environment: "var(--category-environment)",
      Entertainment: "var(--category-entertainment)",
    };
    return colors[category] || "var(--primary-color)";
  };

  const toggleLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const handleShare = (e) => {
    e.stopPropagation();
    // In a real app, this would open a share dialog
    alert(`Share event: ${event.name}`);
  };

  const handleRegister = (e) => {
    e.stopPropagation();
    onRegister(event._id);
  };

  const getEventBadge = () => {
    if (event.featured) {
      return (
        <div className="event-featured-badge">
          <Star size={12} />
          <span>Featured</span>
        </div>
      );
    }
    return null;
  };

  return (
    <div
      className="event-card"
      onClick={() => onViewDetails(event._id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="event-image">
        <img
          src={event.imageUrl || "/api/placeholder/400/200"}
          alt={event.name}
          loading="lazy"
        />
        <div
          className="event-category"
          style={{ backgroundColor: getCategoryColor(event.category) }}
        >
          {event.category}
        </div>
        {getEventBadge()}
        <div className="event-actions">
          <button
            className={`action-button ${isLiked ? "liked" : ""}`}
            onClick={toggleLike}
            aria-label={isLiked ? "Unlike event" : "Like event"}
          >
            <Heart size={18} />
          </button>
          <button
            className="action-button"
            onClick={handleShare}
            aria-label="Share event"
          >
            <Share2 size={18} />
          </button>
        </div>

        <div className={`event-quick-view ${isHovered ? "visible" : ""}`}>
          <button className="quick-view-btn">
            <span>Quick View</span>
            <ArrowUpRight size={14} />
          </button>
        </div>
      </div>
      <div className="event-content">
        <div className="event-date-badge">
          <div className="event-month">
            {new Date(event.startDate)
              .toLocaleString("default", { month: "short" })
              .toUpperCase()}
          </div>
          <div className="event-day">{new Date(event.startDate).getDate()}</div>
        </div>

        <h3 className="event-title">{event.name}</h3>

        <div className="event-details">
          <div className="event-detail">
            <Calendar size={16} />
            <span>{formatDate(event.startDate)}</span>
          </div>
          <div className="event-detail">
            <Clock size={16} />
            <span>{event.time || "All day"}</span>
          </div>
          <div className="event-detail">
            <MapPin size={16} />
            <span>{event.location}</span>
          </div>
          <div className="event-detail">
            <Users size={16} />
            <span>{event.attendees || 0} attending</span>
          </div>
        </div>

        <p className="event-description">{event.description}</p>

        <div className="event-footer">
          <div className="event-price">
            <DollarSign size={18} />
            <span>${event.price || 0}</span>
          </div>
          <button
            className={`event-register-btn ${isRegistered ? "registered" : ""}`}
            onClick={handleRegister}
            disabled={isRegistered}
          >
            {isRegistered ? "Registered" : "Register Now"}
          </button>
        </div>
      </div>
    </div>
  );
};

// Filter Badge Component
const FilterBadge = ({ label, onRemove }) => (
  <div className="filter-badge">
    <span>{label}</span>
    <button
      className="badge-remove"
      onClick={onRemove}
      aria-label={`Remove ${label} filter`}
    >
      <X size={14} />
    </button>
  </div>
);

// Empty State Component
const EmptyState = ({ onClearFilters }) => (
  <div className="no-events">
    <div className="no-events-icon">🔍</div>
    <h3>No events found</h3>
    <p>Try adjusting your search or filters to find events</p>
    <button className="clear-filters-btn" onClick={onClearFilters}>
      Clear All Filters
    </button>
  </div>
);

// Toast notification component
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`toast ${type}`}>
      {type === "error" ? <AlertCircle size={18} /> : null}
      <p>{message}</p>
      <button
        onClick={onClose}
        className="toast-close"
        aria-label="Close notification"
      >
        ×
      </button>
    </div>
  );
};

// Main EventFinder Component
const EventFinder = () => {
  // State management
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortOption, setSortOption] = useState("date");
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid"); // grid or list
  const [appliedFilters, setAppliedFilters] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState("");
  const [registeredEvents, setRegisteredEvents] = useState(() => {
    try {
      const stored = localStorage.getItem("registeredEvents");
      return stored ? JSON.parse(stored) : [];
    } catch (err) {
      console.error("Error parsing stored events:", err);
      return [];
    }
  });

  const filtersRef = useRef(null);
  const searchInputRef = useRef(null);
  const contentRef = useRef(null);
  const eventsPerPage = 6;

  // Handle scroll position to show/hide fixed search bar
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fetch events from API
  useEffect(() => {
    const fetchEvents = async () => {
      const token = localStorage.getItem("token");

      try {
        // In a real app, you'd check token validity and redirect if needed
        const response = await axios.get(
          "https://two447-event-connection-platform-2.onrender.com/events",
          token
            ? {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            : {}
        );

        if (response.data && response.data.data) {
          // Process and normalize the API data
          const processedEvents = response.data.data.map((event) => ({
            ...event,
            // Set default category if none exists
            category: event.category || "Entertainment",
            // Generate price if none exists
            price: event.price || Math.floor(Math.random() * 100) + 10,
          }));

          setEvents(processedEvents);
          setFilteredEvents(processedEvents);
        } else {
          setError("No events found");
        }
      } catch (err) {
        console.error("Error fetching events:", err);
        setError(
          err.response?.data?.message ||
            "Failed to load events. Please try again later."
        );
        // Fallback to empty array
        setEvents([]);
        setFilteredEvents([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const showToast = useCallback((message, type = "success") => {
    setToast({ show: true, message, type });
  }, []);

  const closeToast = useCallback(() => {
    setToast({ show: false, message: "", type: "" });
  }, []);

  const applyFilters = useCallback(() => {
    let filtered = [...events];
    let newAppliedFilters = [];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (event) =>
          event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
      newAppliedFilters.push({
        type: "search",
        label: `Search: "${searchTerm}"`,
        value: searchTerm,
      });
    }

    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter(
        (event) => event.category === selectedCategory
      );
      newAppliedFilters.push({
        type: "category",
        label: `Category: ${selectedCategory}`,
        value: selectedCategory,
      });
    }

    // Apply price filter
    if (priceRange !== "all") {
      filtered = filtered.filter((event) => {
        if (priceRange === "low") return event.price <= 50;
        if (priceRange === "medium")
          return event.price > 50 && event.price <= 100;
        if (priceRange === "high") return event.price > 100;
        return true;
      });

      const priceLabels = {
        low: "Under $50",
        medium: "$50 - $100",
        high: "Over $100",
      };

      newAppliedFilters.push({
        type: "price",
        label: `Price: ${priceLabels[priceRange]}`,
        value: priceRange,
      });
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortOption) {
        case "date":
          return new Date(a.startDate) - new Date(b.startDate);
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "popularity":
          return (b.attendees || 0) - (a.attendees || 0);
        default:
          return new Date(a.startDate) - new Date(b.startDate);
      }
    });

    // Apply pagination calculation
    setTotalPages(Math.ceil(filtered.length / eventsPerPage));

    // Keep the full filtered list for pagination
    setFilteredEvents(filtered);
    setAppliedFilters(newAppliedFilters);
  }, [
    events,
    searchTerm,
    selectedCategory,
    priceRange,
    sortOption,
    eventsPerPage,
  ]);

  // Calculate paginated events
  const getPaginatedEvents = useCallback(() => {
    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    return filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);
  }, [filteredEvents, currentPage, eventsPerPage]);

  useEffect(() => {
    applyFilters();
  }, [
    searchTerm,
    selectedCategory,
    priceRange,
    sortOption,
    events,
    applyFilters,
  ]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Scroll to top of event list for better UX
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const toggleFilters = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const clearAllFilters = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setPriceRange("all");
    setSortOption("date");
    setCurrentPage(1);
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const removeFilter = (type, value) => {
    switch (type) {
      case "search":
        setSearchTerm("");
        break;
      case "category":
        setSelectedCategory("");
        break;
      case "price":
        setPriceRange("all");
        break;
      default:
        break;
    }
    setCurrentPage(1);
  };

  const handleRegister = (eventId) => {
    if (registeredEvents.includes(eventId)) {
      return;
    }

    try {
      // In a real app, you would make an API call here
      const updatedRegisteredEvents = [...registeredEvents, eventId];
      setRegisteredEvents(updatedRegisteredEvents);
      localStorage.setItem(
        "registeredEvents",
        JSON.stringify(updatedRegisteredEvents)
      );
      showToast("Successfully registered for the event!");
    } catch (err) {
      console.error("Registration error:", err);
      showToast("Failed to register for the event. Please try again.", "error");
    }
  };

  const handleViewDetails = (eventId) => {
    // In a real app, this would navigate to the event details page
    alert(`View details for event #${eventId}`);
  };

  // Get unique categories from events
  const categories = [
    ...new Set(events.map((event) => event.category).filter(Boolean)),
  ];

  // Current paginated events to display
  const currentEvents = getPaginatedEvents();

  return (
    <div className="event-finder-container">
      {/* Toast notification */}
      {toast.show && (
        <Toast message={toast.message} type={toast.type} onClose={closeToast} />
      )}

      {/* Hero section with parallax effect */}
      <div className="event-finder-header">
        <div className="header-background"></div>
        <div className="header-content">
          <h1>Discover Amazing Events</h1>
          <p>
            Find and connect with people at events that match your interests
          </p>
          <div className="header-search">
            <div className="search-bar large">
              <Search size={20} className="search-icon" />
              <input
                type="text"
                placeholder="Search events, locations, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                ref={searchInputRef}
              />
              {searchTerm && (
                <button
                  className="clear-search"
                  onClick={() => setSearchTerm("")}
                  aria-label="Clear search"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Floating search bar that appears when scrolling */}
      <div
        className={`floating-search ${scrollPosition > 300 ? "visible" : ""}`}
      >
        <div className="container">
          <div className="search-bar">
            <Search size={18} />
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                className="clear-search"
                onClick={() => setSearchTerm("")}
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="event-finder-content" ref={contentRef}>
        <div className="search-filters-container" ref={filtersRef}>
          <div className="filters-row">
            <div className="search-bar desktop-hidden">
              <Search size={18} />
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  className="clear-search"
                  onClick={() => setSearchTerm("")}
                  aria-label="Clear search"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            <div className="filters-toggle" onClick={toggleFilters}>
              <Filter size={18} />
              <span>Filters</span>
              <ChevronDown
                size={16}
                className={`toggle-icon ${isFilterOpen ? "open" : ""}`}
              />
            </div>

            <div className="view-toggle">
              <button
                className={`toggle-button ${
                  viewMode === "grid" ? "active" : ""
                }`}
                onClick={() => setViewMode("grid")}
                aria-label="Grid view"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="3" y="3" width="7" height="7" rx="1" />
                  <rect x="14" y="3" width="7" height="7" rx="1" />
                  <rect x="3" y="14" width="7" height="7" rx="1" />
                  <rect x="14" y="14" width="7" height="7" rx="1" />
                </svg>
              </button>
              <button
                className={`toggle-button ${
                  viewMode === "list" ? "active" : ""
                }`}
                onClick={() => setViewMode("list")}
                aria-label="List view"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="3" y="4" width="18" height="2" rx="1" />
                  <rect x="3" y="11" width="18" height="2" rx="1" />
                  <rect x="3" y="18" width="18" height="2" rx="1" />
                </svg>
              </button>
            </div>
          </div>

          {/* Expanded Filters */}
          <div className={`expanded-filters ${isFilterOpen ? "open" : ""}`}>
            <div className="filter-groups">
              <div className="filter-group">
                <label>Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">All Categories</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label>Price Range</label>
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                >
                  <option value="all">All Prices</option>
                  <option value="low">Under $50</option>
                  <option value="medium">$50 - $100</option>
                  <option value="high">Over $100</option>
                </select>
              </div>

              <div className="filter-group">
                <label>Sort By</label>
                <select value={sortOption} onChange={handleSortChange}>
                  <option value="date">Date (Soonest)</option>
                  <option value="price-low">Price (Lowest)</option>
                  <option value="price-high">Price (Highest)</option>
                  <option value="popularity">Popularity</option>
                </select>
              </div>
            </div>

            <div className="filter-actions">
              <button
                className="clear-filters-btn"
                onClick={clearAllFilters}
                disabled={
                  !searchTerm && !selectedCategory && priceRange === "all"
                }
              >
                Reset All
              </button>
            </div>
          </div>

          {/* Applied Filters */}
          {appliedFilters.length > 0 && (
            <div className="applied-filters">
              {appliedFilters.map((filter, index) => (
                <FilterBadge
                  key={index}
                  label={filter.label}
                  onRemove={() => removeFilter(filter.type, filter.value)}
                />
              ))}

              <button className="clear-all-btn" onClick={clearAllFilters}>
                Clear All
              </button>
            </div>
          )}
        </div>

        {/* Results Summary */}
        <div className="results-summary">
          <p>
            <span className="results-count">{filteredEvents.length}</span>
            {filteredEvents.length === 1 ? " event" : " events"} found
            {selectedCategory && (
              <span>
                {" "}
                in <strong>{selectedCategory}</strong>
              </span>
            )}
          </p>
        </div>

        {/* Error state */}
        {error && !isLoading && !events.length && (
          <div className="events-container error">
            <AlertCircle size={48} />
            <h2>Unable to load events</h2>
            <p>{error}</p>
          </div>
        )}

        {/* Loading Skeleton */}
        {isLoading ? (
          <div className={`skeleton-grid ${viewMode}`}>
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div className="skeleton-card" key={n}>
                <div className="skeleton-image"></div>
                <div className="skeleton-content">
                  <div className="skeleton-title"></div>
                  <div className="skeleton-detail"></div>
                  <div className="skeleton-detail"></div>
                  <div className="skeleton-detail"></div>
                  <div className="skeleton-description"></div>
                  <div className="skeleton-footer"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {/* Events Grid */}
            {currentEvents.length > 0 ? (
              <div className={`events-grid ${viewMode}`}>
                {currentEvents.map((event) => (
                  <EventCard
                    key={event._id}
                    event={event}
                    isRegistered={registeredEvents.includes(event._id)}
                    onRegister={handleRegister}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>
            ) : (
              <EmptyState onClearFilters={clearAllFilters} />
            )}

            {/* Pagination */}
            {filteredEvents.length > eventsPerPage && (
              <div className="pagination">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="pagination-btn"
                  aria-label="Go to previous page"
                >
                  Previous
                </button>

                <div className="pagination-info">
                  <span className="visually-hidden">Current page</span>
                  Page {currentPage} of {totalPages || 1}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages || totalPages === 0}
                  className="pagination-btn"
                  aria-label="Go to next page"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default EventFinder;
