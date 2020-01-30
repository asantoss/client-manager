import gql from "graphql-tag";

export const LOGIN = gql`
  query login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      firstName
      lastName
    }
  }
`;
export const GET_CLIENTS = gql`
  query getMe {
    getMe {
      id
      firstName
      lastName
      clients {
        id
        firstName
        lastName
        email
        phoneNumber
        address
        city
        zipCode
      }
    }
  }
`;

export const REGISTER = gql`
  mutation register(
    $firstName: String!
    $lastName: String!
    $email: String!
    $password: String!
  ) {
    register(
      firstName: $firstName
      lastName: $lastName
      email: $email
      password: $password
    ) {
      firstName
      lastName
      id
    }
  }
`;
