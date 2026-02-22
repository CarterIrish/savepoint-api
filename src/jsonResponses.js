const database = require('../db/games.json');

const sendResponse = (res, status, obj, method) => {
    const body = JSON.stringify(obj);
    res.writeHead(status, {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(body),
    });
    if (method !== "HEAD" && status !== 204) { res.write(body); }
    res.end();
}

const notFound = (request, response) => {
    sendResponse(response, 404, { message: "The endpoint you are looking for was not found", id:'notFound' }, request.method);
}

const getGames = (request, response, parsedUrl) => {
    const params = parsedUrl.searchParams;

    let games = database.games.map(({
        id, name, slug, url, cover, genres, platforms, rating, rating_count, first_release_date
    }) => ({
        id, name, slug, url, cover, genres, platforms, rating, rating_count, first_release_date
    }));
    sendResponse(response, 200, { games }, request.method);
}

const createGame = (request, response, parsedUrl) => {
    const params = parsedUrl.searchParams;
    sendResponse(response, 404, { message: 'Work In Progress', params: Object.fromEntries(params) }, request.method);
}

const getGame = (request, response, parsedUrl) => {
    const parts = parsedUrl.pathname.split('/');
     const idOrSlug = parts[3];
    sendResponse(response, 404, { message: 'Work In Progress', idOrSlug }, request.method);
}

const getGenres = (request, response) => {
    sendResponse(response, 404, { message: 'Work in progress' }, request.method);
}

const getPlatforms = (request, response) => {
    sendResponse(response, 404, { message: 'Work in progress' }, request.method);
}

const updateGame = (request, response, parsedUrl) => {
    const parts = parsedUrl.pathname.split('/');
     const idOrSlug = parts[3];
    sendResponse(response, 404, { message: 'Work In Progress', idOrSlug }, request.method);
}

module.exports = { notFound, getGames, createGame, getGame, getGenres, getPlatforms, updateGame };
