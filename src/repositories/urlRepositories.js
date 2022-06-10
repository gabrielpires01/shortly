import connection from "../database/database.js";

const postUrl = (url, short, userId ) => {
    return connection.query('INSERT INTO urls (url, "shortenUrl", "userId") VALUES($1,$2, $3)',[url, short, userId]);
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

const deleteUserUrl = (id) => {
    return connection.query('DELETE FROM urls WHERE id = $1', [id])
}

const getVisitsNumber = (id) => {
    return connection.query('SELECT SUM(visits) AS visits FROM urls WHERE "userId" = $1 GROUP BY "userId"', [id])
}

const getUserUrls = (id) => {
    return connection.query('SELECT * FROM urls WHERE "userId" = $1', [id])
}

const getRankings = () => {
    return connection.query(`
        SELECT u.id,u.name, COUNT(l.id) AS "linkCount", SUM(l.visits) AS "visitCount" FROM urls l
        JOIN users u ON l."userId" = u.id
        GROUP BY u.id
        ORDER BY "visitCount" DESC
        LIMIT 10`)
}

export const urlRepository = {
    postUrl,
    getOneUrl,
    getByShort,
    updateVisits,
    deleteUserUrl,
    getVisitsNumber,
    getUserUrls,
    getRankings
}