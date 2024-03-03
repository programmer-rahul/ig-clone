import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import FollowModel from "../models/follow.models.js";

export const addNewFollower = asyncHandler(async (req, res, next) => {
  if (!req?.user) return next(new ApiError(401, "Unauthorized request"));

  const { userid: userId } = req.params;
  // check wheter follower is aleardy exist
  const isFollow = await FollowModel.findOne({
    $and: [{ followerId: req.user._id }, { followedId: userId }],
  });

  if (isFollow) return next(new ApiError(400, "User is already followed"));

  const newFollow = await FollowModel.create({
    followerId: req.user._id,
    followedId: userId,
  });

  if (!newFollow) return next(new ApiError(400, "Error in following user"));

  console.log("User followed success");
  return res
    .status(200)
    .json(new ApiResponse(200, { follow: "" }, "User followed successfully"));
});

export const removeFollower = asyncHandler(async (req, res, next) => {
  if (!req?.user) return next(new ApiError(401, "Unauthorized request"));

  const { userid: userId } = req.params;

  const removedFollow = await FollowModel.findOneAndDelete({
    $and: [{ followerId: req.user._id }, { followedId: userId }],
  });

  if (!removedFollow)
    return next(new ApiError(400, "Error in removing following"));

  console.log("User unfollowed success");
  return res
    .status(200)
    .json(new ApiResponse(200, { follow: "" }, "User unfollowed successfully"));
});
