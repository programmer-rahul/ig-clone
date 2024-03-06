import { Router } from "express";
import auth from "../middlewares/auth.middlewares.js";
import { addNewFollower } from "../controller/follow.controllers.js";

const followRoutes = Router();

followRoutes.use(auth);

followRoutes.route("/add-follower/:userid").post(addNewFollower);
followRoutes.route("/remove-follower/:userid").delete(addNewFollower);

export default followRoutes;
