const sendResponse = (res, status, obj, method) => {
    res.writeHead(status, { "Content-Type": "application/json" });
    if (method !== "HEAD") { res.write(JSON.stringify(obj)); }
    res.end();
}

const NotFound = (request, response) => {
    sendResponse(response, 404, { message: "Not Found" }, request.method);
}

const GetGames = (request, response, params) =>
{
    sendResponse(response, 200, {message: "Here are the games"}, request.method);
}

module.exports = { NotFound , GetGames };
