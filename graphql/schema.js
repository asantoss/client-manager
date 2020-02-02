const { gql } = require("apollo-server-express");

const typeDefs = gql`
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
    user: User
    invoices: [Invoice]
  }
  type Invoice {
    id: ID!
    dueDate: String
    products: [String]
    client: Client
    total: Int
  }
  type Query {
    getUser(id: ID!): User
    getUsers: [User!]
    getMe: User
    getClient(id: ID!): Client
    login(email: String!, password: String!): User
  }
  type Mutation {
    register(
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
    createInvoice(dueDate: String, products: String): Invoice
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
