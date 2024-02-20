import ApiError from "../utils/ApiError.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const verifyJWT = async (req, res, next) => {
  try {
    const token =
      req?.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer", "");

    // console.log(token);
    if (!token) new ApiError(401, "Unauthorized request");

    const isValid = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);

    if (!isValid) new ApiError(401, "Expired or wrong token");

    const user = await User.findById(isValid._id).select(
      "-password -refreshToken"
    );

    if (!user) new ApiError(401, "Error in getting fetching user");

    req.user = user;
    // console.log("user", req.user);
    next();
  } catch (error) {
    return next(new ApiError(500, "Error while verifing jwt tokens"));
  }
};

export default verifyJWT;
