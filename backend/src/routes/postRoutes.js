import { Router } from "express";
import { newPost } from "../controller/postController.js";
import verifyJWT from "../middlewares/verifyJWT.js";
import multerUpload from "../middlewares/multerUpload.js";

const postRoutes = Router();

postRoutes
  .route("/new-post")
  .post(multerUpload.single("post"), verifyJWT, newPost);

export default postRoutes;
