import mongoose from "mongoose";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import MessageModel from "../models/message.models.js";

import { emitSocketEvent } from "../socket/socket.js";
import UserModel from "../models/user.models.js";

export const addNewMessage = asyncHandler(async (req, res, next) => {
  const { content, receiverId } = req.body;

  if (!content && !receiverId) {
    return next(new ApiError(400, "All fields required"));
  }

  const newMessage = await MessageModel.create({
    sender: req.user?._id,
    receiver: receiverId,
    content: content,
  });
  console.log(newMessage);
  if (!newMessage) return next(new ApiError(400, "Wrong mongoid's"));

  const message = {
    _id: newMessage._id,
    sender: newMessage.sender,
    receiver: newMessage.receiver,
    content: newMessage.content,
  };

  // sendNotification
  emitSocketEvent(req, receiverId, "receive-message", message);

  return res
    .status(200)
    .json(
      new ApiResponse(200, { message: message }, "Message saved successfully")
    );
});

export const getAllMessages = asyncHandler(async (req, res, next) => {
  const { receiver_id } = req.params;

  if (!receiver_id) {
    return next(new ApiError(400, "Receiver id should not be empty"));
  }

  const allMessages = await MessageModel.find({
    $or: [
      { sender: req.user._id, receiver: receiver_id },
      { sender: receiver_id, receiver: req.user._id },
    ],
  });

  // console.log(allMessages);
  if (!allMessages) return next(new ApiError(400, "Wrong mongodb'ids"));

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { messages: allMessages },
        "Message saved successfully"
      )
    );
});

export const getAllChatUsers = asyncHandler(async (req, res, next) => {
  const allChatUsers = await UserModel.find({}).select(
    "username fullname avatar"
  );
  // remove use from list
  const allUsers = allChatUsers.filter(
    (user) => user.username !== req.user.username
  );

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { allChatUsers: allUsers },
        "All chat users fetched successfully"
      )
    );
});
