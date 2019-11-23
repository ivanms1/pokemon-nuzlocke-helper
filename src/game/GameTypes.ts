import { gql } from 'apollo-server-express';

const GameSchema = gql`
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

export default GameSchema;
