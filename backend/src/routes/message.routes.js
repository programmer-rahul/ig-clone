import { Router } from "express";
import {
  addNewMessage,
  getAllMessages,
  getAllChatUsers,
} from "../controller/message.controllers.js";
import auth from "../middlewares/auth.middlewares.js";

const messageRoutes = Router();

messageRoutes.use(auth);

// message
messageRoutes.route("/new-message").post(addNewMessage);
messageRoutes.route("/get-messages/:receiver_id").get(getAllMessages);
messageRoutes.route("/get-all-chat-users").get(getAllChatUsers);

export default messageRoutes;
