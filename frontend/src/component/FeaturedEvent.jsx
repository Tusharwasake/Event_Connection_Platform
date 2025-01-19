import React, { useEffect, useState } from "react";
import axios from "axios";
import EventCard from "./EventCard";

const FeaturedEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem("token"); // Get the token from localStorage
      if (!token) {
        setError("You must be logged in to view events.");
        setLoading(false);
        return;
      }

      const response = await axios.get(
        "https://two447-event-connection-platform-2.onrender.com/events",
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
          },
        }
      );
      setEvents(response.data.events); // Assuming the API response includes `events` array
    } catch (err) {
      console.error("Error fetching events:", err);
      setError(err.response?.data?.message || "Failed to fetch events.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading events...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Featured Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {events.map((event, index) => (
          <EventCard
            key={event.id}
            title={event.name}
            image={event.imageUrl || "https://via.placeholder.com/300"}
            date={new Date(event.startDate).toLocaleDateString()}
            venue={event.location}
            category={event.category.join(", ")}
            price="Free" // Replace with price if available in API
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedEvents;
