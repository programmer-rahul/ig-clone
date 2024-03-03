import mongoose from "mongoose";

const LikeSchema = new mongoose.Schema(
  {
    postId: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
    likedUser: {
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const LikeModel = mongoose.model("Like", LikeSchema);
export default LikeModel;
