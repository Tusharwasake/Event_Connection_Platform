import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));

    setIsLoggedIn(!!token);
    setIsAdmin(user?.role === "admin"); // Check if the user's role is admin
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setIsAdmin(false);
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-container">
          <h1 className="logo">
            <Link to="/">LinkUp!</Link>
          </h1>
          <div className="search-bar">
            <span className="icon">&#128269;</span>
            <input type="text" placeholder="Search events" />
            <span className="divider"></span>
            <span className="icon">&#128205;</span>
            <span className="location">Bhopal</span>
          </div>
          <div className="nav-links">
            <Link to="/event">
              <button>Find Events</button>
            </Link>
            <Link to="/createform">
              <button>Create Events</button>
            </Link>
            <Link to="/event">
              <button>My Tickets</button>
            </Link>
            {isAdmin && ( // Show Admin button only if user is an admin
              <Link to="/admin">
                <button className="admin-btn">Admin Panel</button>
              </Link>
            )}
            {isLoggedIn ? (
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            ) : (
              <Link to="/login">
                <button className="signin-btn">Sign In</button>
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1>Foster Meaningful Connections at Events</h1>
          <p>Create profiles, discover like-minded individuals, and initiate connections seamlessly.</p>
          <Link to="/event">
            <button className="hero-btn">Learn More</button>
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories">
        <div className="container">
          <h2>Explore Categories</h2>
          <div className="categories-grid">
            <Link to="/music">
              <div className="category-card">
                <img
                  src="https://png.pngtree.com/thumb_back/fw800/background/20240610/pngtree-concert-music-festival-and-celebrate-image_15746657.jpg"
                  alt="Music"
                />
                <h3>Music</h3>
                <p>Discover live music events and concerts near you.</p>
              </div>
            </Link>
            <Link to="/nightlife">
              <div className="category-card">
                <img
                  src="https://dynamic.tourtravelworld.com/blog_images/nightlife-in-goa-a-party-zoo-for-all-the-nightlife-party-lovers-20201130072206.jpg"
                  alt="Nightlife"
                />
                <h3>Nightlife</h3>
                <p>Explore exciting nightlife events and parties.</p>
              </div>
            </Link>
            <Link to="/arts">
              <div className="category-card">
                <img
                  src="https://i0.wp.com/krct.ac.in/blog/wp-content/uploads/2024/04/Ai-in-Arts-5.png?resize=760%2C486&ssl=1"
                  alt="Arts"
                />
                <h3>Arts</h3>
                <p>Attend art exhibits, theater performances, and more.</p>
              </div>
            </Link>
            <Link to="/technology">
              <div className="category-card">
                <img
                  src="https://img.freepik.com/free-photo/global-business-internet-network-connection-iot-internet-things-business-intelligence-concept-busines-global-network-futuristic-technology-background-ai-generative_1258-176762.jpg?semt=ais_hybrid"
                  alt="Technology"
                />
                <h3>Technology</h3>
                <p>Discover tech talks, hackathons, and innovation expos.</p>
              </div>
            </Link>
            <Link to="/health">
              <div className="category-card">
                <img
                  src="https://thumbs.dreamstime.com/z/concept-health-wellness-word-cloud-terms-flat-style-87148233.jpg"
                  alt="Health"
                />
                <h3>Health & Wellness</h3>
                <p>Join yoga classes, wellness retreats, and fitness sessions.</p>
              </div>
            </Link>
            <Link to="/kids">
              <div className="category-card">
                <img
                  src="https://i.ytimg.com/vi/FHaObkHEkHQ/maxresdefault.jpg"
                  alt="Kids"
                />
                <h3>Kids & Family</h3>
                <p>Find fun activities and events for kids and families.</p>
              </div>
            </Link>
            <Link to="/charity">
              <div className="category-card">
                <img
                  src="https://thumbs.dreamstime.com/z/charity-word-cloud-heart-concept-56405290.jpg"
                  alt="Charity"
                />
                <h3>Charity</h3>
                <p>Participate in charitable events and fundraisers.</p>
              </div>
            </Link>
            <Link to="/gaming">
              <div className="category-card">
                <img
                  src="https://imageio.forbes.com/specials-images/imageserve/64aceb40d0ea591fa2edfb01/Two-Technology-Trends-Shaping-The-Future-Of-Gaming/960x0.jpg?height=398&width=711&fit=bounds"
                  alt="Gaming"
                />
                <h3>Gaming</h3>
                <p>Attend gaming tournaments, meetups, and expos.</p>
              </div>
            </Link>
            <Link to="/environment">
              <div className="category-card">
                <img
                  src="https://media.istockphoto.com/id/1394781347/photo/hand-holdig-plant-growing-on-green-background-with-sunshine.jpg?s=612x612&w=0&k=20&c=COX7-_QX8cLlL-oFKQYJgG5CEItpIN4JBbtcjPap1cA="
                  alt="Environment"
                />
                <h3>Environment</h3>
                <p>Explore eco-friendly events and sustainability workshops.</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <p>&copy; 2025 Event Connection Platform. All rights reserved.</p>
          <div className="footer-links">
            <Link to="/privacy-policy">Privacy Policy</Link>
            <Link to="/terms-of-service">Terms of Service</Link>
            <Link to="/contact">Contact Us</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
