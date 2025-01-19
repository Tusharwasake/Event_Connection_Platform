import React, { useState } from 'react';
import { Search, Calendar, MapPin, Filter } from 'lucide-react';
import "./FindEvents.css"

// Sample event data - in a real app this would come from an API
const initialEvents = [
  {
    id: 1,
    title: "Summer Music Festival",
    date: "2025-07-15",
    location: "Central Park",
    category: "Music",
    description: "Annual outdoor music festival featuring local and international artists",
    price: 50
  },
  {
    id: 2,
    title: "Tech Conference 2025",
    date: "2025-03-20",
    location: "Convention Center",
    category: "Technology",
    description: "Leading tech conference with industry experts and workshops",
    price: 199
  },
  {
    id: 3,
    title: "Food & Wine Expo",
    date: "2025-05-10",
    location: "Downtown Plaza",
    category: "Food",
    description: "Culinary experience featuring local restaurants and wineries",
    price: 75
  }
];

const FindEvents = () => {
  const [events, setEvents] = useState(initialEvents);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState('all');
  
  const categories = [...new Set(initialEvents.map(event => event.category))];

  const filterEvents = () => {
    return initialEvents.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          event.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || event.category === selectedCategory;
      const matchesPriceRange = priceRange === 'all' ||
                               (priceRange === 'low' && event.price <= 50) ||
                               (priceRange === 'medium' && event.price > 50 && event.price <= 100) ||
                               (priceRange === 'high' && event.price > 100);
      
      return matchesSearch && matchesCategory && matchesPriceRange;
    });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setEvents(filterEvents());
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setEvents(filterEvents());
  };

  const handlePriceRangeChange = (e) => {
    setPriceRange(e.target.value);
    setEvents(filterEvents());
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Event Finder</h1>
        
        {/* Search and Filter Section */}
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="flex items-center border rounded-lg p-2">
            <Search className="w-5 h-5 text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full outline-none"
            />
          </div>
          
          {/* Filters */}
          <div className="flex gap-4">
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="border rounded-lg p-2"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            
            <select
              value={priceRange}
              onChange={handlePriceRangeChange}
              className="border rounded-lg p-2"
            >
              <option value="all">All Prices</option>
              <option value="low">Under $50</option>
              <option value="medium">$50 - $100</option>
              <option value="high">Over $100</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Events Display */}
      <div className="space-y-4">
        {events.length > 0 ? (
          events.map(event => (
            <div 
              key={event.id} 
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4"
            >
              <div className="border-b pb-2 mb-3">
                <h2 className="text-xl font-semibold">{event.title}</h2>
              </div>
              <div className="space-y-2">
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  {new Date(event.date).toLocaleDateString()}
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  {event.location}
                </div>
                <div className="flex items-center text-gray-600">
                  <Filter className="w-4 h-4 mr-2" />
                  {event.category}
                </div>
                <p className="text-gray-700">{event.description}</p>
                <p className="font-bold">${event.price}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">
            No events found matching your criteria
          </div>
        )}
      </div>
    </div>
  );
};

export default FindEvents;