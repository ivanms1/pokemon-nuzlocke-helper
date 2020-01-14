"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const GameSchema = apollo_server_express_1.gql `
  type Game {
    id: Int!
    name: String!
    generation: String!
    region: Region!
  }

  extend type Query {
    getGames: [Game]
    getGame(id: Int!): Game
  }
`;
exports.default = GameSchema;
//# sourceMappingURL=GameTypes.js.map