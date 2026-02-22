const http = require('http');
const port = process.env.PORT || process.env.NODE_PORT || 3000;
const htmlHandle = require('./htmlResponses');
const jsonHandle = require('./jsonResponses');
const { styleText } = require('node:util');
const URL_STRUCT = {
    '/': { GET: htmlHandle.GetIndex },
    '/docs': { GET: htmlHandle.GetDocs },
    '/mainStyle.css': { GET: htmlHandle.GetCss },
    '/api/notFound': { GET: jsonHandle.notFound },
    '/api/games': { GET: jsonHandle.getGames, POST: jsonHandle.createGame },
    '/api/genres': { GET: jsonHandle.getGenres },
    '/api/platforms': { GET: jsonHandle.getPlatforms },
}

const onRequest = (request, response) => {
    console.log(`${styleText('cyan', request.method)} ${request.url}`);

    const protocol = request.connection.encrypted ? 'https' : 'http';
    const parsedURL = new URL(request.url, `${protocol}://${request.headers.host}`);

    let methodMap = URL_STRUCT[parsedURL.pathname];
    // No exact match means either 404 or dynamic endpoint ':idOrSlug'
    if (!methodMap) {
        const parts = parsedURL.pathname.split('/');
        if (parts.length === 4 && parts[1] === 'api' && parts[2] === 'games' && parts[3]) {
            methodMap = { GET: jsonHandle.getGame, POST: jsonHandle.updateGame };
        }
        else {
            jsonHandle.notFound(request, response);
            return;
        }
    }

    const method = request.method === 'HEAD' ? 'GET' : request.method;
    const handler = methodMap[method] || jsonHandle.notFound;
    handler(request, response, parsedURL);
}

http.createServer(onRequest).listen(port, () => {
    console.log(`Listening on port: ${port}`);
    console.log(`preview at: "http://localhost:${port}"`);
})