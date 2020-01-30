const express = require("express");
const mockData = require("./helpers/mockData");
const cookieParser = require("cookie-parser");
const { ApolloServer } = require("apollo-server-express");
const typeDefs = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");
const db = require("./models");
const jwt = require("jsonwebtoken");
const createTokens = require("./helpers/auth");

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

  app.use(async (req, res, next) => {
    const accessToken = req.cookies["access-token"];
    const refreshToken = req.cookies["refresh-token"];
    //*** Check if we got any of the tokens */
    if (!refreshToken && !accessToken) {
      return next();
    }
    try {
      const data = jwt.verify(accessToken, process.env.TOKEN_SECRET);
      req.userId = data.userId;
      return next();
    } catch {}

    if (!refreshToken) {
      return next();
    }
    let data;
    try {
      data = jwt.verify(refreshToken, process.env.TOKEN_SECRET);
      req.userId = data.userId;
    } catch {
      return next();
    }
    const user = await db.User.findByPk(data.userId);
    // *** Token has been invalidated
    if (!user) {
      return next();
    }

    // *** If we made it here the refreshToken is valid && we will reAuthenticate for another week.
    const tokens = createTokens(user);
    res.cookie("refresh-token", tokens.refreshToken, {
      maxAge: 1000 * 60 * 15
    });
    res.cookie("access-token", tokens.accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 7
    });
    return next();
  });

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
