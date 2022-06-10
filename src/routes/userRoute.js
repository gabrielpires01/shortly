import { Router } from "express";
import { getRankings } from "../controllers/urlsController.js";
import { getUserLinks, postUser, signInUser } from "../controllers/usersController.js";
import validateSchema from "../middleware/validateSchema.js";
import validateToken from "../middleware/validateToken.js";
import userSchema from "../schemas/userSchema.js";

const userRouter = Router();

userRouter.post('/signup', validateSchema(userSchema), postUser);
userRouter.post('/signIn', signInUser);
userRouter.get('/users/:id', validateToken, getUserLinks)
userRouter.get('/ranking', getRankings)


export default userRouter