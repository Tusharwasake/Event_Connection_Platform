import React, { useState } from 'react';
import { Search, User, Music, TrendingUp } from 'lucide-react';
import EventCard from '../component/EventCard';
import EventGroup from '../component/EventGroup';
import "./Music.css"

function Musics() {
  const [showGroup, setShowGroup] = useState(false);
  const [currentEvent, setCurrentEvent] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState('events');

  const events = [
    {
      id: 1,
      name: 'Coldplay',
      image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&q=80&w=500',
      date: '20-01-2025',
      timing: '6pm - 10pm'
    },
    {
      id: 2,
      name: 'Skrillex',
      image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=500',
      date: '22-01-2025',
      timing: '6pm - 12pm'
    }
  ];

  const handleJoinGroup = (eventName) => {
    setCurrentEvent(eventName);
    setShowGroup(true);
  };

  const filteredEvents = events.filter(event =>
    event.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSectionClick = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {!showGroup ? (
        <div className="container mx-auto px-4">
          {/* Navigation */}
          <nav className="flex items-center justify-between py-4 border-b border-gray-800">
            <div className="flex items-center gap-2">
              <Music className="w-6 h-6 text-blue-500" />
              <span className="text-xl font-bold">Music</span>
            </div>
            <div className="flex items-center space-x-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="bg-gray-800 rounded-full pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {/* <button 
                onClick={() => handleSectionClick('trending')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                  activeSection === 'trending' ? 'bg-blue-600' : 'hover:bg-gray-800'
                }`}
              >
                <TrendingUp className="w-5 h-5" />
                Trending
              </button> */}
              {/* <button 
                onClick={() => handleSectionClick('events')}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                  activeSection === 'events' ? 'bg-blue-600' : 'hover:bg-gray-800'
                }`}
              >
                Events
              </button>
              <button className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors">
                <User className="w-5 h-5" />
              </button> */}
            </div>
          </nav>

          {/* Main Content */}
          <div className="mt-8">
            <h1 className="text-3xl font-bold mb-8">
              {activeSection === 'events' ? 'Music Events' : 'Trending Events'}
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onJoinGroup={handleJoinGroup}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <EventGroup eventName={currentEvent} onBack={() => setShowGroup(false)} />
      )}
    </div>
  );
}

export default Musics ;