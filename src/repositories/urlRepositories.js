import connection from "../database/database.js";

const postUrl = (url, short) => {
    return connection.query('INSERT INTO urls (url, "shortenUrl") VALUES($1,$2)',[url, short]);
}

export const urlRepository = {
    postUrl
}