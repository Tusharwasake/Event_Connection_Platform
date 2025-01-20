import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

// Page Components
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import HelpCenter from "./pages/HelpCenter";
import FindEvents from "./pages/FindEvents";
import Profile from "./pages/Profile";
import Dashboard from "./pages/AdminDashboard";
import FeaturedEvents from "./component/FeaturedEvent";

// Component-Level Features
import CreateEventForm from "./component/CreateEventForm";
import EventCard from "./component/EventCard";
import EventList from "./component/EventList";
import Footer from "./component/Footer";
import Navbar from "./component/Navbar";
import Music from "./event/Musics";
import CreateEvent from "./pages/CreateEvent";
import Features from "./pages/Features";
import Nightlife from "./event/NightLife";
import CategoriesPage from "./pages/CategoriesPage";
import AdminLogin from "./pages/AdminLogin";
import AdminSignUp from "./pages/AdminSignUp";
import AdminDashboard from "./pages/AdminDashboard";
import EventGroup from "./component/EventGroup";
import UserCard from "./pages/UserCard"

const App = () => {
  const location = useLocation();

  // Hide Navbar and Footer on Login and Register Pages
  const hideNavbar = location.pathname === "/login" || location.pathname === "/register";
  const hideFooter = location.pathname === "/login" || location.pathname === "/register";

  return (
    <div >
      {/* Conditionally Render Navbar */}
    
      {!hideNavbar && <Navbar />}
      {/* Application Routes */}
      <div style={{ flex: "1" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/help-center" element={<HelpCenter />} />
          <Route path="/find-events" element={<FindEvents />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create" element={<CreateEvent />} />
          <Route path="/createform" element={<CreateEventForm />} />
          <Route path="/eventcard" element={<EventCard />} />
          <Route path="/events" element={<FeaturedEvents />} />
          <Route path="/music" element={<Music />} />
          <Route path="/event" element={<EventList />} />
          <Route path="/mansab" element={<Features />} />
          <Route path="/nightlife" element={<Nightlife />} />
          <Route path="/help" element={<HelpCenter />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/signup" element={<AdminSignUp />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/group" element={<EventGroup />} />
          <Route path="/user" element={<UserCard/>} />
        </Routes>
      </div>

      {/* Conditionally Render Footer */}
      {!hideFooter && <Footer />}
    </div>
  );
};

export default App;
