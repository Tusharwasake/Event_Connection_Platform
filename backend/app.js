import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { router } from "./routes/auth.js";
import { participantRouter } from "./routes/participants.js";

import "dotenv/config";
import { db } from "./database/datatase.js";
import { eventRouter } from "./routes/eventRoutes.js";

//.env files
const SERVER_PORT = process.env.PORT;

//app creation

const app = express();

// middlware
app.use(express.json());
app.use(cors());
app.use(cookieParser()); // Parse cookies

//routes for user

app.use("/user", router);
app.use("/participants", participantRouter);
app.use("/events", eventRouter);


//server Start
app.listen(SERVER_PORT, () => {
  try {
    console.log(`server started at: http://localhost:${SERVER_PORT}`);
    db(); // database connection
  } catch (error) {
    console.log("fail to start the server", message.error);
  }
});



