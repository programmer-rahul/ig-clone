import { Router } from "express";
import { addPostLike, removePostLike } from "../controller/like.controllers.js";
import verifyJWT from "../middlewares/auth.middlewares.js";

const likeRoutes = Router();

likeRoutes.use(verifyJWT);

// like
likeRoutes.route("/add-post-like/:postid").post(addPostLike);
likeRoutes.route("/remove-post-like/:postid").delete(removePostLike);

export default likeRoutes;
