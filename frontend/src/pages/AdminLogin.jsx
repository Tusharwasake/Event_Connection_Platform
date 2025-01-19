import React, { useState } from "react";
import axios from "axios";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const response = await axios.post(
        "https://two447-event-connection-platform-2.onrender.com/user/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        setSuccess("Login successful!");
        localStorage.setItem("token", response.data.token); // Store token
        localStorage.setItem("user", JSON.stringify(response.data.user)); // Store user details
        // Redirect to admin dashboard
        window.location.href = "/admin/dashboard";
      }
    } catch (error) {
      setError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="login-background">
      <form className="login-form" onSubmit={handleLogin}>
        <h2 className="login-title">Admin Login</h2>
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}
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
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
