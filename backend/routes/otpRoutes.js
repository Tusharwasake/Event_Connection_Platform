import { Router } from "express";
import { otpChecker } from "../controllers/otpController.js";
import { authentication } from "../middlewares/authMiddleware.js";
const otpRoutes = Router();

otpRoutes.use(authentication);
otpRoutes.get("/:userid", otpChecker);

export { otpRoutes };
