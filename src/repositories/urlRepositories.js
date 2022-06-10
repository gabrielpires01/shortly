import connection from "../database/database.js";

const postUrl = (url, short) => {
    return connection.query('INSERT INTO urls (url, "shortenUrl") VALUES($1,$2)',[url, short]);
}

const getOneUrl = (id) => {
    return connection.query('SELECT * FROM urls WHERE id = $1', [id])
}

const getByShort = (short) => {
    return connection.query('SELECT * FROM urls WHERE "shortenUrl" = $1', [short])
}

const updateVisits = (id, visits) => {
    return connection.query('UPDATE urls SET visits = $1 WHERE id = $2', [visits + 1, id])
}

export const urlRepository = {
    postUrl,
    getOneUrl,
    getByShort,
    updateVisits
}