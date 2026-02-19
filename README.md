# SavePoint

A Node.js REST API for cataloguing and exploring your personal game library.
Built for **IGME 430 – Rich Media Web App Development II** at RIT.

---

## About

SavePoint is a web API that allows users to access, search, filter, and manage a dataset of video games. It is built from scratch using only Node's built-in `http` and `fs` modules — no web server frameworks. The server also hosts a client-facing webpage for interacting with the data and a documentation page for developers.

---

## Project Structure

```
SavePoint/
├── client/             # Static files served to the browser
│   ├── index.html      # Main client-facing page
│   └── mainStyle.css   # Stylesheet
├── src/                # Server-side code
│   ├── server.js       # Entry point, routing
│   ├── htmlResponses.js# Handlers for static HTML/CSS responses
│   └── jsonResponses.js# Handlers for JSON API responses
├── eslint.config.js    # ESLint configuration
├── package.json
└── README.md
```

---

## API Endpoints

> Full endpoint documentation is available on the `/docs` page of the live application.

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET/HEAD | `/` | Serves the main client page |
| GET/HEAD | `/mainStyle.css` | Serves the stylesheet |
| GET/HEAD | `/notFound` | Returns a 404 JSON response |

_More endpoints will be added as the project develops._

---

## Requirements Met

- [x] Data loaded from `.json` file at server startup
- [x] Static files served by the Node server
- [x] 404 response for invalid URLs
- [x] `Content-Type` header set on all responses
- [x] HEAD request support
- [ ] 4+ GET endpoints with query parameter support _(in progress)_
- [ ] 2+ POST endpoints (JSON and x-www-form-urlencoded) _(in progress)_
- [ ] Status codes: 200, 201, 204, 400, 404 _(in progress)_
- [ ] `Content-Length` header on all responses _(in progress)_
- [ ] Client page using `fetch()` with Accept headers _(in progress)_
- [ ] API documentation page _(in progress)_
- [ ] GitHub Actions CI _(in progress)_
- [ ] Deployed to Heroku _(in progress)_

---

## Author

**Carter Irish**
IGME 430 – RIT, Spring 2025
