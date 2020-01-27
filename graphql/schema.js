const {
	gql
} = require('apollo-server-express');

const typeDefs = gql `
	type User {
		id: ID!
		firstName: String
		lastName: String
		email: String
		password: String
		clients: [Client]
	}
	type Client {
		id: ID!
		firstName: String
		lastName: String
		email: String
		phoneNumber: String
		address: String
		city: String
		zipCode: String
	}
	type Query {
		getUser(id: ID!): User
		getClient(id: ID!): Client
	}
	type Mutation {
		createUser(
			firstName: String
			lastName: String
			email: String
			password: String
		): User
		createClient(
			firstName: String
			lastName: String
			email: String
			phoneNumber: String
			address: String
			city: String
			zipCode: String
		): Client
		updateUser(
			id: Int!
			firstName: String
			lastName: String
			email: String
			password: String
		): User
		updateClient(
			id: Int!
			firstName: String
			lastName: String
			email: String
			phoneNumber: String
			address: String
			city: String
			zipCode: String
		): Client
	}
`;

module.exports = typeDefs;