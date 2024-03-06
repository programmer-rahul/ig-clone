import { Router } from "express";
import multerUpload from "../middlewares/multerUpload.middlewares.js";
import auth from "../middlewares/auth.middlewares.js";
import {
  getCurrentUser,
  signIn,
  signUp,
  updateAvatar,
  verifyOTP,
  findUserUsingUsername,
} from "../controller/user.controllers.js";

const userRoutes = Router();
userRoutes.route("/signin").post(signIn);

// signup
userRoutes.route("/signup").post(signUp);
userRoutes.route("/verify-otp").post(verifyOTP);

userRoutes.use(auth);
userRoutes
  .route("/update-avatar")
  .put(multerUpload.single("avatar"), updateAvatar);

userRoutes.route("/get-current-user").get(getCurrentUser);
userRoutes.route("/find-user/:username").get(findUserUsingUsername);

export default userRoutes;
