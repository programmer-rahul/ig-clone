import mongoose from "mongoose";

const FollowSchema = new mongoose.Schema(
  {
    followerId: { 
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    followedId: { 
      required: true,
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const FollowModel = mongoose.model("Follow", FollowSchema);
export default FollowModel;
