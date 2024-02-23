import { Router } from "express";
import multerUpload from "../middlewares/multerUpload.js";
import verifyJWT from "../middlewares/verifyJWT.js";
import {
  signIn,
  signUp,
  updateAvatar,
  verifyOTP,
} from "../controller/userControllers.js";

const userRoutes = Router();

userRoutes.route("/signin").post(signIn);

// signup
userRoutes.route("/signup").post(signUp);
userRoutes.route("/verify-otp").post(verifyOTP);

userRoutes
  .route("/update-avatar")
  .put(multerUpload.single("avatar"), verifyJWT, updateAvatar);

export default userRoutes;
