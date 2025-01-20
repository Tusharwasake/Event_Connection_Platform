import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./home.css";

// Reusable CategoryCard Component
const CategoryCard = ({ to, image, title, description }) => (
  <Link to={to} className="category-card">
    <div>
      <img src={image} alt={title} className="category-card-image" />
      <h3 className="category-card-title">{title}</h3>
      <p className="category-card-description">{description}</p>
    </div>
  </Link>
);

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

  // Categories Data
  const categories = [
    {
      to: "/music",
      image:
        "https://png.pngtree.com/thumb_back/fw800/background/20240610/pngtree-concert-music-festival-and-celebrate-image_15746657.jpg",
      title: "Music",
      description: "Discover live music events and concerts near you.",
    },
    {
      to: "/nightlife",
      image:
        "https://dynamic.tourtravelworld.com/blog_images/nightlife-in-goa-a-party-zoo-for-all-the-nightlife-party-lovers-20201130072206.jpg",
      title: "Nightlife",
      description: "Explore exciting nightlife events and parties.",
    },
    {
      to: "/arts",
      image:
        "https://i0.wp.com/krct.ac.in/blog/wp-content/uploads/2024/04/Ai-in-Arts-5.png?resize=760%2C486&ssl=1",
      title: "Arts",
      description: "Attend art exhibits, theater performances, and more.",
    },
    {
      to: "/technology",
      image:
        "https://img.freepik.com/free-photo/global-business-internet-network-connection-iot-internet-things-business-intelligence-concept-busines-global-network-futuristic-technology-background-ai-generative_1258-176762.jpg?semt=ais_hybrid",
      title: "Technology",
      description: "Discover tech talks, hackathons, and innovation expos.",
    },
    {
      to: "/health",
      image:
        "https://thumbs.dreamstime.com/z/concept-health-wellness-word-cloud-terms-flat-style-87148233.jpg",
      title: "Health & Wellness",
      description:
        "Join yoga classes, wellness retreats, and fitness sessions.",
    },
    {
      to: "/kids",
      image: "https://i.ytimg.com/vi/FHaObkHEkHQ/maxresdefault.jpg",
      title: "Kids & Family",
      description: "Find fun activities and events for kids and families.",
    },
    {
      to: "/charity",
      image:
        "https://thumbs.dreamstime.com/z/charity-word-cloud-heart-concept-56405290.jpg",
      title: "Charity",
      description: "Participate in charitable events and fundraisers.",
    },
    {
      to: "/gaming",
      image:
        "https://imageio.forbes.com/specials-images/imageserve/64aceb40d0ea591fa2edfb01/Two-Technology-Trends-Shaping-The-Future-Of-Gaming/960x0.jpg?height=398&width=711&fit=bounds",
      title: "Gaming",
      description: "Attend gaming tournaments, meetups, and expos.",
    },
    {
      to: "/environment",
      image:
        "https://media.istockphoto.com/id/1394781347/photo/hand-holdig-plant-growing-on-green-background-with-sunshine.jpg?s=612x612&w=0&k=20&c=COX7-_QX8cLlL-oFKQYJgG5CEItpIN4JBbtcjPap1cA=",
      title: "Environment",
      description: "Explore eco-friendly events and sustainability workshops.",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1 className="hero-title">
            Foster Meaningful Connections at Events
          </h1>
          <p className="hero-description">
            Create profiles, discover like-minded individuals, and initiate
            connections seamlessly.
          </p>
          <Link to="/event" className="hero-link">
            <button className="hero-button">Learn More</button>
          </Link>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories">
        <div className="container">
          <h2 className="categories-title">Explore Categories</h2>
          <div className="categories-grid">
            {categories.map((category, index) => (
              <CategoryCard
                key={index}
                to={category.to}
                image={category.image}
                title={category.title}
                description={category.description}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
