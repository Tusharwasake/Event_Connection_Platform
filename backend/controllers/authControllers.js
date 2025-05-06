import * as argon2 from "argon2";
import jwt from "jsonwebtoken";

import { userModel } from "../models/userModel.js";
import "dotenv/config";

const signup = async (req, res) => {
  const { email, password, role } = req.body;

  if (!role || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const existingUser = await userModel.findOne({ email });

  if (existingUser) {
    return res.status(400).json({ message: "User with email already exist" });
  }

  try {
    const hash = await argon2.hash(password);

    const payload = {
      email: email,
      password: hash,
      role: role || "participant",
    };

    const createData = await userModel.create(payload);

    res.status(201).json({
      message: "Your Account Created Successfully",
      payload: createData,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Function to generate a new access token
const generateAccessToken = (user) => {
  return jwt.sign(
    {
      userId: user._id,
      role: user.role,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1d" } // Access token valid for 15 minutes
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    { userId: user._id, role: user.role }, // Payload
    process.env.REFRESH_TOKEN_SECRET, // Secret key
    { expiresIn: "7d" } // Valid for 7 days
  );
};

const login = async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Fetch the user from the database
    const fetchUser = await userModel.findOne({ email }); // Add `await`

    if (!fetchUser) {
      return res.status(404).json({ message: "User not found" }); // Handle user not found
    }

    // Verify the password
    const verify = await argon2.verify(fetchUser.password, password);
    if (!verify) {
      return res.status(401).json({ message: "Invalid credentials" }); // Handle incorrect password
    }

    // Generate tokens
    const accessToken = generateAccessToken(fetchUser);

    const refreshToken = generateRefreshToken(fetchUser);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true, // Prevent JavaScript access
      secure: process.env.NODE_ENV === "production", // HTTPS in production
      sameSite: "Strict", // CSRF protection
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Send response with tokens and user data
    res.status(200).json({
      message: "Login successful",
      accessToken,
      refreshToken,
      user: {
        id: fetchUser._id,
        email: fetchUser.email,
        role: fetchUser.role,
      },
    });
  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const refreshToken = (req, res) => {
  // console.log("Refresh Token:", req.cookies);
  const refreshToken = req.cookies.refreshToken; // Corrected: req.cookies

  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token not provided" });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    const newAccessToken = generateAccessToken({
      userId: decoded.userId,
      role: decoded.role,
    });

    res.status(200).json({
      accessToken: newAccessToken,
    });
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired refresh token" });
  }
};

const logout = (req, res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  });

  res.status(204).send(); // Respond with No Content
};

export { signup, login, refreshToken, logout };
  