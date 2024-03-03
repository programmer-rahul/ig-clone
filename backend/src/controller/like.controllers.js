import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import PostModel from "../models/post.models.js";
import LikeModel from "../models/like.models.js";
import { emitSocketEvent } from "../socket/socket.js";

//  likes
export const addPostLike = asyncHandler(async (req, res, next) => {
  if (!req?.user) return next(new ApiError(401, "Unauthorized request"));

  // console.log(req.params);
  const { postid: postId } = req.params;

  // check that post exists
  const isPost = await PostModel.findById(postId);
  if (!isPost) return next(new ApiError(400, "Post does not exits"));

  // check if user is already like the post or not

  const isLiked = await LikeModel.findOne({
    postId,
    likedUser: req?.user._id,
  });

  if (isLiked) return next(new ApiError(400, "Post is aleardy liked"));

  const newLike = await LikeModel.create({
    postId,
    likedUser: req.user._id,
  });
  if (!newLike) return next(new ApiError(400, "Error in creating like in db"));

  if (!isPost) return next(new ApiError(400, "wrong post id"));

  if (isPost.author.toString() !== req.user._id.toString()) {
    emitSocketEvent(req, isPost?.author.toString(), "notification", {
      content: "liked your post",
      username: req.user.username,
      avatarUrl: req.user.avatar?.url,
      createAt: Date.now(),
    });
  }

  console.log("Post liked");
  return res
    .status(200)
    .json(new ApiResponse(200, { like: "" }, "Post liked successfully"));
});

export const removePostLike = asyncHandler(async (req, res, next) => {
  if (!req?.user) return next(new ApiError(401, "Unauthorized request"));

  const { postid: postId } = req.params;

  const removedLike = await LikeModel.findOneAndDelete({
    $and: [{ postId: postId }, { likedUser: req.user._id }],
  });
  if (!removedLike) return next(new ApiError(400, "wrong post id"));

  console.log("Post like removed");
  return res
    .status(200)
    .json(new ApiResponse(200, { like: "" }, "Post like remove successfully"));
});
