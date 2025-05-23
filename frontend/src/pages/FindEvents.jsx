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
} from "lucide-react";
import PropTypes from "prop-types";
import "./FindEvents.css";

// Event Card Component
const EventCard = ({ event, onViewDetails }) => {
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
    alert(`Share event: ${event.title}`);
  };

  const getEventBadge = () => {
    if (event.isFeatured) {
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
      onClick={() => onViewDetails(event.id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="event-image">
        <img src={event.image} alt={event.title} loading="lazy" />
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
            {new Date(event.date)
              .toLocaleString("default", { month: "short" })
              .toUpperCase()}
          </div>
          <div className="event-day">{new Date(event.date).getDate()}</div>
        </div>

        <h3 className="event-title">{event.title}</h3>

        <div className="event-details">
          <div className="event-detail">
            <Calendar size={16} />
            <span>{formatDate(event.date)}</span>
          </div>
          <div className="event-detail">
            <Clock size={16} />
            <span>{event.time}</span>
          </div>
          <div className="event-detail">
            <MapPin size={16} />
            <span>{event.location}</span>
          </div>
          <div className="event-detail">
            <Users size={16} />
            <span>{event.attendees} attending</span>
          </div>
        </div>

        <p className="event-description">{event.description}</p>

        <div className="event-footer">
          <div className="event-price">
            <DollarSign size={18} />
            <span>${event.price}</span>
          </div>
          <button className="event-details-btn">View Details</button>
        </div>
      </div>
    </div>
  );
};

EventCard.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    attendees: PropTypes.number.isRequired,
    isFeatured: PropTypes.bool,
  }).isRequired,
  onViewDetails: PropTypes.func.isRequired,
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

FilterBadge.propTypes = {
  label: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
};

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

EmptyState.propTypes = {
  onClearFilters: PropTypes.func.isRequired,
};

// Sample event data - in a real app this would come from an API
const initialEvents = [
  {
    id: 1,
    title: "Summer Music Festival",
    date: "2025-07-15",
    time: "4:00 PM - 11:00 PM",
    location: "Central Park",
    category: "Music",
    image:
      "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?q=80&w=1000&auto=format&fit=crop",
    description:
      "Annual outdoor music festival featuring local and international artists",
    price: 50,
    attendees: 243,
    isFeatured: true,
  },
  {
    id: 2,
    title: "Tech Conference 2025",
    date: "2025-03-20",
    time: "9:00 AM - 5:00 PM",
    location: "Convention Center",
    category: "Technology",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1000&auto=format&fit=crop",
    description: "Leading tech conference with industry experts and workshops",
    price: 199,
    attendees: 127,
    isFeatured: true,
  },
  {
    id: 3,
    title: "Food & Wine Expo",
    date: "2025-05-10",
    time: "12:00 PM - 8:00 PM",
    location: "Downtown Plaza",
    category: "Food",
    image:
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1000&auto=format&fit=crop",
    description: "Culinary experience featuring local restaurants and wineries",
    price: 75,
    attendees: 189,
    isFeatured: false,
  },
  {
    id: 4,
    title: "Art Exhibition Opening",
    date: "2025-04-05",
    time: "6:00 PM - 9:00 PM",
    location: "Modern Art Gallery",
    category: "Arts",
    image:
      "https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=1000&auto=format&fit=crop",
    description: "Opening night for the new contemporary art exhibition",
    price: 25,
    attendees: 95,
    isFeatured: false,
  },
  {
    id: 5,
    title: "Charity Run for Nature",
    date: "2025-06-12",
    time: "8:00 AM - 12:00 PM",
    location: "Riverside Park",
    category: "Charity",
    image:
      "https://images.unsplash.com/photo-1509609694231-be924f9737e4?q=80&w=1000&auto=format&fit=crop",
    description:
      "Annual charity run to raise funds for environmental conservation",
    price: 30,
    attendees: 348,
    isFeatured: false,
  },
  {
    id: 6,
    title: "Gaming Convention",
    date: "2025-09-18",
    time: "10:00 AM - 8:00 PM",
    location: "Expo Center",
    category: "Gaming",
    image:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000&auto=format&fit=crop",
    description:
      "The biggest gaming event of the year with previews of upcoming releases",
    price: 45,
    attendees: 512,
    isFeatured: true,
  },
  {
    id: 7,
    title: "Sustainable Living Workshop",
    date: "2025-08-22",
    time: "1:00 PM - 5:00 PM",
    location: "Community Center",
    category: "Environment",
    image:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1000&auto=format&fit=crop",
    description:
      "Learn practical tips and techniques for a more sustainable lifestyle",
    price: 15,
    attendees: 78,
    isFeatured: false,
  },
  {
    id: 8,
    title: "Comedy Night Spectacular",
    date: "2025-05-30",
    time: "8:00 PM - 11:00 PM",
    location: "Laugh Factory",
    category: "Entertainment",
    image:
      "https://images.unsplash.com/photo-1527224857830-43a7acc85260?q=80&w=1000&auto=format&fit=crop",
    description:
      "A night of laughter featuring top comedians from around the country",
    price: 35,
    attendees: 215,
    isFeatured: false,
  },
];

const FindEvents = () => {
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

  const filtersRef = useRef(null);
  const searchInputRef = useRef(null);
  const contentRef = useRef(null);

  // Handle scroll position to show/hide fixed search bar
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Simulate loading data from API
    const timer = setTimeout(() => {
      setEvents(initialEvents);
      setFilteredEvents(initialEvents);
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const applyFilters = useCallback(() => {
    let filtered = [...events];
    let newAppliedFilters = [];

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (event) =>
          event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
          return new Date(a.date) - new Date(b.date);
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "popularity":
          return b.attendees - a.attendees;
        default:
          return new Date(a.date) - new Date(b.date);
      }
    });

    setFilteredEvents(filtered);
    setAppliedFilters(newAppliedFilters);
  }, [events, searchTerm, selectedCategory, priceRange, sortOption]);

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
  };

  const handleViewDetails = (eventId) => {
    // In a real app, this would navigate to the event details page
    alert(`View details for event #${eventId}`);
  };

  // Get unique categories from events
  const categories = [...new Set(events.map((event) => event.category))];

  return (
    <div className="find-events-container">
      {/* Hero section with parallax effect */}
      <div className="find-events-header">
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

      <div className="find-events-content" ref={contentRef}>
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
            {filteredEvents.length > 0 ? (
              <div className={`events-grid ${viewMode}`}>
                {filteredEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>
            ) : (
              <EmptyState onClearFilters={clearAllFilters} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default FindEvents;
