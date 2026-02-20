const fs = require('fs');
const index = fs.readFileSync(`${__dirname}/../client/index.html`);
const docs = fs.readFileSync(`${__dirname}/../client/docs.html`);
const mainStyle = fs.readFileSync(`${__dirname}/../client/mainStyle.css`);

const sendResponse = (res, status, obj, contentType = 'text/plain', method) => {
    res.writeHead(status, { "Content-Type": `${contentType}` });
    if (method !== "HEAD") { res.write(obj); }
    res.end();
}

const GetIndex = (request, response) => {
    sendResponse(response, 200, index, 'text/html', request.method);
}

const GetCss = (request, response) => {
    sendResponse(response, 200, mainStyle, 'text/css', request.method);
}

const GetDocs = (request, response) => {
    sendResponse(response, 200, docs, 'text/html', request.method);
}

module.exports = { GetIndex, GetCss, GetDocs };