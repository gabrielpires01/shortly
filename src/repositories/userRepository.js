import connection from "../database/database.js";

const getUser = (id) => {
    return connection.query('SELECT * FROM users WHERE id = $1',[id])
}

const getSession = (token) => {
    return connection.query('SELECT * FROM sessions WHERE token = $1',[token])
}

export const userRepositoy = {
    getUser,
    getSession
}