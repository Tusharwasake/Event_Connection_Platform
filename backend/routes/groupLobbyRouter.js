import { Router } from "express";

import { authentication } from "../middlewares/authMiddleware.js";
import { joinGroupAuthentication } from "../middlewares/joinGroupAuthentication.js";
import { joinGroupController } from "../controllers/joinGroupController.js";

const joinGroupRouter = Router();
joinGroupRouter.use(authentication);
joinGroupRouter.use("/:groupId", joinGroupAuthentication, joinGroupController);

export { joinGroupRouter };
