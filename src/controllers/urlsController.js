import { nanoid } from "nanoid";
import { urlRepository } from "../repositories/urlRepositories.js";

const postShortenUrl = async (req,res) => {
    const { url } = req.body;
    const { user } = res.locals
    if(!url) return res.sendStatus(422)

    const shortned = nanoid();
    
    try {
        await urlRepository.postUrl(url,shortned, user.id);

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

const getByShortUrl = async (req,res) => {
    const { shortUrl } = req.params;

    try {
        const {rows: urls} = await urlRepository.getByShort(shortUrl);
        if(!urls[0]) return res.sendStatus(404);

        await urlRepository.updateVisits(urls[0].id, urls[0].visits);

        return res.redirect(urls[0].url);
    } catch(err) {
        console.error(err);
        return res.sendStatus(500);
    }
};

const deleteUserUrl = async (req,res) => {
    const { id } = req.params;
    const { user } = res.locals;

    try {
        const { rows:urls } = await urlRepository.getOneUrl(id);
        if(!urls[0]) return res.sendStatus(404);
        if(urls[0].userId != user.id) return res.sendStatus(401);

        await urlRepository.deleteUserUrl(id);
        return res.sendStatus(204);
    } catch(err) {
        console.error(err)
        return res.sendStatus(500);
    }
};

const getRankings = async (req,res) => {
    try {
        const {rows: ranking} = await urlRepository.getRankings();
        return res.send(ranking)
    } catch(err) {
        console.error(err)
        return res.sendStatus(500)
    }
};

export { postShortenUrl, getOneUrl, getByShortUrl, deleteUserUrl, getRankings }