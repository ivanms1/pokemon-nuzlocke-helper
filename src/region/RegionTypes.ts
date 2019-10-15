import { gql } from 'apollo-server';

const RegionSchema = gql`
  type Region {
    id: Int!
    name: String!
    locations: [String!]!
  }

  type Query {
    getRegions: [Region]
    getRegion(id:Int!): Region
  }
`

export default RegionSchema;