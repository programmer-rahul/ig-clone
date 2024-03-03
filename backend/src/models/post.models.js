import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    author: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    path: {
      required: true,
      type: {
        url: String,
        localPath: String,
      },
    },
    description: {
      required: true,
      type: String,
    },
    postType: {
      required: true,
      type: String,
      enum: ["video", "image"],
    },
  },
  { timestamps: true }
);

const PostModel = mongoose.model("Post", PostSchema);

export default PostModel;
