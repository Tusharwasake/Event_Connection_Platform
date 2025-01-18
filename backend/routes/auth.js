import express from "express";
import {
  signup,
  login,
  refreshToken,
  logout,
} from "../controllers/authControllers.js";

const router = express.Router();

router.post("/signup", signup); // Signup route
router.post("/login", login); // Login route
router.post("/refresh", refreshToken); // Refresh token route
router.post("/logout", logout); // Logout route

export { router };
