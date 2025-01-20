import express from "express";
import { sendMessage, getMessages } from "../controllers/chatController.js";

const chatRoutes = express.Router();

chatRoutes.post("/sendMessage", sendMessage);
chatRoutes.get("/getMessages/:groupId", getMessages);

export { chatRoutes};
