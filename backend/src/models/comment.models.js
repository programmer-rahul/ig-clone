import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    postId: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
    content: {
      required: true,
      type: String,
      default: "",
    },
    commentedBy: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const CommentModel = mongoose.model("Comment", CommentSchema);
export default CommentModel;
