import cookie from "cookie";
import ApiError from "../utils/ApiError.js";
import { validateToken } from "../utils/validateToken.js";
import UserModel from "../models/user.models.js";

const initializeSocket = (io) => {
  return io.on("connection", async (socket) => {
    try {
      const cookies = cookie.parse(socket.handshake.headers?.cookie || "");
      const token = cookies?.accessToken;

      if (!token) {
        token = socket.handshake.auth?.token;
      }
      // console.log(token);

      if (!token) {
        throw new ApiError(401, "Unauthrized request , token is not found");
      }

      const decodedToken = validateToken(token, process.env.ACCESS_TOKEN_KEY);
      // console.log(decodedToken);

      const user = await UserModel.findById(decodedToken._id).select(
        "username email"
      );

      if (!user) {
        throw new ApiError(401, "Unauthrized request , token is not valid");
      }
      socket.user = user;
      // console.log(socket.user);

      socket.join(user._id.toString());
      socket.emit("connected");

      console.log(
        "User connected 🗼. userId: ",
        user.id.toString(),
        user.username
      );

      socket.on("disconnect", () => {
        console.log("user has disconnected 🚫. userId: " + socket.user?._id);
        if (socket.user?._id) {
          socket.leave(socket.user._id);
        }
      });
    } catch (error) {
      socket.emit(
        "socket-error",
        error?.message || "Something went wrong during socket connection"
      );
    }
  });
};

const emitSocketEvent = (req, roomId, event, payload) => {
  req.app.get("io").in(roomId).emit(event, payload);
};

export { initializeSocket, emitSocketEvent };
