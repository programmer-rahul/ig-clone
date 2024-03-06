import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    sender: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    receiver: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    content: {
      required: true,
      type: String,
    },
  },
  { timestamps: true }
);

const MessageModel = mongoose.model("Message", MessageSchema);
export default MessageModel;
