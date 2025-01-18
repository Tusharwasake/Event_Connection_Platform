import { Router } from "express";
import { participants } from "../controllers/participantController.js";
import { authentication } from "../middlewares/authMiddleware.js";

const participantRouter = Router();
participantRouter.use(authentication);
participantRouter.post("/", participants);

export { participantRouter };
