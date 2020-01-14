"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PokemonModel_1 = __importDefault(require("./PokemonModel"));
const PokemonResolvers = {
    Query: {
        getPokemons: (_, { game }) => __awaiter(void 0, void 0, void 0, function* () {
            if (game <= 3)
                return yield PokemonModel_1.default.find({ _id: { $lte: 151 } });
            if (game <= 6)
                return yield PokemonModel_1.default.find({ _id: { $lte: 251 } });
            if (game <= 11)
                return yield PokemonModel_1.default.find({ _id: { $lte: 386 } });
            if (game <= 16)
                return yield PokemonModel_1.default.find({ _id: { $lte: 493 } });
            if (game <= 22)
                return yield PokemonModel_1.default.find({ _id: { $lte: 649 } });
            if (game <= 26)
                return yield PokemonModel_1.default.find({ _id: { $lte: 721 } });
            return yield PokemonModel_1.default.find();
        }),
        getPokemon: (_, { id }) => __awaiter(void 0, void 0, void 0, function* () {
            return yield PokemonModel_1.default.findById(id);
        })
    }
};
exports.default = PokemonResolvers;
//# sourceMappingURL=PokemonResolvers.js.map