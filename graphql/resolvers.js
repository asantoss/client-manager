const models = require('../models');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const resolvers = {
	Query: {
		async getMe(_, args, { req }) {
			return await models.User.findByPk(args.id);
		},
		async getClient(_, args, { req }) {
			return await models.Client.findByPk(args.id);
		},
		async getUsers(_, args, { req }) {
			return await models.User.findAll();
		},
		async login(_, { email, password }, { req }) {
			const user = await models.User.findOne({ where: { email } });
			if (!user) return null;

			const valid = await bcrypt.compare(password, user.password);
			if (!valid) return null;
			console.log(req);

			return user;
		}
	},
	Mutation: {
		async createUser(_, { firstName, lastName, email, password }, { req }) {
			const hashedPassword = await bcrypt.hash(password, saltRounds);
			return await models.User.create({
				firstName,
				lastName,
				email,
				password: hashedPassword
			});
		},
		async createClient(_, args, { req }) {
			return await models.Client.create({
				...args
			});
		}
	},
	User: {
		async clients(User) {
			return await User.getClients();
		}
	}
};

module.exports = resolvers;
