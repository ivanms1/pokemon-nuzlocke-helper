"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const UserSchema = apollo_server_1.gql `
  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
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

  type Mutation {
    signUp(input: SignUpInput!): User
    login(input: LoginInput!): User
    updateUser(input: SignUpInput!) User
  }
`;
exports.default = UserSchema;
//# sourceMappingURL=UserTypes.js.map