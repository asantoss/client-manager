const express = require('express');
const app = express();
const db = require('./models');
const mockData = require('./helpers/mockData');

const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');

const apolloServ = new ApolloServer({
	typeDefs,
	resolvers,
	context: {
		models: db
	}
});
apolloServ.applyMiddleware({
	app
});

const PORT = process.env.PORT;

app.get('/api/faker/users', (req, res) => {
	mockData.createUsers().then(console.log);
	res.status(200);
});

app.get('/api/faker/clients', (req, res) => {
	mockData.createClients().then(clients => {
		res.json(clients);
	});
});

app.listen(PORT || 5000, () => {
	console.log('Running on port ' + PORT || 5000);
});
