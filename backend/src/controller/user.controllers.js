import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import UserModel from "../models/user.models.js";
import OtpModel from "../models/otp.models.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateToken.js";
import { AccessCookieOptions, RefreshCookieOptions } from "../constants.js";
import { generateOtp } from "../utils/functions.js";
import { getLocalFilePath, getStaticFilePath } from "../utils/helper.js";

export const signIn = async (req, res, next) => {
  const { username, password } = req.body;

  if (username?.trim() === "" || password?.trim() === "") {
    return next(new ApiError(400, "All fields required"));
  }

  const existedUser = await UserModel.findOne({ username });

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

  const updatedUser = await UserModel.findByIdAndUpdate(
    existedUser._id,
    {
      $set: {
        refreshToken,
      },
    },
    {
      new: true,
    }
  ).select("username fullname email avatar");

  return res
    .status(200)
    .cookie("accessToken", accessToken, AccessCookieOptions)
    .cookie("refreshToken", refreshToken, RefreshCookieOptions)
    .json(
      new ApiResponse(
        200,
        { user: updatedUser, accessToken },
        "User signup success"
      )
    );
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

  const isUsernameAvailable = await UserModel.findOne({ username });

  console.log(isUsernameAvailable);
  if (isUsernameAvailable)
    return next(new ApiError(400, "Username is not available"));

  const otp = generateOtp();
  console.log("otp :- ", otp);

  const OTP = await OtpModel.create({ email, otp });

  if (!OTP) return next(new ApiError(400, "Error in creating OTP"));

  console.log("Otp Generating successfully");
  return res
    .status(200)
    .json(new ApiResponse(200, { user: {} }, "Otp send successfully"));
};

export const verifyOTP = async (req, res, next) => {
  const { otp: userOtp, email, password, fullname, username } = req.body;

  if (userOtp.trim().length !== 6) {
    return next(new ApiError(400, "Wrong Otp"));
  }

  const getEmail = await OtpModel.findOne({ email });

  console.log(getEmail);
  if (!getEmail) return next(new ApiError(400, "Otp expired or wrong email"));

  if (getEmail.otp !== Number(userOtp))
    return next(new ApiError(400, "Wrong otp"));

  const newUser = await UserModel.create({
    email,
    password,
    fullname,
    username,
    refreshToken: "",
  });
  if (!newUser) return next(new ApiError(400, "Error in creating user"));

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

  const user = await UserModel.findByIdAndUpdate(newUser._id, {
    $set: {
      refreshToken,
    },
  }).select("username fullname email avatar");

  await OtpModel.deleteOne({ _id: getEmail._id });
  console.log("User signup success");
  return res
    .status(200)
    .cookie("accessToken", accessToken, AccessCookieOptions)
    .cookie("refreshToken", refreshToken, RefreshCookieOptions)
    .json(new ApiResponse(200, { user, accessToken }, "User signup success"));
};

export const updateAvatar = async (req, res, next) => {
  if (!req?.file) return next(new ApiError(400, "Error in uploading"));
  console.log(req.user);
  if (!req?.user) return next(new ApiError(400, "Unauthorized request"));

  console.log(req.file);
  const url = getStaticFilePath(req, req.file.filename);
  const localPath = getLocalFilePath(req.file.filename);

  const updatedAvatar = await UserModel.findByIdAndUpdate(
    { _id: req.user._id },
    {
      $set: {
        avatar: {
          url,
          localPath,
        },
      },
    },
    {
      new: true,
    }
  ).select("username fullname email avatar");

  if (!updatedAvatar)
    return next(
      new ApiError(400, "Error in updated avatar,may wrong credentials")
    );

  console.log(updatedAvatar);
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { user: updatedAvatar },
        "Avatar updated successfuly"
      )
    );
};

export const getCurrentUser = async (req, res, next) => {
  if (!req?.user) return next(new ApiError(400, "Unauthorized request"));

  const user = await UserModel.findById(req.user._id).select(
    "username avatar refreshToken"
  );
  // console.log(user);

  if (!user) new ApiError(400, "Error in getting user from db");

  return res
    .status(200)
    .json(new ApiResponse(200, { user }, "User fetched successfuly"));
};

export const refreshAccessToken = async (req, res, next) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;
  console.log(incomingRefreshToken);
};

export const findUserUsingUsername = async (req, res, next) => {
  const { username } = req.params;
  console.log(username);

  const foundUser = await UserModel.find({ username }).select(
    "username avatar fullname"
  );

  // console.log(foundUser);
  if (foundUser?.length === 0) return next(new ApiError(400, "No user found"));

  return res
    .status(200)
    .json(
      new ApiResponse(200, { user: foundUser }, "User found using username")
    );
};
