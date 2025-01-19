import React from "react";
import { Routes, Route } from "react-router-dom";

// Page Components
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import HelpCenter from "./pages/HelpCenter";
import FindEvents from "./pages/FindEvents";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import FeaturedEvents from "./component/FeaturedEvent";

// Component-Level Features
import CreateEventForm from "./component/CreateEventForm";
// import Header from './component/Header';
import EventCard from './component/EventCard';
import EventList from "./component/EventList";
import Footer from "./component/Footer";
import Navbar from "./component/Navbar";
import Music from "./event/Musics";
import CreateEvent from "./pages/CreateEvent";
import Features from "./pages/Features";
import Nightlife from "./event/NightLife";


const App = () => {
  return (
    <div>
      {/* Global Header */}
      {/* <Navbar /> */}

      {/* Application Routes */}
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
        
        
        
        

      </Routes>
      <Footer/>
    </div>
  );
};

export default App;
