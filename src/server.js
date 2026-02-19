const http = require('http');
const port = process.env.PORT || process.env.NODE_PORT || 3000;
const htmlHandle = require('./htmlResponses');
const jsonHandle = require('./jsonResponses');


const URL_STRUCT = {
    '/': htmlHandle.GetIndex,
    '/mainStyle.css': htmlHandle.GetCss,
    '/api/notFound': jsonHandle.NotFound
}

const onRequest = (request, response) =>
{
    console.log(request.url);
    const protocol = request.connection.encrypted ? 'https':'http';
    const parsedURL = new URL(request.url, `${protocol}://${request.headers.host}`);
    const handler = URL_STRUCT[parsedURL.pathname] || jsonHandle.NotFound;
    handler(request, response);
}

http.createServer(onRequest).listen(port, () => {
    console.log(`Listening on port: ${port}`);
    console.log(`preview at: "http://localhost:${port}"`);
})