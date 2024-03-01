import { Router } from "express";
import { newPost } from "../controller/post.controllers.js";
import verifyJWT from "../middlewares/auth.middlewares.js";
import multerUpload from "../middlewares/multerUpload.middlewares.js";

const postRoutes = Router();

postRoutes
  .route("/new-post")
  .post(multerUpload.single("post"), verifyJWT, newPost);

export default postRoutes;
