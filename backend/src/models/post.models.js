import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    uplaoder: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    path: {
      required: true,
      type: String,
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
    likes: [],
    comments: [],
  },
  { timestamps: true }
);

const PostModel = mongoose.model("Post", PostSchema);

export default PostModel;
