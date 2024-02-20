import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(
      `${process.env.MONGODB_URL}/${DB_NAME}`
    );

    console.log("Database Connection :- ", connection.host);
  } catch (error) {
    console.error("Database Connection Error");
  }
};

export default connectDB;
