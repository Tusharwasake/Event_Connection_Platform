import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Calendar, Users, AlertCircle } from "lucide-react";
import axios from "axios";
import "./EventList.css";

// Extracted reusable components
const EventCard = ({ event, isRegistered, onRegister, onJoinGroup }) => (
  <div className="event-card" key={event._id}>
    <div className="event-image-container">
      <img
        src={event.imageUrl || "/api/placeholder/400/200"}
        alt={`${event.name} event`}
        loading="lazy"
      />
      {event.featured && <div className="event-badge">Featured</div>}
    </div>

    <div className="event-content">
      <h2 className="event-title">{event.name}</h2>

      <div className="event-details">
        <div className="event-detail">
          <Calendar size={16} />
          <span>Starts: {new Date(event.startDate).toLocaleDateString()}</span>
        </div>

        <div className="event-detail">
          <Calendar size={16} />
          <span>Ends: {new Date(event.endDate).toLocaleDateString()}</span>
        </div>

        <div className="event-detail">
          <Users size={16} />
          <span>Location: {event.location}</span>
        </div>
      </div>

      <p className="event-description">{event.description}</p>

      <div className="event-actions">
        <button
          onClick={() => onRegister(event._id)}
          disabled={isRegistered}
          className={`event-button ${isRegistered ? "registered" : "primary"}`}
          aria-label={
            isRegistered ? "Already registered" : "Register for this event"
          }
        >
          {isRegistered ? "Registered" : "Register Now"}
        </button>

        <button
          onClick={() => onJoinGroup(event._id, event.name)}
          disabled={!isRegistered}
          className={`event-button ${!isRegistered ? "disabled" : "secondary"}`}
          aria-label={
            !isRegistered ? "Register first to join group" : "Join event group"
          }
        >
          Join Group
        </button>
      </div>
    </div>
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

// Pagination component
const Pagination = ({ currentPage, totalPages, onPageChange }) => (
  <div className="pagination">
    <button
      onClick={() => onPageChange(currentPage - 1)}
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
      onClick={() => onPageChange(currentPage + 1)}
      disabled={currentPage === totalPages || totalPages === 0}
      className="pagination-btn"
      aria-label="Go to next page"
    >
      Next
    </button>
  </div>
);

// Main EventList component
const EventList = () => {
  // State management
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const [registeredEvents, setRegisteredEvents] = useState(() => {
    try {
      const stored = localStorage.getItem("registeredEvents");
      return stored ? JSON.parse(stored) : [];
    } catch (err) {
      console.error("Error parsing stored events:", err);
      return [];
    }
  });

  const navigate = useNavigate();
  const eventsPerPage = 6;

  // Fetch events from API
  useEffect(() => {
    const fetchEvents = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        setError("Authentication required");
        return;
      }

      try {
        const response = await axios.get(
          "https://two447-event-connection-platform-2.onrender.com/events",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data && response.data.data) {
          setEvents(response.data.data);
          setFilteredEvents(response.data.data);
        } else {
          setError("No events found");
        }
      } catch (err) {
        console.error("Error fetching events:", err);
        setError(
          err.response?.data?.message ||
            "Failed to load events. Please try again later."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Filter events based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredEvents(events);
    } else {
      const filtered = events.filter(
        (event) =>
          event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          event.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredEvents(filtered);
    }
    setCurrentPage(1);
  }, [searchQuery, events]);

  // Calculate pagination values
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(
    indexOfFirstEvent,
    indexOfLastEvent
  );
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

  // Event handlers with useCallback for optimization
  const handleSearchChange = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  const handlePageChange = useCallback((pageNumber) => {
    setCurrentPage(pageNumber);
    // Scroll to top of event list for better UX
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const showToast = useCallback((message, type = "success") => {
    setToast({ show: true, message, type });
  }, []);

  const closeToast = useCallback(() => {
    setToast({ show: false, message: "", type: "" });
  }, []);

  const handleRegister = useCallback(
    (eventId) => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login", { state: { from: "/event", eventId } });
        return;
      }

      if (registeredEvents.includes(eventId)) {
        return;
      }

      try {
        // In a real app, you would make an API call here
        // For now, we'll just update local state
        const updatedRegisteredEvents = [...registeredEvents, eventId];
        setRegisteredEvents(updatedRegisteredEvents);
        localStorage.setItem(
          "registeredEvents",
          JSON.stringify(updatedRegisteredEvents)
        );
        showToast("Successfully registered for the event!");
      } catch (err) {
        console.error("Registration error:", err);
        showToast(
          "Failed to register for the event. Please try again.",
          "error"
        );
      }
    },
    [registeredEvents, navigate, showToast]
  );

  const handleJoinGroup = useCallback(
    (eventId, eventName) => {
      if (!registeredEvents.includes(eventId)) {
        showToast(
          "You need to register for this event before joining the group.",
          "error"
        );
        return;
      }

      navigate(`/events/${eventId}/group`, { state: { eventName } });
    },
    [registeredEvents, navigate, showToast]
  );

  // Render loading state
  if (loading) {
    return (
      <div className="events-container loading">
        <div className="loading-spinner"></div>
        <p>Loading events...</p>
      </div>
    );
  }

  // Render error state
  if (error && !events.length) {
    return (
      <div className="events-container error">
        <AlertCircle size={48} />
        <h2>Unable to load events</h2>
        <p>{error}</p>
        {error === "Authentication required" && (
          <button
            className="event-button primary"
            onClick={() => navigate("/login")}
          >
            Sign In
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="events-container">
      {/* Toast notification */}
      {toast.show && (
        <Toast message={toast.message} type={toast.type} onClose={closeToast} />
      )}

      <div className="events-header">
        <h1>Discover Events</h1>

        {/* Search bar */}
        <div className="search-container">
          <Search size={20} className="search-icon" />
          <input
            type="text"
            placeholder="Search by name, description or location..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input"
            aria-label="Search events"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="search-clear"
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Event results count */}
      <div className="events-results-count">
        {filteredEvents.length === 0 ? (
          <p>No events found. Try a different search term.</p>
        ) : (
          <p>
            Showing {indexOfFirstEvent + 1}-
            {Math.min(indexOfLastEvent, filteredEvents.length)} of{" "}
            {filteredEvents.length} events
          </p>
        )}
      </div>

      {/* Event grid */}
      <div className="event-grid">
        {currentEvents.map((event) => (
          <EventCard
            key={event._id}
            event={event}
            isRegistered={registeredEvents.includes(event._id)}
            onRegister={handleRegister}
            onJoinGroup={handleJoinGroup}
          />
        ))}
      </div>

      {/* Pagination */}
      {filteredEvents.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default EventList;
