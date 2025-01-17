import { Router } from "express";
import {
  login,
  signup,
  refreshToken,
  logout,
} from "../controllers/authControllers.js";


const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/refresh", refreshToken);
router.post("logout", logout);
export { router };
