import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import Post from "../models/Post.js";

export const newPost = asyncHandler(async (req, res, next) => {
  console.log("here");
  if (!req?.file) return next(new ApiError(400, "Error in uploading"));
  console.log(req.user);
  if (!req?.user) return next(new ApiError(400, "Unauthorized request"));

  const { description } = req.body;
  const postType = req.file.mimetype.split("/")[0];

  const newPost = Post.create({
    postType,
    path: req.file.path,
    uplaoder: req.user._id,
    description,
  });

  if (!newPost) return next(new ApiError(400, "Error in creating post"));
  return res
    .status(200)
    .json(
      new ApiResponse(200, { post: newPost }, "Post uploaded successfully")
    );
});
