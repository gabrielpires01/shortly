import { Router } from "express";
import urlRouter from "./urlRoute.js";
import userRouter from "./userRoute.js";

const router =  Router();

router.use(userRouter);
router.use(urlRouter);

export default router