const express = require("express");
const mockData = require("./helpers/mockData");
const cookieParser = require("cookie-parser");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");
const sequelize = require("sequelize");

const PORT = process.env.PORT;

async function startServer() {
  // *** Apollo middleware setup
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res }) => ({
      req,
      res
    })
  });

  const app = express();
  app.use(cookieParser());
  server.applyMiddleware({
    app
  });
  // *** Routes
  app.get("/api/faker/users", (req, res) => {
    mockData.createUsers().then(users => {
      res.json(users);
    });
  });

  app.get("/api/faker/clients", (req, res) => {
    mockData.createClients().then(clients => {
      res.json(clients);
    });
  });

  app.listen(PORT || 5000, () => {
    console.log("Running on port " + PORT || 5000);
  });
}
startServer();
