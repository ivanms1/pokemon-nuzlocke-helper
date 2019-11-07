import { gql } from 'apollo-server';

const NuzlockeSchema = gql`
  enum NuzlockeType {
    NORMAL
    CAGELOCKE
    SOUL_LINK
  }

  enum StatusType {
    ALIVE
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
    location: String
    isCaptured: Boolean
    inTeam: Boolean
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
    pokemon: Int!
    location: String!
    isCaptured: Boolean!
    nickname: String
    inTeam: Boolean
    status: StatusType!
    level: Int
    moves: [Int!]
  }

  extend type Query {
    getNuzlocke(id:ID!): Nuzlocke
    getNuzlockes(userId: ID): Nuzlocke
  }
  
  extend type Mutation {
    createNuzlocke(input: NuzlockeInput!): Nuzlocke
    addPokemon(id: ID! pokemon: NuzlockePokemonInput!): Nuzlocke
  }
`

export default NuzlockeSchema;