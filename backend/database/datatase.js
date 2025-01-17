import mongoose from "mongoose";
import "dotenv/config";

const DATABASE_URL = process.env.DATABASE_URL;

const db = async () => {
  try {
    await mongoose.connect(DATABASE_URL);
    console.log("DATABASE connected succesfully");
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1); // Exit process with failure
  }
};

export { db };
