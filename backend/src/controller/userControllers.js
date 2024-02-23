import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import User from "../models/User.js";
import Otp from "../models/Otp.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateToken.js";
import { CookieOptions } from "../constants.js";

export const signIn = async (req, res, next) => {
  const { username, password } = req.body;

  if (username?.trim() === "" || password?.trim() === "") {
    return next(new ApiError(400, "All fields required"));
  }

  const existedUser = await User.findOne({ username });

  if (!existedUser) return next(new ApiError(400, "Wrong username"));

  if (existedUser.password !== password)
    return next(new ApiError(400, "Wrong password"));

  const accessToken = generateAccessToken({
    _id: existedUser._id,
    email: existedUser.email,
    username,
  });
  const refreshToken = generateRefreshToken({
    _id: existedUser._id,
    email: existedUser.email,
    username,
  });

  const updatedUser = await User.findByIdAndUpdate(
    existedUser._id,
    {
      $set: {
        refreshToken,
      },
    },
    {
      new: true,
    }
  ).select("username refreshToken avatar");

  return res
    .status(200)
    .cookie("accessToken", accessToken, CookieOptions)
    .cookie("refreshToken", refreshToken, CookieOptions)
    .json(new ApiResponse(200, { user: updatedUser }, "User signup success"));
};

export const signUp = async (req, res, next) => {
  const { email, fullname, username, password } = req.body;
  console.log("email", req.body);

  if (
    email?.trim().length == 0 ||
    fullname?.trim().length == 0 ||
    username?.trim().length == 0 ||
    password?.trim().length == 0
  ) {
    return next(new ApiError(400, "Fields should not be empty"));
  }

  const isUsernameAvailable = await User.findOne({ username });

  console.log(isUsernameAvailable);
  if (isUsernameAvailable)
    return next(new ApiError(400, "Username is not available"));

  const otp = Math.floor(Math.random() * 999998);
  console.log("otp :- ", otp);

  const OTP = await Otp.create({ email, otp });

  if (!OTP) return next(new ApiError(400, "Error in creating OTP"));

  console.log("Otp Generating successfully");
  return res
    .status(200)
    .json(new ApiResponse(200, { OTP }, "Otp send successfully"));
};

export const verifyOTP = async (req, res, next) => {
  const { otp: userOtp, email, password, fullname, username } = req.body;
  console.log("userOtp", userOtp);

  if (userOtp.trim().length !== 6) {
    return next(new ApiError(400, "Wrong Otp"));
  }

  const getEmail = await Otp.findOne({ email });

  console.log(getEmail);
  if (!getEmail) return next(new ApiError(400, "Otp expired or wrong email"));

  if (getEmail.otp !== Number(userOtp))
    return next(new ApiError(400, "Wrong otp"));

  const accessToken = generateAccessToken({
    _id: newUser._id,
    email,
    username,
  });
  const refreshToken = generateRefreshToken({
    _id: newUser._id,
    email,
    username,
  });

  const newUser = await User.create({
    email,
    password,
    fullname,
    username,
    refreshToken,
  }).select("username avatar refreshToken");

  const removeOtp = await Otp.deleteOne({ _id: getEmail._id });

  if (!newUser) return next(new ApiError(400, "Error in creating user"));

  console.log("User signup success");

  return res
    .status(200)
    .cookie("accessToken", accessToken, CookieOptions)
    .cookie("refreshToken", refreshToken, CookieOptions)
    .json(new ApiResponse(200, { user: newUser }, "User signup success"));
};

export const updateAvatar = async (req, res, next) => {
  if (!req?.file) return next(new ApiError(400, "Error in uploading"));
  console.log(req.user);
  if (!req?.user) return next(new ApiError(400, "Unauthorized request"));

  const updatedAvatar = await User.findByIdAndUpdate(
    { _id: req.user._id },
    {
      $set: {
        avatar: req.file.filename,
      },
    },
    {
      new: true,
    }
  ).select("-password");

  if (!updateAvatar)
    return next(
      new ApiError(400, "Error in updated avatar,may wrong credentials")
    );

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { newUser: updateAvatar },
        "Avatar updated successfuly"
      )
    );
};
