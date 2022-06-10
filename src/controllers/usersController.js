import connection from "../database/database.js";
import bcrypt from "bcrypt";


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

export { postUser };