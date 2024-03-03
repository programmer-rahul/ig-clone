import express, { urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorHandler from "./middlewares/errorHandler.middlewares.js.js";
import { initializeSocket } from "./socket/socket.js";

import { createServer } from "http";
import { Server } from "socket.io";

const app = express();

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

app.set("io", io);

// middlewares
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend's origin
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"], // Specify allowed methods
    allowedHeaders: ["Content-Type", "Authorization"], // Specify allowed headers
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(express.static("public"));

// routes
import userRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js";
import likeRoutes from "./routes/like.routes.js";
import followRoutes from "./routes/follow.route.js";
import commentRoutes from "./routes/comment.route.js";

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/post", postRoutes);
app.use("/api/v1/like", likeRoutes);
app.use("/api/v1/follow", followRoutes);
app.use("/api/v1/comment", commentRoutes);

// io connection
initializeSocket(io);

// middleware for errorHandling
app.use(errorHandler);

export default httpServer;
