import React, { useState, useEffect } from "react";
import "./GamingConcert.css";

const GamingConcert = () => {
  const [timeLeft, setTimeLeft] = useState({});

  // Gaming concert date and time
  const concertDate = new Date("2025-04-15T18:00:00").getTime();

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = concertDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        clearInterval(interval);
        setTimeLeft(null); // Gaming concert started
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [concertDate]);

  return (
    <div className="concert-container">
      {/* Hero Section */}
      <header className="hero">
        <h1 className="hero-title">Ultimate Gaming Concert 2025</h1>
        <p className="hero-subtitle">Level up your gaming experience with live action and exclusive tournaments!</p>
        {timeLeft ? (
          <div className="countdown">
            <h3>Countdown to Gaming Concert:</h3>
            <p>
              {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
            </p>
          </div>
        ) : (
          <p className="live-message">🎮 The gaming concert is live now! 🎮</p>
        )}
      </header>

      {/* Event Details Section */}
      <section className="details-section">
        <h2>Event Details</h2>
        <div className="details-container">
          <div className="detail-card">
            <h3>Date</h3>
            <p>April 15, 2025</p>
          </div>
          <div className="detail-card">
            <h3>Time</h3>
            <p>6:00 PM - 11:00 PM</p>
          </div>
          <div className="detail-card">
            <h3>Venue</h3>
            <p>Gaming Arena, Los Angeles</p>
          </div>
        </div>
      </section>

      {/* Ticket Purchase Section */}
      <section className="tickets-section">
        <h2>Grab Your Tickets</h2>
        <div className="ticket-options">
          <div className="ticket-card">
            <h3>Player Entry</h3>
            <p>Price: $40</p>
            <button className="buy-btn">Buy Now</button>
          </div>
          <div className="ticket-card">
            <h3>VIP Pass</h3>
            <p>Price: $120</p>
            <button className="buy-btn">Buy Now</button>
          </div>
          <div className="ticket-card">
            <h3>Streaming Access</h3>
            <p>Price: $20</p>
            <button className="buy-btn">Buy Now</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 Ultimate Gaming Concert. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default GamingConcert;
