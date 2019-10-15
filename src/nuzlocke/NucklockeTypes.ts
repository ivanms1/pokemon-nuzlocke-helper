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
    RELEASED
    IN_PC
  }

  type Nuzlocke {
    _id: ID!
    type: NuzlockeType!
    name: String
    game: Game!
    encounters: [Encounter!]
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
    getNuzlocke(id:ID!): Nuzlocke
    getNuzlockes(userId: ID): Nuzlocke
  }

  input NuzlockeInput {
    game: Int!
    name: String
    type: NuzlockeType!
    user: ID
  }

  input EncounterInput {
    location: String!
    pokemon: Int!
    isCaptured: Boolean!
  }

  input TeamInput {
    pokemon: Int!
    nickname: String
    status: StatusType!
    level: Int
    moves: [Int!]

  }
  
  extend type Mutation {
    createNuzlocke(input: NuzlockeInput!): Nuzlocke
    updateEncounters(id: ID! input: [EncounterInput!]!): Nuzlocke
    updateTeam(id: ID! input: [TeamInput]!): Nuzlocke
  }
`

export default NuzlockeSchema;