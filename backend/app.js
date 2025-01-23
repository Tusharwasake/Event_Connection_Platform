import { createServer } from "http";
import { Server } from "socket.io";

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { router } from "./routes/auth.js";
import { participantRouter } from "./routes/participants.js";

import "dotenv/config";
import { db } from "./database/datatase.js";
import { eventRouter } from "./routes/eventRoutes.js";
import { filterRoutes } from "./routes/filterRoutes.js";
import { joinGroupRouter } from "./routes/groupLobbyRouter.js";
//.env files
const SERVER_PORT = process.env.PORT;

//app creation

const app = express();

const server = createServer(app);
const io = new Server(server);

// middlware
app.use(express.json());
app.use(cors());
app.use(cookieParser()); // Parse cookies

//routes for user

app.use("/user", router);
app.use("/participants", participantRouter);
app.use("/events", eventRouter);
app.use("/filter", filterRoutes);
app.use("/joingroup", joinGroupRouter);

//server Start
app.listen(SERVER_PORT, () => {
  try {
    console.log(`server started at: http://localhost:${SERVER_PORT}`);
    db(); // database connection
  } catch (error) {
    console.log("fail to start the server", message.error);
  }
});
