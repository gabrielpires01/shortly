import connection from "../database/database.js";

const postUrl = (url, short) => {
    return connection.query('INSERT INTO urls (url, "shortenUrl") VALUES($1,$2)',[url, short]);
}

const getOneUrl = (id) => {
    return connection.query('SELECT * FROM urls WHERE id = $1', [id])
}

export const urlRepository = {
    postUrl,
    getOneUrl
}