import { Router } from "express";
import {signIn} from '../controller/userControllers.js'

const userRoutes = Router();

userRoutes.route("/signin").post(signIn);

export default userRoutes;
