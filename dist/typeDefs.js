"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const GameTypes_1 = __importDefault(require("./game/GameTypes"));
const RegionTypes_1 = __importDefault(require("./region/RegionTypes"));
const PokemonTypes_1 = __importDefault(require("./pokemon/PokemonTypes"));
const NucklockeTypes_1 = __importDefault(require("./nuzlocke/NucklockeTypes"));
const UserTypes_1 = __importDefault(require("./user/UserTypes"));
const typeDefs = [GameTypes_1.default, RegionTypes_1.default, PokemonTypes_1.default, NucklockeTypes_1.default, UserTypes_1.default];
exports.default = typeDefs;
//# sourceMappingURL=typeDefs.js.map