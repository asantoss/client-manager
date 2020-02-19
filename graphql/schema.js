const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    id: ID!
    firstName: String
    lastName: String
    email: String
    password: String
    clients: [Client]
    companyName: String
    address: String
    phoneNumber: String
    city: String
    zipCode: String
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
    dateDue: String
    products: [Product]
    client: Client
    total: Int
    isPaid: Boolean
  }
  type Product {
    productName: String
    description: String
    quantity: String
    price: Int
  }
  input ProductsInput {
    productName: String
    description: String
    quantity: Int
    price: Int
  }
  type Query {
    getUser(id: ID!): User
    getUsers: [User!]
    getMe: User
    getClient(id: ID!): Client
    login(email: String!, password: String!): User
  }
  type Mutation {
    createInvoice(
      ClientId: Int
      products: [ProductsInput]
      isPaid: Boolean
      total: Int
      dateDue: String
    ): Invoice
    register(
      firstName: String
      lastName: String
      email: String
      password: String
      phoneNumber: String
      address: String
      city: String
      companyName: String
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
