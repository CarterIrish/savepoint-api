const sendResponse = (res, status, obj, method) => {
    res.writeHead(status, { "Content-Type": "application/json" });
    if (method !== "HEAD") { res.write(JSON.stringify(obj)); }
    res.end();
}

const NotFound = (request, response) => {
    sendResponse(response, 404, { message: "Not Found" }, request.method);
}

module.exports = { NotFound };
