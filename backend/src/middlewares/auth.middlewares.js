import ApiError from "../utils/ApiError.js";
import User from "../models/user.models.js";
import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const token =
      req?.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer", "");

    // console.log(token);
    if (!token) return next(new ApiError(401, "No token found"));

    const isValid = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);

    if (!isValid) return next(new ApiError(401, "Expired or wrong token"));

    const user = await User.findById(isValid._id).select(
      "-password -refreshToken"
    );

    if (!user) return next(new ApiError(401, "Error in fetching user"));

    req.user = user;
    next();
  } catch (error) {
    console.log(error.message);
    return next(new ApiError(500, error.message));
  }
};

export default auth;
