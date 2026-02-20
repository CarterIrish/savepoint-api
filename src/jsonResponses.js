const database = require('../db/games.json');

const sendResponse = (res, status, obj, method) => {
    res.writeHead(status, { "Content-Type": "application/json" });
    if (method !== "HEAD" || status === 204) { res.write(JSON.stringify(obj)); }
    res.end();
}

const NotFound = (request, response) => {
    sendResponse(response, 404, { message: "Not Found" }, request.method);
}

const GetGames = (request, response, params) =>
{
    let games;
    if(params.size === 0){
        games = database.games.map(({
            id, name, slug, cover, genres, platforms, rating, rating_count, first_release_date
        }) => ({
            id, name, slug, cover, genres, platforms, rating, rating_count, first_release_date
        }));
    }
    sendResponse(response, 200, { games }, request.method);
}

module.exports = { NotFound , GetGames };
