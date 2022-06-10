import { nanoid } from "nanoid";
import { urlRepository } from "../repositories/urlRepositories.js";

const postShortenUrl = async (req,res) => {
    const { url } = req.body;
    if(!url) return res.sendStatus(422)

    const shortned = nanoid();
    
    try {
        await urlRepository.postUrl(url,shortned);

        return res.sendStatus(201)
    } catch (err) {
        console.error(err)
        return res.sendStatus(500)
    }
}

export { postShortenUrl }