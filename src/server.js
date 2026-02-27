const http = require('http');
const port = process.env.PORT || process.env.NODE_PORT || 3000;
const host = process.env.NODE_ENV === 'production' ? '0.0.0.0' : '127.0.0.1'
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
     
    const method = request.method === 'HEAD' ? 'GET' : request.method;
    const protocol = request.connection.encrypted ? 'https' : 'http';
    const parsedURL = new URL(request.url, `${protocol}://${request.headers.host}`);

    request.query = Object.fromEntries(parsedURL.searchParams);
    request.path = parsedURL.pathname;


    // TODO: Remove these 2 lines when project complete
    const consoleColor = (method === 'GET' || method === 'HEAD') ? 'green' : 'yellow';
    console.log(`[${styleText('red',new Date().toLocaleTimeString())}]   ${styleText(consoleColor, method)} ${request.url}`);

    let methodMap = URL_STRUCT[parsedURL.pathname];
    // No exact match means either 404 or dynamic endpoint ':idOrSlug'
    if (!methodMap) {
        // This regex is AI generated MUST BE TAGGED IN THE DOCS!!!!!!!!
        const regexMatch = /^\/api\/games\/(?<idOrSlug>[^/]+)$/.exec(parsedURL.pathname);
        if(regexMatch)
        {
            response.params = {idOrSlug:regexMatch.groups.idOrSlug};
            methodMap = {GET: jsonHandle.getGame, POST: jsonHandle.updateGame};
        }
        else{
            jsonHandle.notFound(request, response);
            return;
        }
    }
    const handler = methodMap[method] || jsonHandle.notFound;
    handler(request, response, parsedURL);
}

http.createServer(onRequest).listen(port, host, () => {
    console.log(`Listening on port: ${port}`);
    console.log(`preview at: "http://${host}:${port}"`);
})