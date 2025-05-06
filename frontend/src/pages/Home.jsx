import { useEffect, useState, memo, useCallback, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import "./home.css";

// Memoized CategoryCard Component with improved UI
const CategoryCard = memo(({ to, title, description, image }) => {
  const navigate = useNavigate();
  const cardRef = useRef(null);

  // Use callback to handle navigation and prevent default when needed
  const handleClick = useCallback(
    (e) => {
      e.preventDefault();
      navigate(to);
    },
    [navigate, to]
  );

  // Handle keyboard navigation for accessibility
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        navigate(to);
      }
    },
    [navigate, to]
  );

  return (
    <div
      ref={cardRef}
      className="category-card"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`Go to ${title} events`}
    >
      <div className="category-card-content">
        <div className="category-image-container">
          <img
            src={image}
            alt={title}
            className="category-card-image"
            loading="lazy"
          />
          <div className="category-icon">{title.charAt(0)}</div>
        </div>
        <h3 className="category-card-title">{title}</h3>
        <p className="category-card-description">{description}</p>
        <div className="category-card-footer">
          <span className="category-explore">Explore {title}</span>
        </div>
      </div>
    </div>
  );
});

// Add display name for memo component
CategoryCard.displayName = "CategoryCard";

// Add prop types validation
CategoryCard.propTypes = {
  to: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

// Featured Event Card Component
const FeaturedEventCard = ({ event }) => {
  const navigate = useNavigate();

  const handleViewDetails = useCallback(() => {
    navigate(event.link || `/events/${event.id}`);
  }, [navigate, event]);

  return (
    <div className="event-card featured">
      <div className="event-date">
        <span className="month">{event.month}</span>
        <span className="day">{event.day}</span>
      </div>
      <div className="event-badge">{event.featured ? "FEATURED" : ""}</div>
      <img src={event.image} alt={event.title} className="event-image" />
      <div className="event-content">
        <h3 className="event-title">{event.title}</h3>
        <p className="event-location">{event.location}</p>
        <p className="event-description">{event.description}</p>
        <div className="event-meta">
          <span className="event-attendees">{event.attendees} attending</span>
          <button onClick={handleViewDetails} className="event-link">
            Details
          </button>
        </div>
      </div>
    </div>
  );
};

// Add prop types validation for FeaturedEventCard
FeaturedEventCard.propTypes = {
  event: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    month: PropTypes.string.isRequired,
    day: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    attendees: PropTypes.number.isRequired,
    featured: PropTypes.bool,
    link: PropTypes.string,
  }).isRequired,
};

FeaturedEventCard.displayName = "FeaturedEventCard";

// Sample featured events data
const FEATURED_EVENTS = [
  {
    id: 1,
    title: "Annual Tech Conference 2025",
    month: "MAY",
    day: "12",
    location: "Convention Center, Bangalore",
    image:
      "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?q=80&w=1000&auto=format&fit=crop",
    description:
      "Join industry leaders and innovators for the region&apos;s premier tech event.",
    attendees: 127,
    featured: true,
    link: "/events/tech-conf",
  },
  {
    id: 2,
    title: "Summer Music Festival",
    month: "JUN",
    day: "18",
    location: "City Park Amphitheater",
    image:
      "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6a3?q=80&w=1000",
    description:
      "Experience live performances from top artists across multiple genres.",
    attendees: 352,
    featured: true,
    link: "/events/music-fest",
  },
  {
    id: 3,
    title: "Wellness Retreat Weekend",
    month: "JUL",
    day: "08",
    location: "Serenity Resort & Spa",
    image:
      "https://images.unsplash.com/photo-1598901966230-f5e937c3a064?q=80&w=1000",
    description:
      "A weekend of mindfulness, yoga, and holistic health workshops.",
    attendees: 86,
    featured: true,
    link: "/events/wellness-retreat",
  },
];

// Categories data
const CATEGORIES = [
  {
    id: "music",
    to: "/music",
    image:
      "https://png.pngtree.com/thumb_back/fw800/background/20240610/pngtree-concert-music-festival-and-celebrate-image_15746657.jpg",
    title: "Music",
    description: "Discover live music events and concerts near you.",
  },
  {
    id: "nightlife",
    to: "/nightlife",
    image:
      "https://dynamic.tourtravelworld.com/blog_images/nightlife-in-goa-a-party-zoo-for-all-the-nightlife-party-lovers-20201130072206.jpg",
    title: "Nightlife",
    description: "Explore exciting nightlife events and parties.",
  },
  {
    id: "arts",
    to: "/arts",
    image:
      "https://i0.wp.com/krct.ac.in/blog/wp-content/uploads/2024/04/Ai-in-Arts-5.png?resize=760%2C486&ssl=1",
    title: "Arts",
    description: "Attend art exhibits, theater performances, and more.",
  },
  {
    id: "technology",
    to: "/technology",
    image:
      "https://img.freepik.com/free-photo/global-business-internet-network-connection-iot-internet-things-business-intelligence-concept-busines-global-network-futuristic-technology-background-ai-generative_1258-176762.jpg?semt=ais_hybrid",
    title: "Technology",
    description: "Discover tech talks, hackathons, and innovation expos.",
  },
  {
    id: "health",
    to: "/health",
    image:
      "https://thumbs.dreamstime.com/z/concept-health-wellness-word-cloud-terms-flat-style-87148233.jpg",
    title: "Health & Wellness",
    description: "Join yoga classes, wellness retreats, and fitness sessions.",
  },
  {
    id: "kids",
    to: "/kids",
    image: "https://i.ytimg.com/vi/FHaObkHEkHQ/maxresdefault.jpg",
    title: "Kids & Family",
    description: "Find fun activities and events for kids and families.",
  },
  {
    id: "charity",
    to: "/charity",
    image:
      "https://thumbs.dreamstime.com/z/charity-word-cloud-heart-concept-56405290.jpg",
    title: "Charity",
    description: "Participate in charitable events and fundraisers.",
  },
  {
    id: "gaming",
    to: "/gaming",
    image:
      "https://imageio.forbes.com/specials-images/imageserve/64aceb40d0ea591fa2edfb01/Two-Technology-Trends-Shaping-The-Future-Of-Gaming/960x0.jpg?height=398&width=711&fit=bounds",
    title: "Gaming",
    description: "Attend gaming tournaments, meetups, and expos.",
  },
  {
    id: "environment",
    to: "/environment",
    image:
      "https://media.istockphoto.com/id/1394781347/photo/hand-holdig-plant-growing-on-green-background-with-sunshine.jpg?s=612x612&w=0&k=20&c=COX7-_QX8cLlL-oFKQYJgG5CEItpIN4JBbtcjPap1cA=",
    title: "Environment",
    description: "Explore eco-friendly events and sustainability workshops.",
  },
];

// Custom hook for auth state management
const useAuthStatus = () => {
  const [authState, setAuthState] = useState({
    isLoggedIn: false,
    isAdmin: false,
    user: null,
  });

  const navigate = useNavigate();

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      const userStr = localStorage.getItem("user");
      const user = userStr ? JSON.parse(userStr) : null;

      setAuthState({
        isLoggedIn: !!token,
        isAdmin: user?.role === "admin",
        user,
      });
    } catch (error) {
      console.error("Error loading auth state:", error);
      // Clear corrupted storage
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setAuthState({ isLoggedIn: false, isAdmin: false, user: null });
    // Simple alert instead of toast
    alert("Successfully logged out!");
    navigate("/");
  }, [navigate]);

  return { ...authState, logout };
};

// Hero Section Component with enhanced animation
const HeroSection = ({ isLoggedIn }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animations after component mounts
    setIsVisible(true);
  }, []);

  return (
    <section className="hero">
      <div className="hero-overlay"></div>
      <div className="container hero-container">
        <div className={`hero-content ${isVisible ? "visible" : ""}`}>
          <h1 className="hero-title animate-slide-up">
            Foster Meaningful Connections at Events
          </h1>
          <p className="hero-description animate-slide-up-delay">
            Create profiles, discover like-minded individuals, and initiate
            connections seamlessly.
          </p>
          <div className="hero-cta animate-slide-up-delay-2">
            {isLoggedIn ? (
              <Link to="/find-events" className="hero-button primary">
                Find Events
              </Link>
            ) : (
              <div className="hero-buttons">
                <Link to="/event" className="hero-button primary">
                  Explore Events
                </Link>
                <Link to="/login" className="hero-button secondary">
                  Sign In
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="hero-wave">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
        >
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,32L60,42.7C120,53,240,75,360,74.7C480,75,600,53,720,42.7C840,32,960,32,1080,42.7C1200,53,1320,75,1380,85.3L1440,96L1440,100L1380,100C1320,100,1200,100,1080,100C960,100,840,100,720,100C600,100,480,100,360,100C240,100,120,100,60,100L0,100Z"
          ></path>
        </svg>
      </div>
    </section>
  );
};

// Add prop types for HeroSection
HeroSection.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

// Enhanced Featured Events Section with carousel functionality
const FeaturedEvents = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const eventsRef = useRef(null);

  const goToNext = useCallback(() => {
    setActiveIndex((prevIndex) =>
      prevIndex === FEATURED_EVENTS.length - 1 ? 0 : prevIndex + 1
    );
  }, []);

  const goToPrev = useCallback(() => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? FEATURED_EVENTS.length - 1 : prevIndex - 1
    );
  }, []);

  useEffect(() => {
    // Auto-advance carousel every 5 seconds
    const interval = setInterval(goToNext, 5000);
    return () => clearInterval(interval);
  }, [goToNext]);

  return (
    <section className="featured-events">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Featured Events</h2>
          <Link to="/events" className="view-all">
            View All
          </Link>
        </div>
        <div className="featured-events-carousel" ref={eventsRef}>
          <div
            className="carousel-inner"
            style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          >
            {FEATURED_EVENTS.map((event) => (
              <div className="carousel-item" key={event.id}>
                <FeaturedEventCard event={event} />
              </div>
            ))}
          </div>

          <button
            className="carousel-control prev"
            onClick={goToPrev}
            aria-label="Previous event"
          >
            ❮
          </button>
          <button
            className="carousel-control next"
            onClick={goToNext}
            aria-label="Next event"
          >
            ❯
          </button>

          <div className="carousel-indicators">
            {FEATURED_EVENTS.map((_, index) => (
              <button
                key={index}
                className={`carousel-indicator ${
                  index === activeIndex ? "active" : ""
                }`}
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Enhanced Testimonials Section with improved styling
const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Tech Enthusiast",
      avatar: "https://i.pravatar.cc/150?img=1",
      text: "This platform has completely transformed how I discover and connect with people at events. I&apos;ve made lasting friendships!",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Event Organizer",
      avatar: "https://i.pravatar.cc/150?img=2",
      text: "As an event organizer, this platform has helped me reach my target audience effectively and increase attendance.",
    },
    {
      id: 3,
      name: "Priya Sharma",
      role: "Community Leader",
      avatar: "https://i.pravatar.cc/150?img=5",
      text: "The ability to connect with like-minded individuals has made attending events much more meaningful and productive.",
    },
  ];

  return (
    <section className="testimonials">
      <div className="container">
        <h2 className="section-title">What Our Users Say</h2>
        <div className="testimonials-grid">
          {testimonials.map((testimonial) => (
            <div className="testimonial-card" key={testimonial.id}>
              <div className="testimonial-quote-mark">&quot;</div>
              <div className="testimonial-avatar">
                <img src={testimonial.avatar} alt={testimonial.name} />
              </div>
              <p className="testimonial-text">{testimonial.text}</p>
              <div className="testimonial-author">
                <h4>{testimonial.name}</h4>
                <p>{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Enhanced Newsletter Section with validation
const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setIsValid(false);
      return;
    }

    setIsValid(true);
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setEmail("");

      // Reset success message after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    }, 1500);
  };

  return (
    <section className="newsletter">
      <div className="container">
        <div className="newsletter-content">
          <h2 className="section-title">Stay Updated</h2>
          <p>Subscribe to our newsletter for the latest events and updates.</p>
          {isSuccess ? (
            <div className="newsletter-success">
              <div className="success-icon">✓</div>
              <p>Thank you for subscribing!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="newsletter-form">
              <div className="input-wrapper">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (!isValid) setIsValid(validateEmail(e.target.value));
                  }}
                  placeholder="Your email address"
                  required
                  className={!isValid ? "invalid" : ""}
                />
                {!isValid && (
                  <span className="error-message">
                    Please enter a valid email
                  </span>
                )}
              </div>
              <button
                type="submit"
                className="newsletter-button"
                disabled={isSubmitting}
              >
                {isSubmitting ? <span className="spinner"></span> : "Subscribe"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

// App Statistics Section
const StatisticsSection = () => {
  const stats = [
    { number: "10,000+", label: "Active Users" },
    { number: "500+", label: "Events Monthly" },
    { number: "50+", label: "Cities" },
    { number: "98%", label: "Satisfaction Rate" },
  ];

  return (
    <section className="statistics">
      <div className="container">
        <div className="statistics-grid">
          {stats.map((stat, index) => (
            <div className="statistic-card" key={index}>
              <h3 className="statistic-number">{stat.number}</h3>
              <p className="statistic-label">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Call To Action Section
const CallToActionSection = ({ isLoggedIn }) => (
  <section className="cta-section">
    <div className="container">
      <div className="cta-content">
        <h2>Ready to Connect at Your Next Event?</h2>
        <p>Join our community and start making meaningful connections today.</p>
        <div className="cta-buttons">
          {isLoggedIn ? (
            <Link to="/createform" className="cta-button primary">
              Create an Event
            </Link>
          ) : (
            <>
              <Link to="/register" className="cta-button primary">
                Join Now
              </Link>
              <Link to="/event" className="cta-button secondary">
                Browse Events
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  </section>
);

// Add prop types for CallToActionSection
CallToActionSection.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

// Main Home Component
const Home = () => {
  const { isLoggedIn } = useAuthStatus();

  return (
    <main className="home-page">
      <HeroSection isLoggedIn={isLoggedIn} />
      <FeaturedEvents />
      <StatisticsSection />
      {/* <CategoriesSection /> */}
      <TestimonialsSection />
      <CallToActionSection isLoggedIn={isLoggedIn} />
      <NewsletterSection />
    </main>
  );
};

export default Home;
