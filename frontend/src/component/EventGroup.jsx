import React, { useState } from 'react';
import { ArrowLeft, Send, User, Check } from 'lucide-react';

function EventGroup({ eventName, onBack }) {
  const [participants, setParticipants] = useState([
    { id: 1, name: 'arpit', status: 'pending', friendRequest: 'not_sent' },
    { id: 2, name: 'Tushar', status: 'sent', friendRequest: 'not_sent' },
    { id: 3, name: 'piyush', status: 'sent', friendRequest: 'not_sent' },
    { id: 4, name: 'pragati', status: 'accepted', friendRequest: 'not_sent' },
    { id: 5, name: 'neha', status: 'pending', friendRequest: 'not_sent' },
    { id: 6, name: 'rohan', status: 'sent', friendRequest: 'not_sent' },
    { id: 7, name: 'sneha', status: 'accepted', friendRequest: 'not_sent' },
    { id: 8, name: 'aditya', status: 'pending', friendRequest: 'not_sent' },
    { id: 9, name: 'shivani', status: 'sent', friendRequest: 'not_sent' },
    { id: 10, name: 'rahul', status: 'accepted', friendRequest: 'not_sent' },
    { id: 11, name: 'vishal', status: 'pending', friendRequest: 'not_sent' },
    { id: 12, name: 'megha', status: 'pending', friendRequest: 'not_sent' },
    { id: 13, name: 'kartik', status: 'sent', friendRequest: 'not_sent' },
    { id: 14, name: 'ananya', status: 'accepted', friendRequest: 'not_sent' },
  ]);

  const handleStatusUpdate = (participantId) => {
    setParticipants((prevParticipants) =>
      prevParticipants.map((participant) => {
        if (participant.id === participantId) {
          if (participant.status === 'pending') {
            return { ...participant, status: 'sent' };
          }
        }
        return participant;
      })
    );
  };

  const handleFriendRequest = (participantId) => {
    setParticipants((prevParticipants) =>
      prevParticipants.map((participant) => {
        if (participant.id === participantId) {
          if (participant.friendRequest === 'not_sent') {
            return { ...participant, friendRequest: 'sent' };
          }
        }
        return participant;
      })
    );
  };

  return (
    <div style={{ margin: '0 auto', padding: '1rem' }}>
      {/* Navigation */}
      <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1rem 0',
          borderBottom: '1px solid #333',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={onBack}
            style={{
              padding: '0.5rem',
              borderRadius: '50%',
              background: 'none',
              transition: 'background-color 0.3s',
              cursor: 'pointer',
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#333')}
            onMouseOut={(e) => (e.target.style.backgroundColor = 'transparent')}
          >
            <ArrowLeft style={{ width: '1.25rem', height: '1.25rem' }} />
          </button>
          <span style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Back to Events</span>
        </div>
        <button
          style={{
            padding: '0.5rem',
            borderRadius: '50%',
            backgroundColor: '#333',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#555')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#333')}
        >
          <User style={{ width: '1.25rem', height: '1.25rem' }} />
        </button>
      </nav>

      {/* Group Content */}
      <div style={{ marginTop: '2rem', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
          {eventName} Event group
        </h2>

        <div
          style={{
            backgroundColor: '#333',
            borderRadius: '0.5rem',
            padding: '1.5rem',
            color: '#fff',
          }}
        >
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            All participants:
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {participants.map((participant) => (
              <div
                key={participant.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  backgroundColor: '#444',
                  padding: '1rem',
                  borderRadius: '0.5rem',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div
                    style={{
                      width: '2rem',
                      height: '2rem',
                      backgroundColor: '#555',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <User style={{ width: '1rem', height: '1rem' }} />
                  </div>
                  <span>{participant.name}</span>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => handleStatusUpdate(participant.id)}
                    style={{
                      padding: '0.5rem 1rem',
                      borderRadius: '1rem',
                      cursor: 'pointer',
                      color: '#fff',
                      backgroundColor:
                        participant.status === 'pending'
                          ? '#007bff'
                          : participant.status === 'sent'
                          ? '#28a745'
                          : '#6c757d',
                      border: 'none',
                      transition: 'background-color 0.3s',
                    }}
                    onMouseOver={(e) => {
                      if (participant.status === 'pending') e.target.style.backgroundColor = '#0056b3';
                      else if (participant.status === 'sent') e.target.style.backgroundColor = '#218838';
                    }}
                    onMouseOut={(e) => {
                      if (participant.status === 'pending') e.target.style.backgroundColor = '#007bff';
                      else if (participant.status === 'sent') e.target.style.backgroundColor = '#28a745';
                    }}
                  >
                    {participant.status === 'pending' ? (
                      <>
                        <Send style={{ width: '1rem', height: '1rem' }} /> Send Request
                      </>
                    ) : participant.status === 'sent' ? (
                      <>
                        <Check style={{ width: '1rem', height: '1rem' }} /> Sent
                      </>
                    ) : (
                      'Reply now'
                    )}
                  </button>
                  <button
                    onClick={() => handleFriendRequest(participant.id)}
                    style={{
                      padding: '0.5rem 1rem',
                      borderRadius: '1rem',
                      cursor: 'pointer',
                      color: '#fff',
                      backgroundColor:
                        participant.friendRequest === 'not_sent'
                          ? '#ff9800'
                          : '#6c757d',
                      border: 'none',
                      transition: 'background-color 0.3s',
                    }}
                  >
                    {participant.friendRequest === 'not_sent' ? 'Send Friend Request' : 'Request Sent'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventGroup;
