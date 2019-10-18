import { gql } from 'apollo-server';

const UserSchema = gql`
  type User {
    id: ID!
    name: String!
    email: String!
    nuzlockes: [Nuzlocke!]
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
    getUser(userId: ID): User
  }

  type Mutation {
    signUp(input: SignUpInput!): User
    login(input: LoginInput!): User
    updateUser(input: SignUpInput!): User
  }
`

export default UserSchema;