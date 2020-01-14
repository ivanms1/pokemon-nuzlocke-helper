"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const RegionSchema = apollo_server_express_1.gql `
  type Region {
    id: Int!
    name: String!
    locations: [String!]!
  }

  type Query {
    getRegions: [Region]
    getRegion(id: Int!): Region
  }
`;
exports.default = RegionSchema;
//# sourceMappingURL=RegionTypes.js.map