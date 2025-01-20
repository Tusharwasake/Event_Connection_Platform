import React from "react";
import { useNavigate } from "react-router-dom";

const MyTickets = () => {
  const navigate = useNavigate();

  // Example tickets data (replace with actual data from your API or state)
  const tickets = [
    { id: 1, eventName: "Music Festival", eventId: "music-festival-123" },
    { id: 2, eventName: "Tech Conference", eventId: "tech-conference-456" },
    { id: 3, eventName: "Art Expo", eventId: "art-expo-789" },
  ];

  const handleNavigateToEventGroup = (eventId, eventName) => {
    navigate(`/events/${eventId}/group`, { state: { eventName } });
  };

  return (
    <div style={{ padding: "1rem", maxWidth: "600px", margin: "0 auto" }}>
      <h1>My Tickets</h1>
      {tickets.length > 0 ? (
        <div style={{ marginTop: "1rem" }}>
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              style={{
                marginBottom: "1rem",
                padding: "1rem",
                border: "1px solid #ddd",
                borderRadius: "8px",
                boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h3>{ticket.eventName}</h3>
              <button
                onClick={() =>
                  handleNavigateToEventGroup(ticket.eventId, ticket.eventName)
                }
                style={{
                  marginTop: "0.5rem",
                  padding: "0.5rem 1rem",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  transition: "background-color 0.3s",
                }}
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor = "#0056b3")
                }
                onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
              >
                Go to Group
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>You have no tickets yet.</p>
      )}
    </div>
  );
};

export default MyTickets;
