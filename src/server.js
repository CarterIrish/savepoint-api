const http = require('http');
const port = process.env.PORT || process.env.NODE_PORT || 3000;
const htmlHandle = require('./htmlResponses');
const jsonHandle = require('./jsonResponses');

const URL_STRUCT = {
    '/': {GET:htmlHandle.GetIndex},
    '/docs': {GET:htmlHandle.GetDocs},
    '/mainStyle.css': {GET:htmlHandle.GetCss},
    '/api/notFound': {GET:jsonHandle.NotFound},
    '/api/games': {GET:jsonHandle.GetGames, POST:jsonHandle.AddGames}
}

const onRequest = (request, response) =>
{
    console.log(request.url);

    const protocol = request.connection.encrypted ? 'https':'http';
    const parsedURL = new URL(request.url, `${protocol}://${request.headers.host}`);

    const methodMap = URL_STRUCT[parsedURL.pathname];
    if(!methodMap){jsonHandle.NotFound(request, response); return;}

    const method = request.method === 'HEAD' ? 'GET' : request.method;
    const handler = methodMap[method] || jsonHandle.NotFound;
    handler(request,response,parsedURL);
}

http.createServer(onRequest).listen(port, () => {
    console.log(`Listening on port: ${port}`);
    console.log(`preview at: "http://localhost:${port}"`);
})