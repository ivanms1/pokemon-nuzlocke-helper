"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const NuzlockeSchema = apollo_server_express_1.gql `
  enum NuzlockeType {
    NORMAL
    CAGELOCKE
    SOUL_LINK
  }

  enum StatusType {
    IN_TEAM
    IN_PC
    DEAD
    SEEN
  }

  type Nuzlocke {
    _id: ID!
    type: NuzlockeType!
    name: String
    game: Game!
    pokemons: [NuzlockePokemon!]
    user: User
    score: Int
    deaths: Int
  }

  type NuzlockePokemon {
    _id: ID!
    pokemon: Pokemon
    partner: Pokemon
    location: String
    nickname: String
    status: String
    level: Int
  }

  input NuzlockeInput {
    game: Int!
    name: String
    type: NuzlockeType!
    user: ID
  }

  input NuzlockePokemonInput {
    id: ID
    pokemon: Int
    partner: Int
    location: String
    nickname: String
    status: StatusType
    level: Int
    moves: [Int!]
  }

  extend type Query {
    getNuzlocke(id: ID!): Nuzlocke
    getNuzlockes(userId: ID): Nuzlocke
  }

  extend type Mutation {
    createNuzlocke(input: NuzlockeInput!): Nuzlocke
    addPokemon(id: ID!, pokemon: NuzlockePokemonInput!): Nuzlocke
    updatePokemon(id: ID!, pokemon: NuzlockePokemonInput!): Nuzlocke
  }
`;
exports.default = NuzlockeSchema;
//# sourceMappingURL=NucklockeTypes.js.map