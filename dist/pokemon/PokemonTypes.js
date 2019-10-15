"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_1 = require("apollo-server");
const PokemonSchema = apollo_server_1.gql `
  type Pokemon {
    id: Int!
    name: String!
    type: [String!]!
    image: String!
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
    getPokemons: [Pokemon]
    getPokemon(id:Int!): Pokemon
  }
`;
exports.default = PokemonSchema;
//# sourceMappingURL=PokemonTypes.js.map