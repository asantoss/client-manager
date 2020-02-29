const models = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createTokens = require("../helpers/auth");
const saltRounds = 10;
const resolvers = {
  Query: {
    getUser: async (_, args, { req }) => {
      return await models.User.findByPk(args.id);
    },
    getMe: async (_, args, { req }) => {
      if (!req.userId) {
        return null;
      }
      return await models.User.findByPk(req.userId);
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
      // *** Create the session JWT
      const { refreshToken, accessToken } = createTokens(user);
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
    register: async (_, args, { req }) => {
      const hashedPassword = await bcrypt.hash(args.password, saltRounds);
      args.email = args.email.toLowerCase();
      return await models.User.create({
        ...args,
        password: hashedPassword
      });
    },
    createClient: async (_, args, { req }) => {
      return await models.Client.create({
        ...args
      });
    },
    createInvoice: async (_, args, { req }) => {
      return await models.Invoices.create({
        ...args
      });
    },
    updateInvoice: async (_, args, { req }) => {
      const { id } = args;
      const invoice = await models.Invoices.findByPk(id);
      if (invoice) {
        return await invoice.update({
          ...args
        });
      } else {
        return "Invoice not found.";
      }
    },
    removeInvoice: async (_, { id }, { req }) => {
      const model = await models.Invoices.findOne({ where: { id } });
      if (model) {
        model.destroy();
        return "Sucess";
      }
    }
  },
  User: {
    clients: async User => {
      return await User.getClients();
    }
  },
  Client: {
    user: async Client => {
      return await Client.getUser();
    },
    invoices: async Client => {
      return await Client.getInvoices();
    }
  },
  Invoice: {
    client: async Invoice => {
      return await Invoice.getClient();
    },
    user: async Invoice => {
      const invoiceClient = await Invoice.getClient();
      return await invoiceClient.getUser();
    }
  }
};

module.exports = resolvers;
