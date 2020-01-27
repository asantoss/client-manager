const resolvers = {
    Query: {
        async getUsers(root, args, {
            models
        }) {
            return await models.Users.findByPk(args.id);
        },
        async getClient(root, args, {
            models
        }) {
            return await models.Clients.findByPk(args.id)
        }
    },
    Mutation: {
        async createUser(root, args, {
            models
        }) {
            return await models.Users.create({
                ...args
            })
        },
        async createClient(root, args, {
            models
        }) {
            return await models.Clients.create({
                ...args
            })
        }
    }
};