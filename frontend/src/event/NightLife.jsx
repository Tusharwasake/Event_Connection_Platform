import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./Nightlife.css";

const nightlifeEvents = [
  {
    id: "1",
    name: "Glow Party Night",
    location: "Club Mystique, Mumbai",
    description:
      "Join us for a night of glowing fun, dance, and electrifying music.",
    startDate: "2025-03-15T21:00:00Z",
    endDate: "2025-03-16T03:00:00Z",
    imageUrl:
      "https://images.unsplash.com/photo-1565372042585-4ebd9a5cd9a1?w=800&q=60",
  },
  {
    id: "2",
    name: "Salsa Night",
    location: "Club Havana, Delhi",
    description: "Put on your dancing shoes and experience a magical salsa evening.",
    startDate: "2025-03-20T20:00:00Z",
    endDate: "2025-03-20T23:59:00Z",
    imageUrl:
      "https://images.unsplash.com/photo-1532592957587-2b84dc095569?w=800&q=60",
  },
  {
    id: "3",
    name: "Neon Glow Festival",
    location: "Neon Palace, Bangalore",
    description:
      "Dive into the ultimate neon experience with stunning visuals and beats.",
    startDate: "2025-03-25T22:00:00Z",
    endDate: "2025-03-26T04:00:00Z",
    imageUrl:
      "https://images.unsplash.com/photo-1562722428-1f6fa173d163?w=800&q=60",
  },
  {
    id: "4",
    name: "Disco Fever Night",
    location: "Disco Ball Club, Pune",
    description: "Get ready to dance to the greatest disco hits of all time.",
    startDate: "2025-03-18T22:00:00Z",
    endDate: "2025-03-19T03:00:00Z",
    imageUrl:
      "https://images.unsplash.com/photo-1544551763-4fcae3e7a63e?w=800&q=60",
  },
  {
    id: "5",
    name: "Bollywood Night",
    location: "Bollywood Arena, Hyderabad",
    description: "Groove to your favorite Bollywood beats all night long.",
    startDate: "2025-03-22T21:00:00Z",
    endDate: "2025-03-23T02:00:00Z",
    imageUrl:
      "https://images.unsplash.com/photo-1551516594-4f9e20f84f24?w=800&q=60",
  },
];

const Nightlife = () => {
  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);

    // Fetch registered events from API if user is logged in
    if (token) {
      axios
        .get("https://two447-event-connection-platform-2.onrender.com/participants", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          const registeredEventIds = response.data.participants.map(
            (participant) => participant.eventId
          );
          setRegisteredEvents(registeredEventIds);
        })
        .catch((error) => {
          console.error("Error fetching registered events:", error);
        });
    }
  }, []);

  const handleRegister = async (eventId) => {
    if (!isLoggedIn) {
      alert("Please log in to register for this event.");
      navigate("/login");
      return;
    }

    const token = localStorage.getItem("token");
    try {
      await axios.post(
        "https://two447-event-connection-platform-2.onrender.com/participants",
        {
          eventId,
          phone: "1234567890", // Replace with user phone if required
          code: Math.floor(10000 + Math.random() * 90000), // Generate a random code
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Successfully registered for the event!");
      setRegisteredEvents([...registeredEvents, eventId]); // Add event to registered list
    } catch (error) {
      console.error("Error registering for event:", error);
      alert("Failed to register for the event. Please try again.");
    }
  };

  return (
    <div className="nightlife-page">
      {/* Hero Section */}
      <section className="nightlife-hero">
        <h1>Welcome to the Nightlife Hub</h1>
        <p>Unleash the night with electrifying parties and events.</p>
        <Link to="/explore">
          <button className="explore-btn">Explore Now</button>
        </Link>
      </section>

      {/* Event List */}
      <section className="event-list">
        <h2>Upcoming Nightlife Events</h2>
        <div className="events-grid">
          {nightlifeEvents.map((event) => (
            <div key={event.id} className="event-card">
              <img src={event.imageUrl} alt={event.name} />
              <h3>{event.name}</h3>
              <p>
                <strong>Location:</strong> {event.location}
              </p>
              <p>
                <strong>Start:</strong>{" "}
                {new Date(event.startDate).toLocaleString()}
              </p>
              <p>
                <strong>End:</strong> {new Date(event.endDate).toLocaleString()}
              </p>
              <p>{event.description}</p>
              <button
                className="register-btn"
                onClick={() => handleRegister(event.id)}
                disabled={registeredEvents.includes(event.id)}
              >
                {registeredEvents.includes(event.id)
                  ? "Registered"
                  : "Register Now"}
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Nightlife;
