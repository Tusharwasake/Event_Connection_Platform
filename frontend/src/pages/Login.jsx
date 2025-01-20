// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import "./Login.css";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     try {
//       const res = await axios.post(
//         "https://two447-event-connection-platform-2.onrender.com/user/login",
//         { email, password }
//       );
//       // Store token and user data in local storage
//       localStorage.setItem("token", res.data.accessToken);
//       localStorage.setItem("user", JSON.stringify(res.data.user));

//       // Navigate to the home page
//       navigate("/home");
//     } catch (err) {
//       // Set error message if login fails
//       setError(err.response?.data?.msg || "Login failed. Please try again.");
//     }
//   };

//   return (
//     <div className="login-background">
//       <form onSubmit={handleSubmit} className="login-form">
//         <h2>Login</h2>
//         {/* Display error message if login fails */}
//         {error && <p className="error-message">{error}</p>}
//         <div className="form-group">
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-group">
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit" className="submit-button">
//           Login
//         </button>
//       </form>
//       <div className="redirect-container">
//         <p className="redirect-text">
//           Don't have an account?{" "}
//           <Link to="/register" className="signup-link">
//             Sign up
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;



import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await axios.post(
        "https://two447-event-connection-platform-2.onrender.com/user/login",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      // Store token and user data in local storage
      localStorage.setItem("token", res.data.accessToken);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // Navigate to the home page
      navigate("/home");
    } catch (err) {
      // Set error message if login fails
      setError(err.response?.data?.msg || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login</h2>
        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="redirect-container">
          <p>
            Don&apos;t have an account?{' '}
            <Link to="/register" className="signup-link">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
