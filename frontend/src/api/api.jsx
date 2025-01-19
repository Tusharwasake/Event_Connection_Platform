import axios from "axios";

// Base API instance
const API = axios.create({
  baseURL: "https://two447-event-connection-platform-2.onrender.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add Authorization Header
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Endpoints

// User Signup
export const signup = async (data) => {
  try {
    const response = await API.post("/user/signup", data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// User Login
export const login = async (data) => {
  try {
    const response = await API.post("/user/login", data);
    // Store token on successful login
    localStorage.setItem("accessToken", response.data.accessToken);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Refresh Token
export const refreshAccessToken = async () => {
  try {
    const response = await API.post("/user/refresh");
    localStorage.setItem("accessToken", response.data.accessToken);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Logout
export const logout = async () => {
  try {
    await API.post("/user/logout");
    localStorage.removeItem("accessToken");
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Create Event
export const createEvent = async (data) => {
  try {
    const response = await API.post("/events", data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get All Events
export const getAllEvents = async () => {
  try {
    const response = await API.get("/events");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Register Participant
export const registerParticipant = async (data) => {
  try {
    const response = await API.post("/participants", data);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get Participants by Event
export const getParticipantsByEvent = async (eventId) => {
  try {
    const response = await API.get(`/participants`, {
      params: { eventId },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Delete Event
export const deleteEvent = async (eventId) => {
  try {
    const response = await API.delete(`/events/${eventId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
