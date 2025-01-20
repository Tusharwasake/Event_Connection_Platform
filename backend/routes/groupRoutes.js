import express from "express";
import {
  createGroup,
  addParticipant,
  removeParticipant,
} from "../controllers/groupController.js";

const groupRoutes = express.Router();

groupRoutes.post("/createGroup", createGroup);
groupRoutes.put("/addParticipant/:groupId/:userId", addParticipant);
groupRoutes.put("/removeParticipant/:groupId/:userId", removeParticipant);

export { groupRoutes };
