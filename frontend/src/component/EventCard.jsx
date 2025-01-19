import React from 'react';

function EventCard({ event, onJoinGroup }) {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden">
      <img
        src={event.image}
        alt={event.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{event.name}</h3>
        <div className="space-y-2 text-gray-400">
          <p>Date: {event.date}</p>
          <p>Timing: {event.timing}</p>
        </div>
        <button
          onClick={() => onJoinGroup(event.name)}
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
        >
          Join group
        </button>
      </div>
    </div>
  );
}

export default EventCard;