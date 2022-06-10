import { Router } from "express";
import { getByShortUrl, getOneUrl, postShortenUrl } from "../controllers/urlsController.js";
import validateSchema from "../middleware/validateSchema.js";
import validateToken from "../middleware/validateToken.js";
import urlSchema from "../schemas/urlSchema.js";

const urlRouter = Router();

urlRouter.post('/urls/shorten', validateToken, validateSchema(urlSchema), postShortenUrl);
urlRouter.get('/urls/:id', getOneUrl)
urlRouter.get('/urls/open/:shortUrl', getByShortUrl)

export default urlRouter;