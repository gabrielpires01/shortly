import { Router } from "express";
import { postUser, signInUser } from "../controllers/usersController.js";
import validateSchema from "../middleware/validateSchema.js";
import userSchema from "../schemas/userSchema.js";

const userRouter = Router();

userRouter.post('/signup', validateSchema(userSchema), postUser);
userRouter.post('/signIn', signInUser);

export default userRouter