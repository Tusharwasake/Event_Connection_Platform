import React, { useState } from "react";
import axios from "axios";

const AdminSignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const response = await axios.post(
        "https://two447-event-connection-platform-2.onrender.com/user/signup",
        {
          name,
          email,
          password,
          role: "admin", // Specify admin role
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 201) {
        setSuccess("Sign-Up successful! Please log in.");
        setEmail("");
        setPassword("");
        setName("");
      }
    } catch (error) {
      setError("Sign-Up failed. Please try again.");
    }
  };

  return (
    <div className="signup-background">
      <form className="signup-form" onSubmit={handleSignUp}>
        <h2 className="signup-title">Admin Sign Up</h2>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default AdminSignUp;
