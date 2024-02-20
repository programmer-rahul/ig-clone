import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

// middlewares
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend's origin
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"], // Specify allowed methods
    allowedHeaders: ["Content-Type"], // Specify allowed headers
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(express.static("public"));

// routes

// middleware for errorHandling
app.use(errorHandler);

export default app;
