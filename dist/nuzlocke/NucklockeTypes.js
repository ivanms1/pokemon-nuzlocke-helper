"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const NuzlockeSchema = apollo_server_1.gql `
  enum NuzlockeType {
    NORMAL
    CAGELOCKE
    SOUL_LINK
  }

  enum StatusType {
    ALIVE
    DEAD
    RELEASED
    IN_PC
  }

  type Nuzlocke {
    _id: ID!
    type: NuzlockeType!
    game: Game!
    encounters: [Encounter]
    team: [TeamPokemon]
    score: Int
    deaths: Int
  }

  type Encounter {
    location: String
    pokemon: Pokemon
    isCaptured: Boolean
  }

  type TeamPokemon {
    pokemon: Pokemon
    nickname: String
    status: String
  }

  extend type Query {
    getNuzlocke(id:ID!) Nuzlocke
    getUserNuzlockes(userId: ID) Nuzlocke
  }

  input NuzlockeInput {
    game: Int!
    name: String
    type: NuzlockeType!
    user: ID
  }

  input EncounterInput {
    location: String!
    Pokemon: Int!
    isCaptured: Boolean!
  }

  input TeamInput {
    pokemon: Int!
    nickname: String
    status: StatusType!
    level: Int
    moves: [Int!]

  }

  type Mutation {
    createNuzlocke(input: NuzlockeInput!): Nuzlocke
    updateEncounters(id: ID! input: [EncounterInput]!): Nuzlocke
    updateTeam(id: ID! input: [TeamInput]!): Nuzlocke
  }
`;
exports.default = NuzlockeSchema;
//# sourceMappingURL=NucklockeTypes.js.map