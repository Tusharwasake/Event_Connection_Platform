import React from 'react';
import './EventCard.css';

function EventCard({ event, onJoinGroup }) {
  return (
    <div className="event-card">
      <img src={event.image} alt={event.name} className="event-card-image" />
      <div className="event-card-content">
        <h3 className="event-card-title">{event.name}</h3>
        <div className="event-card-details">
          <p>Date: {event.date}</p>
          <p>Timing: {event.timing}</p>
        </div>
        <button
          onClick={() => onJoinGroup(event.name)}
          className="event-card-button"
        >
          Join Group
        </button>
      </div>
    </div>
  );
}

export default EventCard;
