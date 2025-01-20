import React, { useState } from "react";
import axios from "axios";


const CreateEvent = () => {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    description: "",
    startDate: "",
    endDate: "",
    category: "",
    imageUrl: "",
  });
  const [message, setMessage] = useState("");

  const decodeJWT = (token) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error("Failed to decode token:", error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedData = { ...formData, category: [formData.category] };

    try {
      const token = localStorage.getItem("token");
      console.log("Authorization Token Retrieved:", token);

      if (!token) {
        setMessage("You are not logged in. Please log in to create an event.");
        return;
      }

      const decodedToken = decodeJWT(token);
      console.log("Decoded Token:", decodedToken);

      if (decodedToken && decodedToken.exp * 1000 < Date.now()) {
        setMessage("Your session has expired. Please log in again.");
        return;
      }

      const response = await axios.post(
        "https://two447-event-connection-platform-2.onrender.com/events",
        formattedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setMessage("Event created successfully!");
      console.log("API Response:", response.data);
    } catch (error) {
      console.error("Error creating event:", error);
      console.error("Response Details:", error.response?.data || error.message);
      setMessage(
        error.response?.data?.message || "Failed to create event. Please try again."
      );
    }
  };

  return (
    <div className="create-event-container">
      <h1>Create a New Event</h1>
      <form onSubmit={handleSubmit} className="create-event-form">
        <input
          type="text"
          placeholder="Event Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          required
        />
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          required
        />
        <input
          type="datetime-local"
          value={formData.startDate}
          onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
          required
        />
        <input
          type="datetime-local"
          value={formData.endDate}
          onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Category"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          value={formData.imageUrl}
          onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
          required
        />
        <button type="submit">Create Event</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default CreateEvent;
