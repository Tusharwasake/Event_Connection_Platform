import React, { lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

// Layout Components
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import LoadingSpinner from "./component/LoadingSpinner";

// Lazy-loaded page components
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Home = lazy(() => import("./pages/Home"));
const HelpCenter = lazy(() => import("./pages/HelpCenter"));
const FindEvents = lazy(() => import("./pages/FindEvents"));
const Profile = lazy(() => import("./pages/Profile"));
const CreateEvent = lazy(() => import("./pages/CreateEvent"));
const Features = lazy(() => import("./pages/Features"));
const CategoriesPage = lazy(() => import("./pages/CategoriesPage"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const AdminSignUp = lazy(() => import("./pages/AdminSignUp"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const UserCard = lazy(() => import("./pages/UserCard"));
const EventFinder = lazy(() => import("./pages/eventFinder"));

// Lazy-loaded components and feature sections
const CreateEventForm = lazy(() => import("./component/CreateEventForm"));

const EventList = lazy(() => import("./component/EventList"));
const FeaturedEvents = lazy(() => import("./component/FeaturedEvent"));
const EventGroup = lazy(() => import("./component/EventGroup"));
const Music = lazy(() => import("./event/Musics"));
const Nightlife = lazy(() => import("./event/NightLife"));

// Route configuration array for better maintainability
const routes = [
  { path: "/", element: <Home /> },
  { path: "/home", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/help-center", element: <HelpCenter /> },
  { path: "/help", element: <HelpCenter /> },
  { path: "/find-events", element: <EventFinder /> },
  { path: "/profile/:id", element: <Profile /> },
  { path: "/profile", element: <Profile /> },
  { path: "/createform", element: <CreateEvent /> },
  { path: "/events", element: <EventFinder /> },
  { path: "/music", element: <Music /> },
  { path: "/event", element: <EventFinder /> },
  { path: "/nightlife", element: <Nightlife /> },
  { path: "/categories", element: <CategoriesPage /> },
  { path: "/signup", element: <AdminSignUp /> },
  { path: "/dashboard", element: <AdminDashboard /> },
  { path: "/group", element: <EventGroup /> },
  { path: "/user", element: <UserCard /> },
];

// Set of paths where Navbar and Footer should be hidden
const hiddenNavbarFooterPaths = new Set(["/login", "/register"]);

const App = () => {
  const location = useLocation();
  const showNavbarFooter = !hiddenNavbarFooterPaths.has(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      {showNavbarFooter && <Navbar />}

      <main className="flex-grow">
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            ))}
          </Routes>
        </Suspense>
      </main>

      {showNavbarFooter && <Footer />}
    </div>
  );
};

export default App;
