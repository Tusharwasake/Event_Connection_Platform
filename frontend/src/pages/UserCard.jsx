import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import "./EventList.css";

const UserCard= () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [registeredEvents, setRegisteredEvents] = useState(() => {
    const storedEvents = localStorage.getItem("registeredEvents");
    return storedEvents ? JSON.parse(storedEvents) : [];
  });
  const [joinedGroups, setJoinedGroups] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 6;
  const navigate = useNavigate();

  const handleRegister = (eventId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      const updatedRegisteredEvents = [...registeredEvents, eventId];
      setRegisteredEvents(updatedRegisteredEvents);
      localStorage.setItem("registeredEvents", JSON.stringify(updatedRegisteredEvents));
      alert(`Successfully registered for event ID: ${eventId}`);
    }
  };

  const handleJoinGroup = (eventId, eventName) => {
    if (!registeredEvents.includes(eventId)) {
      alert("You need to register for this event before joining the group.");
      return;
    }

    const updatedJoinedGroups = [...joinedGroups, eventId];
    setJoinedGroups(updatedJoinedGroups);

    alert(`Joining the group for event: ${eventName}`);
    navigate(`/events/${eventId}/group`, { state: { eventName } });
  };

  useEffect(() => {
    const fetchEvents = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("You are not logged in. Please log in to view events.");
        setLoading(false);
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
        } else {
          setError("No events found.");
        }
      } catch (err) {
        console.error("Error fetching events:", err.response || err.message);
        setError(err.response?.data?.message || "Failed to fetch events.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const filteredEvents = events.filter((event) =>
    event.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);

  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  if (loading) return <p>Loading events...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container">
      <h1>All Events</h1>

      {/* Search Bar */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Event Grid */}
      <div className="event-grid">
        {currentEvents.map((event) => (
          <div className="event-card" key={event._id}>
            <img src={event.imageUrl} alt={event.name} />
            <h2>{event.name}</h2>
            <p>
              <strong>Location:</strong> {event.location}
            </p>
            <p>
              <strong>Description:</strong> {event.description}
            </p>
            <p>
              <strong>Start Date:</strong> {new Date(event.startDate).toLocaleString()}
            </p>
            <p>
              <strong>End Date:</strong> {new Date(event.endDate).toLocaleString()}
            </p>
            <button
              onClick={() => handleRegister(event._id)}
              disabled={registeredEvents.includes(event._id)}
              className={`register-btn ${
                registeredEvents.includes(event._id) ? "disabled-btn" : ""
              }`}
            >
              {registeredEvents.includes(event._id) ? "Registered" : "Register"}
            </button>
            <button
              onClick={() => handleJoinGroup(event._id, event.name)}
              disabled={!registeredEvents.includes(event._id)}
              className={`join-btn ${
                registeredEvents.includes(event._id) ? "" : "disabled-btn"
              }`}
            >
              Join Group
            </button>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="pagination">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="pagination-btn"
        >
          Previous
        </button>
        <span className="pagination-info">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="pagination-btn"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserCard;
