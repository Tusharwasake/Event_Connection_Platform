import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Calendar,
  Clock,
  MapPin,
  Tag,
  Image as ImageIcon,
  Info,
  ArrowRight,
  AlertCircle,
} from "lucide-react";
import "./CreateEvent.css";

const CreateEvent = () => {
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    description: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    category: "",
    imageUrl: "",
  });

  // Form validation
  const [errors, setErrors] = useState({});

  // Feedback state
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // success, error
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Category options
  const categoryOptions = [
    { value: "", label: "Select a category" },
    { value: "music", label: "Music" },
    { value: "art", label: "Art & Culture" },
    { value: "technology", label: "Technology" },
    { value: "business", label: "Business" },
    { value: "education", label: "Education" },
    { value: "sports", label: "Sports" },
    { value: "food", label: "Food & Drink" },
    { value: "health", label: "Health & Wellness" },
    { value: "socializing", label: "Socializing" },
    { value: "other", label: "Other" },
  ];

  // Check if user is authenticated
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setMessage("You must be logged in to create an event.");
      setMessageType("error");
    }
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  // Validate form data
  const validateForm = () => {
    let tempErrors = {};
    let isValid = true;

    // Name validation
    if (!formData.name.trim()) {
      tempErrors.name = "Event name is required";
      isValid = false;
    } else if (formData.name.length < 3) {
      tempErrors.name = "Event name must be at least 3 characters";
      isValid = false;
    }

    // Location validation
    if (!formData.location.trim()) {
      tempErrors.location = "Location is required";
      isValid = false;
    }

    // Description validation
    if (!formData.description.trim()) {
      tempErrors.description = "Description is required";
      isValid = false;
    } else if (formData.description.length < 20) {
      tempErrors.description = "Description should be at least 20 characters";
      isValid = false;
    }

    // Date & Time validation
    if (!formData.startDate) {
      tempErrors.startDate = "Start date is required";
      isValid = false;
    }

    if (!formData.startTime) {
      tempErrors.startTime = "Start time is required";
      isValid = false;
    }

    if (!formData.endDate) {
      tempErrors.endDate = "End date is required";
      isValid = false;
    }

    if (!formData.endTime) {
      tempErrors.endTime = "End time is required";
      isValid = false;
    }

    // Check if end date/time is after start date/time
    const startDateTime = new Date(
      `${formData.startDate}T${formData.startTime}`
    );
    const endDateTime = new Date(`${formData.endDate}T${formData.endTime}`);

    if (startDateTime >= endDateTime) {
      tempErrors.endDate = "End date/time must be after start date/time";
      isValid = false;
    }

    // Category validation
    if (!formData.category) {
      tempErrors.category = "Please select a category";
      isValid = false;
    }

    // Image URL validation (optional but validate format if provided)
    if (formData.imageUrl && !isValidUrl(formData.imageUrl)) {
      tempErrors.imageUrl = "Please enter a valid image URL";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  // Helper function to validate URL
  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  // Decode JWT token
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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (!validateForm()) {
      // Scroll to the first error
      const firstErrorField = Object.keys(errors)[0];
      const errorElement = document.querySelector(
        `[name="${firstErrorField}"]`
      );
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    // Combine date and time fields
    const startDateTime = new Date(
      `${formData.startDate}T${formData.startTime}`
    ).toISOString();
    const endDateTime = new Date(
      `${formData.endDate}T${formData.endTime}`
    ).toISOString();

    // Prepare data for API
    const eventData = {
      name: formData.name,
      location: formData.location,
      description: formData.description,
      startDate: startDateTime,
      endDate: endDateTime,
      category: [formData.category], // API expects an array
      imageUrl: formData.imageUrl,
    };

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setMessage("You are not logged in. Please log in to create an event.");
        setMessageType("error");
        setIsSubmitting(false);
        return;
      }

      const decodedToken = decodeJWT(token);

      if (decodedToken && decodedToken.exp * 1000 < Date.now()) {
        setMessage("Your session has expired. Please log in again.");
        setMessageType("error");
        setIsSubmitting(false);
        // Redirect to login page
        setTimeout(() => navigate("/login"), 2000);
        return;
      }

      const response = await axios.post(
        "https://two447-event-connection-platform-2.onrender.com/events",
        eventData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setMessage("Event created successfully!");
      setMessageType("success");

      // Reset form
      setFormData({
        name: "",
        location: "",
        description: "",
        startDate: "",
        startTime: "",
        endDate: "",
        endTime: "",
        category: "",
        imageUrl: "",
      });

      // Navigate to event page after a short delay
      setTimeout(() => {
        navigate(`/event/${response.data.id}`);
      }, 2000);
    } catch (error) {
      console.error("Error creating event:", error);
      console.error("Response Details:", error.response?.data || error.message);

      setMessage(
        error.response?.data?.message ||
          "Failed to create event. Please try again."
      );
      setMessageType("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Preview image
  const previewImage =
    formData.imageUrl && isValidUrl(formData.imageUrl)
      ? formData.imageUrl
      : "https://via.placeholder.com/400x200?text=Event+Image+Preview";

  return (
    <div className="create-event-container">
      <div className="create-event-header">
        <h1>Create a New Event</h1>
        <p>
          Fill in the details below to create your event and connect with
          attendees.
        </p>
      </div>

      {message && (
        <div className={`message-container ${messageType}`}>
          {messageType === "error" ? (
            <AlertCircle size={20} />
          ) : (
            <Info size={20} />
          )}
          <p>{message}</p>
        </div>
      )}

      <div className="create-event-content">
        <form onSubmit={handleSubmit} className="create-event-form">
          <div className="form-section">
            <h2>Basic Information</h2>

            <div className="form-group">
              <label htmlFor="name">Event Name*</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Give your event a clear, catchy name"
                value={formData.name}
                onChange={handleInputChange}
                className={errors.name ? "error" : ""}
              />
              {errors.name && (
                <div className="error-message">{errors.name}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="location">Location*</label>
              <div className="input-with-icon">
                <MapPin size={18} />
                <input
                  type="text"
                  id="location"
                  name="location"
                  placeholder="Where will your event take place?"
                  value={formData.location}
                  onChange={handleInputChange}
                  className={errors.location ? "error" : ""}
                />
              </div>
              {errors.location && (
                <div className="error-message">{errors.location}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="description">Description*</label>
              <textarea
                id="description"
                name="description"
                placeholder="Describe your event in detail. What can attendees expect?"
                value={formData.description}
                onChange={handleInputChange}
                rows="5"
                className={errors.description ? "error" : ""}
              />
              {errors.description && (
                <div className="error-message">{errors.description}</div>
              )}
              <div className="character-count">
                {formData.description.length} characters
                {formData.description.length < 20 && " (minimum 20)"}
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>Date & Time</h2>

            <div className="date-time-container">
              <div className="date-time-group">
                <h3>Start</h3>
                <div className="date-time-inputs">
                  <div className="form-group">
                    <label htmlFor="startDate">Date*</label>
                    <div className="input-with-icon">
                      <Calendar size={18} />
                      <input
                        type="date"
                        id="startDate"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleInputChange}
                        className={errors.startDate ? "error" : ""}
                        min={new Date().toISOString().split("T")[0]}
                      />
                    </div>
                    {errors.startDate && (
                      <div className="error-message">{errors.startDate}</div>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="startTime">Time*</label>
                    <div className="input-with-icon">
                      <Clock size={18} />
                      <input
                        type="time"
                        id="startTime"
                        name="startTime"
                        value={formData.startTime}
                        onChange={handleInputChange}
                        className={errors.startTime ? "error" : ""}
                      />
                    </div>
                    {errors.startTime && (
                      <div className="error-message">{errors.startTime}</div>
                    )}
                  </div>
                </div>
              </div>

              <div className="date-time-group">
                <h3>End</h3>
                <div className="date-time-inputs">
                  <div className="form-group">
                    <label htmlFor="endDate">Date*</label>
                    <div className="input-with-icon">
                      <Calendar size={18} />
                      <input
                        type="date"
                        id="endDate"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleInputChange}
                        className={errors.endDate ? "error" : ""}
                        min={
                          formData.startDate ||
                          new Date().toISOString().split("T")[0]
                        }
                      />
                    </div>
                    {errors.endDate && (
                      <div className="error-message">{errors.endDate}</div>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="endTime">Time*</label>
                    <div className="input-with-icon">
                      <Clock size={18} />
                      <input
                        type="time"
                        id="endTime"
                        name="endTime"
                        value={formData.endTime}
                        onChange={handleInputChange}
                        className={errors.endTime ? "error" : ""}
                      />
                    </div>
                    {errors.endTime && (
                      <div className="error-message">{errors.endTime}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h2>Category & Image</h2>

            <div className="form-group">
              <label htmlFor="category">Category*</label>
              <div className="input-with-icon">
                <Tag size={18} />
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className={errors.category ? "error" : ""}
                >
                  {categoryOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              {errors.category && (
                <div className="error-message">{errors.category}</div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="imageUrl">Image URL (Optional)</label>
              <div className="input-with-icon">
                <ImageIcon size={18} />
                <input
                  type="text"
                  id="imageUrl"
                  name="imageUrl"
                  placeholder="Enter a URL for your event image"
                  value={formData.imageUrl}
                  onChange={handleInputChange}
                  className={errors.imageUrl ? "error" : ""}
                />
              </div>
              {errors.imageUrl && (
                <div className="error-message">{errors.imageUrl}</div>
              )}
            </div>

            <div className="image-preview">
              <h3>Image Preview</h3>
              <img src={previewImage} alt="Event Preview" />
              <p className="image-hint">
                {formData.imageUrl
                  ? isValidUrl(formData.imageUrl)
                    ? "Your event image preview"
                    : "Enter a valid URL to preview your image"
                  : "Add an image URL to preview your event image"}
              </p>
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="primary-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="loading-spinner"></span>
              ) : (
                <>
                  Create Event
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </div>
        </form>

        <div className="create-event-sidebar">
          <div className="sidebar-section">
            <h3>Tips for a Great Event</h3>
            <ul className="tips-list">
              <li>
                <strong>Be descriptive</strong>
                <p>
                  Provide all the details attendees need to know about your
                  event.
                </p>
              </li>
              <li>
                <strong>Choose the right category</strong>
                <p>
                  This helps your event get discovered by interested people.
                </p>
              </li>
              <li>
                <strong>Add a compelling image</strong>
                <p>Events with images get up to 2x more attendees.</p>
              </li>
              <li>
                <strong>Be specific about location</strong>
                <p>Include address details and any special instructions.</p>
              </li>
            </ul>
          </div>

          <div className="sidebar-section faq">
            <h3>Frequently Asked Questions</h3>
            <div className="faq-item">
              <h4>How do I edit my event after creating it?</h4>
              <p>You can edit your event anytime from your profile page.</p>
            </div>
            <div className="faq-item">
              <h4>Who can see my event?</h4>
              <p>
                Your event will be visible to all LinkUp! users unless you set
                it as private.
              </p>
            </div>
            <div className="faq-item">
              <h4>Can I limit the number of attendees?</h4>
              <p>Yes, you can set a maximum capacity in the event settings.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
