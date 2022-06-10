import { Router } from "express";
import { postUser } from "../controllers/usersController.js";
import validateSchema from "../middleware/validateSchema.js";
import userSchema from "../schemas/userSchema.js";

const userRouter = Router();

userRouter.post('/signup', validateSchema(userSchema), postUser);

export default userRouter