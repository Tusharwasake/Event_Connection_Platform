import express from "express";
// import { joinGroupAuthentication } from "../middlewares/joinGroupAuthentication.js"; // Uncomment if using middleware
import { getgroupParticipants } from "../controllers/getGroupParticipants.js";

const groupParticipantsRouter = express.Router();

// This route will use the controller to return group participants
groupParticipantsRouter.get("/:lobbyId", getgroupParticipants);

export { groupParticipantsRouter };
