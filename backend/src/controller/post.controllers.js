import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import PostModel from "../models/post.models.js";
import LikeModel from "../models/like.models.js";
import { emitSocketEvent } from "../socket/socket.js";
import { getStaticFilePath, getLocalFilePath } from "../utils/helper.js";
import mongoose from "mongoose";

export const newPost = asyncHandler(async (req, res, next) => {
  if (!req?.file) return next(new ApiError(400, "Error in uploading"));
  if (!req?.user) return next(new ApiError(401, "Unauthorized request"));

  const { description } = req.body;
  const postType = req.file.mimetype.split("/")[0];

  const url = getStaticFilePath(req, req.file.filename, postType);
  const localPath = getLocalFilePath(req.file.filename, postType);

  console.log(postType);
  console.log(url);
  console.log(localPath);

  const newPost = PostModel.create({
    postType,
    path: {
      url,
      localPath,
    },
    author: req.user._id,
    description,
  });

  if (!newPost) return next(new ApiError(400, "Error in creating post"));

  console.log("Post uploaded successfully");
  return res
    .status(200)
    .json(
      new ApiResponse(200, { post: newPost }, "Post uploaded successfully")
    );
});

export const allPost = asyncHandler(async (req, res, next) => {
  if (!req?.user) return next(new ApiError(401, "Unauthorized request"));

  const allPosts = await PostModel.aggregate([
    {
      $lookup: {
        from: "likes",
        foreignField: "postId",
        localField: "_id",
        as: "likesCount",
      },
    },
    {
      $lookup: {
        from: "likes",
        foreignField: "postId",
        localField: "_id",
        as: "isLiked",
        pipeline: [
          {
            $match: {
              likedUser: new mongoose.Types.ObjectId(req.user?._id),
            },
          },
        ],
      },
    },
    {
      $lookup: {
        from: "comments",
        foreignField: "postId",
        localField: "_id",
        as: "comments",
      },
    },
    {
      $lookup: {
        from: "users",
        foreignField: "_id",
        localField: "author",
        as: "author",

        pipeline: [
          {
            $project: {
              username: 1,
              avatar: 1,
            },
          },
        ],
      },
    },
    {
      $addFields: {
        author: { $first: "$author" },
        description: "$description",
        postType: "$postType",
        path: "$path.url",
        likesCount: { $size: "$likesCount" },
        isLiked: {
          $cond: {
            if: {
              $gte: [{ $size: "$isLiked" }, 1],
            },
            then: true,
            else: false,
          },
        },
        comments: "$comments",
        commentsCount: { $size: "$comments" },
      },
    },
    {
      $addFields: {
        author: {
          username: "$author.username",
          avatar: "$author.avatar.url",
        },
      },
    },
  ]);

  if (!allPosts) return next(new ApiError(400, "Error in fetching all posts"));

  console.log("All Posts :- ", allPosts[0]);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { posts: allPosts },
        "All posts fetched successfully"
      )
    );
});
