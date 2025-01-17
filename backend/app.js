import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { router } from "./routes/auth.js";

import "dotenv/config";
import { db } from "./database/datatase.js";

//.env files
const SERVER_PORT = process.env.PORT;

//app creation

const app = express();

// middlware
app.use(express.json());
app.use(cors());
app.use(cookieParser()); // Parse cookies

//routes

app.use("/user", router);

//server Start
app.listen(SERVER_PORT, () => {
  try {
    console.log(`server started at: http://localhost:${SERVER_PORT}`);
    db(); // database connection
  } catch (error) {
    console.log("fail to start the server", message.error);
  }
});
