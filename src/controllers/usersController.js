import connection from "../database/database.js";
import { urlRepository } from "../repositories/urlRepositories.js";
import { userRepositoy } from "../repositories/userRepository.js";

import bcrypt from "bcrypt";
import {v4 as uuid} from "uuid";


const postUser = async (req,res) => {
    const user = req.body;

    try {
        const existUser = await connection.query('SELECT * FROM users WHERE email=$1', [user.email]);
        if(existUser.rowCount) return res.sendStatus(409);

        const hashPassword = bcrypt.hashSync(user.password, 10)

        await connection.query('INSERT INTO users (name,email,password) VALUES ($1,$2,$3)', 
            [user.name, user.email, hashPassword])
        
        return res.sendStatus(201)
    } catch (err) {
        console.error(err)
        return res.sendStatus(500)
    }
};

const signInUser = async (req,res) => {
    const {email, password} = req.body;

    if (!email || !password) return res.sendStatus(422)

    try {
        const { rows: users } = await connection.query('SELECT * FROM users WHERE email = $1', [email]);
        if(!users[0]) return res.sendStatus(401)

        const validate = bcrypt.compareSync(password, users[0].password)
        if (!validate) return res.sendStatus(401)

        const token = uuid();
        await connection.query(`
            INSERT INTO sessions ("userId", token)
            VALUES ($1,$2)`,
            [users[0].id, token]);
        
        return res.send(token)
    }
    catch (err) {
        console.error(err)
        return res.sendStatus(500)
    }
}

const getUserLinks = async (req,res) => {
    const { id } = req.params;

    try {
        const {rows: users} = await userRepositoy.getUser(id);
        if(!users[0]) return res.sendStatus(404)

        const {rows: urls} = await urlRepository.getUserUrls(id);
        const {rows: links} = await urlRepository.getVisitsNumber(id);

        let shortnedUrls;
        if(urls) {
            shortnedUrls = urls.map(item => ({
                id: item.id,
                shortUrl: item.shortenUrl,
                url: item.url,
                visitCount: item.visits
            }))
        } else {
            shortnedUrls = [];
        }

        const response = {
            id,
            name: users[0].name,
            visitCount: links[0]? links[0].visits : 0,
            shortnedUrls
        }

        return res.send(response)
    } catch(err) {
        console.error(err)
        return res.sendStatus(500)
    }
}

export { postUser, signInUser, getUserLinks };