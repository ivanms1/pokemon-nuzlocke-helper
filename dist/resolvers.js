"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const GameResolvers_1 = __importDefault(require("./game/GameResolvers"));
const RegionResolvers_1 = __importDefault(require("./region/RegionResolvers"));
const PokemonResolvers_1 = __importDefault(require("./pokemon/PokemonResolvers"));
const NuzlockeResolvers_1 = __importDefault(require("./nuzlocke/NuzlockeResolvers"));
const UserResolvers_1 = __importDefault(require("./user/UserResolvers"));
const resolvers = lodash_1.merge(GameResolvers_1.default, RegionResolvers_1.default, PokemonResolvers_1.default, NuzlockeResolvers_1.default, UserResolvers_1.default);
exports.default = resolvers;
//# sourceMappingURL=resolvers.js.map