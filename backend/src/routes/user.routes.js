import { Router } from "express";
import multerUpload from "../middlewares/multerUpload.middlewares.js";
import auth from "../middlewares/auth.middlewares.js";
import {
  getCurrentUser,
  signIn,
  signUp,
  updateAvatar,
  verifyOTP,
} from "../controller/user.controllers.js";

const userRoutes = Router();
userRoutes.route("/signin").post(signIn);

// signup
userRoutes.route("/signup").post(signUp);
userRoutes.route("/verify-otp").post(verifyOTP);

userRoutes
  .route("/update-avatar")
  .put(multerUpload.single("avatar"), auth, updateAvatar);

userRoutes.route("/get-current-user").get(auth, getCurrentUser);

export default userRoutes;
