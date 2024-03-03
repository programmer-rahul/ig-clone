import { Router } from "express";
import { newPost, allPost } from "../controller/post.controllers.js";
import verifyJWT from "../middlewares/auth.middlewares.js";
import multerUpload from "../middlewares/multerUpload.middlewares.js";

const postRoutes = Router();

postRoutes.use(verifyJWT);

// post
postRoutes.route("/new-post").post(multerUpload.single("post"), newPost);
postRoutes.route("/all-posts").get(allPost);

export default postRoutes;
