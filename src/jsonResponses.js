const store = require('./store.js');

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
    sendResponse(response, 404, { message: "The endpoint you are looking for was not found", id: 'notFound' }, request.method);
}

const getGames = (request, response, parsedUrl) => {
    const params = parsedUrl.searchParams;

    let games = store.getAll().map(({
        id, name, slug, url, cover, genres, platforms, rating, rating_count, first_release_date
    }) => ({
        id, name, slug, url, cover, genres, platforms, rating, rating_count, first_release_date
    }));
    sendResponse(response, 200, { games }, request.method);
}

const createGame = (request, response, parsedUrl) => {
    const params = Object.fromEntries(parsedUrl.searchParams);
    sendResponse(response, 404, { method: request.method, path: parsedUrl.pathname, contentType: request.headers['content-type'], message: 'Work In Progress: createGame', params }, request.method);
}

const getGame = (request, response, parsedUrl) => {
    const parts = parsedUrl.pathname.split('/');
    const idOrSlug = parts[3];
    sendResponse(response, 404, { method: request.method, path: parsedUrl.pathname, message: 'Work In Progress: getGame', idOrSlug }, request.method);
}

const getGenres = (request, response, parsedUrl) => {
    const params = Object.fromEntries(parsedUrl.searchParams);
    sendResponse(response, 404, { method: request.method, path: parsedUrl.pathname, message: 'Work In Progress: getGenres', params }, request.method);
}

const getPlatforms = (request, response, parsedUrl) => {
    const params = Object.fromEntries(parsedUrl.searchParams);
    sendResponse(response, 404, { method: request.method, path: parsedUrl.pathname, message: 'Work In Progress: getPlatforms', params }, request.method);
}

const updateGame = (request, response, parsedUrl) => {
    const parts = parsedUrl.pathname.split('/');
    const idOrSlug = parts[3];
    sendResponse(response, 404, { method: request.method, path: parsedUrl.pathname, contentType: request.headers['content-type'], message: 'Work In Progress: updateGame', idOrSlug }, request.method);
}

module.exports = { notFound, getGames, createGame, getGame, getGenres, getPlatforms, updateGame };
