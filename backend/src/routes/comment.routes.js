import { Router } from "express";
import auth from "../middlewares/auth.middlewares.js";

const commentRoutes = Router();

commentRoutes.use(auth);

export default commentRoutes;
