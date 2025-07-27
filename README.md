# movie-genres-api: Node.js + Express + Jest + Supertest

Little RESTful backend to handle movie genres, using JSON file as data and automatic tests.

# Project Structure

.
├── app.js
├── server.js
├── routes/
│   └── genre.js
├── models/
│   └── genre.js
├── validations/
│   └── genre.js
├── data/
│   └── genres.json
├── tests/
│   ├── genre.model.test.js
│   └── genre.routes.test.js
├── jest.config.js
├── package.json
└── README.md

# Features
- Genres CRUD (GET, POST, PUT, DELETE)
- Persistence in file genres.json
- Entry validations using Joi
- Unit tests using Jest
- Endpoint tests using Supertest

## Run server
npm start

## Run tests
npm test

# Available Endpoints
Method      Route               Description
GET         /api/genres         Obtain all genres
GET         /api/genres/:id     Obtain a genre by id
POST        /api/genres         Create a new genre
PUT         /api/genres/:id     Modify a genre by id
DELETE      /api/genres/:id     Delete a genre by id

# Notes
- Data is stored in data/genres.json
- For tests, it is used a different temp file genres.test.json