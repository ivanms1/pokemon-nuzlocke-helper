import { gql } from 'apollo-server-express';

const UserSchema = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    nuzlockes: [Nuzlocke!]
  }

  type LoginToken {
    userId: ID!
    token: String
    tokenExpiration: Int
  }

  input SignUpInput {
    name: String!
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  extend type Query {
    getUser(userId: ID!): User
    getCurrentUser: User
  }

  type Mutation {
    signUp(input: SignUpInput!): LoginToken
    login(input: LoginInput!): LoginToken
    updateUser(input: SignUpInput!): User
  }
`;

export default UserSchema;
