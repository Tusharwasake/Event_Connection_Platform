import React, { useState } from 'react';
import { ArrowLeft, Send, User, Check } from 'lucide-react';

function EventGroup({ eventName, onBack }) {
  const [participants, setParticipants] = useState([
    { id: 1, name: 'arpit', status: 'pending' },
    { id: 2, name: 'Tushar', status: 'sent' },
    { id: 3, name: 'piyush', status: 'sent' },
    { id: 4, name: 'pragati', status: 'accepted' }
  ]);

  const handleStatusUpdate = (participantId) => {
    setParticipants(prevParticipants =>
      prevParticipants.map(participant => {
        if (participant.id === participantId) {
          if (participant.status === 'pending') {
            return { ...participant, status: 'sent' };
          }
        }
        return participant;
      })
    );
  };

  return (
    <div className="container mx-auto px-4">
      {/* Navigation */}
      <nav className="flex items-center justify-between py-4 border-b border-gray-800">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack} 
            className="p-2 hover:bg-gray-800 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="text-xl font-bold">Back to Events</span>
        </div>
        <button className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors">
          <User className="w-5 h-5" />
        </button>
      </nav>

      {/* Group Content */}
      <div className="mt-8 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">{eventName} Event group</h2>
        
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">All participants:</h3>
          <div className="space-y-4">
            {participants.map((participant) => (
              <div
                key={participant.id}
                className="flex items-center justify-between bg-gray-700 p-3 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4" />
                  </div>
                  <span>{participant.name}</span>
                </div>
                <button
                  onClick={() => handleStatusUpdate(participant.id)}
                  className={`px-4 py-1 rounded-full flex items-center gap-2 transition-colors ${
                    participant.status === 'pending'
                      ? 'bg-blue-600 hover:bg-blue-700'
                      : participant.status === 'sent'
                      ? 'bg-green-600'
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                >
                  {participant.status === 'pending' ? (
                    <>
                      <Send className="w-4 h-4" />
                      Send request
                    </>
                  ) : participant.status === 'sent' ? (
                    <>
                      <Check className="w-4 h-4" />
                      Sent
                    </>
                  ) : (
                    'Reply now'
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventGroup;