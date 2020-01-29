const models = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;
const resolvers = {
  Query: {
    getMe: async (_, args, { req }) => {
      return await models.User.findByPk(args.id);
    },
    getClient: async (_, args, { req }) => {
      return await models.Client.findByPk(args.id);
    },
    getUsers: async (_, args, { req }) => {
      return await models.User.findAll();
    },
    login: async (_, { email, password }, { res, req }) => {
      const user = await models.User.findOne({
        where: {
          email
        }
      });
      if (!user) return null;

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) return null;
      console.log(req.cookies);
      // *** Create the session JWT
      const accessToken = jwt.sign(
        {
          userId: user.id
        },
        process.env.TOKEN_SECRET,
        {
          expiresIn: "15m"
        }
      );
      const refreshToken = jwt.sign(
        {
          userId: user.id
        },
        process.env.TOKEN_SECRET,
        {
          expiresIn: "7d"
        }
      );

      res.cookie("access-token", accessToken, {
        maxAge: 1000 * 60 * 15
      });
      res.cookie("refresh-token", refreshToken, {
        maxAge: 1000 * 60 * 60 * 24 * 7
      });
      return user;
    }
  },
  Mutation: {
    createUser: async (
      _,
      { firstName, lastName, email, password },
      { req }
    ) => {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      email = email.toLowerCase();
      return await models.User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword
      });
    },
    createClient: async (_, args, { req }) => {
      return await models.Client.create({
        ...args
      });
    }
  },
  User: {
    clients: async User => {
      return await User.getClients();
    }
  }
};

module.exports = resolvers;
