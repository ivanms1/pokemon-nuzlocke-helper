import { gql } from 'apollo-server';

const PokemonSchema = gql`
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
    getPokemons: [Pokemon]
    getPokemon(id:Int!): Pokemon
  }
`

export default PokemonSchema;