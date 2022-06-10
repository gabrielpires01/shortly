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
};

const getOneUrl = async (req,res) => {
    const { id } = req.params;

    try {
        const {rows: urls} = await urlRepository.getOneUrl(id)
        if(!urls[0]) return res.sendStatus(404)

        const response = {
            id: urls[0].id,
            shortUrl: urls[0].shortenUrl,
            url: urls[0].url
        };

        return res.send(response)
    } catch (err) {
        console.error(err)
        return res.sendStatus(500)
    }
};

export { postShortenUrl, getOneUrl }