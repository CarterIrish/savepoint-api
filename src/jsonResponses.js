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

const NotFound = (request, response) => {
    sendResponse(response, 404, { message: "Not Found" }, request.method);
}

const GetGames = (request, response, parsedUrl) =>
{
    const params = parsedUrl.searchParams;

    let games = database.games.map(({
        id, name, slug, cover, genres, platforms, rating, rating_count, first_release_date
    }) => ({
        id, name, slug, cover, genres, platforms, rating, rating_count, first_release_date
    }));

    sendResponse(response, 200, { games }, request.method);
}

const AddGames = (request, response, parsedUrl) =>
{
    const params = parsedUrl.searchParams;
    sendResponse(response, 404, {message: 'Work In Progress'}, request.method);
}

module.exports = { NotFound , GetGames , AddGames};
