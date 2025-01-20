import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./createevent.css"

const CreateEventForm = () => {
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
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const decodeJWT = (token) => {
    if (!token) return null;
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => `%${("00" + c.charCodeAt(0).toString(16)).slice(-2)}`)
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error("Invalid token:", error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("You are not logged in. Please log in to create an event.");
      setLoading(false);
      return;
    }

    const decodedToken = decodeJWT(token);

    if (!decodedToken || decodedToken.exp * 1000 < Date.now()) {
      setMessage("Your session has expired. Please log in again.");
      localStorage.removeItem("token");
      setLoading(false);
      navigate("/login");
      return;
    }

    if (decodedToken.role !== "organizer") {
      setMessage("You do not have permission to create events.");
      setLoading(false);
      return;
    }

    const formattedData = { ...formData, category: [formData.category] };

    try {
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
      setFormData({
        name: "",
        location: "",
        description: "",
        startDate: "",
        endDate: "",
        category: "",
        imageUrl: "",
      });
    } catch (error) {
      console.error("Error creating event:", error.response || error.message);
      setMessage(error.response?.data?.message || "Failed to create event.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-event-form">
      <h1>Create Event</h1>
      <form onSubmit={handleSubmit} className="form-container">
        <input
          type="text"
          placeholder="Event Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          className="input-field"
        />
        <input
          type="text"
          placeholder="Location"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          required
          className="input-field"
        />
        <textarea
          placeholder="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          required
          className="textarea-field"
        />
        <input
          type="datetime-local"
          value={formData.startDate}
          onChange={(e) =>
            setFormData({ ...formData, startDate: e.target.value })
          }
          required
          className="input-field"
        />
        <input
          type="datetime-local"
          value={formData.endDate}
          onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
          required
          className="input-field"
        />
        <input
          type="text"
          placeholder="Category"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          required
          className="input-field"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={formData.imageUrl}
          onChange={(e) =>
            setFormData({ ...formData, imageUrl: e.target.value })
          }
          required
          className="input-field"
        />
        <button
          type="submit"
          className={`submit-button ${loading ? "disabled" : ""}`}
          disabled={loading}
        >
          {loading ? "Creating Event..." : "Create Event"}
        </button>
      </form>
      {message && (
        <p className={`message ${message.includes("successfully") ? "success" : "error"}`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default CreateEventForm;
