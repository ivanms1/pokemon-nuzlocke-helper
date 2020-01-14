"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const PokemonSchema = apollo_server_express_1.gql `
  type Pokemon {
    _id: Int!
    name: String!
    type: [String!]!
    image: String!
    sprite: String!
    baseStats: [BaseStats!]
  }

  type BaseStats {
    hp: Int!
    attack: Int!
    defense: Int!
    specialAttack: Int!
    specialDefense: Int!
    speed: Int!
  }

  extend type Query {
    getPokemons(game: Int): [Pokemon]
    getPokemon(id: Int!): Pokemon
  }
`;
exports.default = PokemonSchema;
//# sourceMappingURL=PokemonTypes.js.map