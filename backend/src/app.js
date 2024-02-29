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
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/post", postRoutes);

// middleware for errorHandling
app.use(errorHandler);

export default app;
