import express from "express";
import {
  signup,
  login,
  refreshToken,
  logout,
} from "../controllers/authControllers.js";
// import { authentication } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/signup", signup); // Signup route
router.post("/login", login); // Login route
router.post("/refresh", refreshToken); // Refresh token route
router.post("/logout", logout); // Logout route

// router.use(authentication);

export { router };
