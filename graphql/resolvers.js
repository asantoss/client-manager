const resolvers = {
	Query: {
		async getUser(root, args, { models }) {
			return await models.User.findByPk(args.id);
		},
		async getClient(root, args, { models }) {
			return await models.Client.findByPk(args.id);
		},
		async getAllUsers(root, args, { models }) {
			return await models.User.findAll();
		}
	},
	Mutation: {
		async createUser(root, args, { models }) {
			return await models.User.create({
				...args
			});
		},
		async createClient(root, args, { models }) {
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
