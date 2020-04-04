# Getting started

To get the this server running locally:

- Clone this repo
- `npm install` to install all required dependencies
- Set all your ENV variables for your database
  ```
  PG_USER=####
  PG_PASS=####
  PORT=####
  ```
- `npx sequelize-cli db:migrate` to run all the required migrations
- `npm run dev` to start the local server

## Client Repo

- Client repo built using React.

  [Github](https://github.com/asantoss/client-manager-client)

# Code Overview

## Dependencies

- [expressjs](https://github.com/expressjs/express) - The server for handling and routing HTTP requests
- [express-jwt](https://github.com/auth0/express-jwt) - Middleware for validating JWTs for authentication
- [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) - For generating JWTs used by authentication
- [sequelize](https://github.com/sequelize/sequelize/) - For modeling and mapping postgreSQL data to javascript
- [apollo-server-express](https://github.com/apollographql/apollo-server/tree/master/packages/apollo-server-express) - For connecting Express and Connect integration of GraphQL

## Application Structure

- `server.js` - The entry point to our application. This file defines our express server and connects it to PostgreSQL using sequelize. It also defines the routes and middleware being used by our server.
- `config/` - This folder contains configuration for sequelize config to connect to our database.
- `graphql/` - This folder contains the schema definition and the resolvers for our GraphQL server.
- `models/` - This folder contains the schema definitions for our sequelize models.

## Authentication

Requests are authenticated using the `Cookies` included in the request. We define two express middlewares in `server.js` that can be used to authenticate requests. The `required` middleware configures the `express-jwt` middleware using our application's secret and will return a 401 status code if the request cannot be authenticated. The payload of the JWT can then be accessed from `req.cookies` in the endpoint.
