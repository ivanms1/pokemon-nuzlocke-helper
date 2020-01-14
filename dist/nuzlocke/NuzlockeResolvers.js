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
const NuzlockeModel_1 = __importDefault(require("./NuzlockeModel"));
const UserModel_1 = __importDefault(require("../user/UserModel"));
const NuzlockeResolvers = {
    Query: {
        getNuzlockes: (_, { userId }, { isAuth }) => __awaiter(void 0, void 0, void 0, function* () {
            return yield NuzlockeModel_1.default.find({ user: userId })
                .populate('user')
                .populate({ path: 'game', populate: { path: 'region' } })
                .populate({ path: 'pokemons', populate: { path: 'pokemon' } })
                .populate({ path: 'pokemons.partner', model: 'pokemon' });
        }),
        getNuzlocke: (_, { id }, { isAuth }) => __awaiter(void 0, void 0, void 0, function* () {
            if (!isAuth) {
                throw Error('Not Authorized');
            }
            return yield NuzlockeModel_1.default.findById(id)
                .populate('user')
                .populate({ path: 'game', populate: { path: 'region' } })
                .populate({ path: 'pokemons.pokemon', model: 'pokemon' })
                .populate({ path: 'pokemons.partner', model: 'pokemon' });
        })
    },
    Mutation: {
        createNuzlocke: (_, { input }, { isAuth }) => __awaiter(void 0, void 0, void 0, function* () {
            if (!isAuth) {
                throw Error('Not Authorized');
            }
            const nuzlocke = yield NuzlockeModel_1.default.create(input);
            yield UserModel_1.default.findByIdAndUpdate(input.user, {
                $push: { nuzlockes: nuzlocke._id }
            });
            return nuzlocke
                .populate({ path: 'game', populate: { path: 'region' } })
                .execPopulate();
        }),
        addPokemon: (_, { id, pokemon }, { isAuth }) => __awaiter(void 0, void 0, void 0, function* () {
            if (!isAuth) {
                throw Error('Not Authorized');
            }
            const updatedNuzlocke = yield NuzlockeModel_1.default.findByIdAndUpdate(id, { $push: { pokemons: pokemon } }, { new: true })
                .populate({ path: 'game', populate: { path: 'region' } })
                .populate({ path: 'pokemons.pokemon', model: 'pokemon' })
                .populate({ path: 'pokemons.partner', model: 'pokemon' });
            return updatedNuzlocke;
        }),
        updatePokemon: (_, { id, pokemon }, { isAuth }) => __awaiter(void 0, void 0, void 0, function* () {
            if (!isAuth) {
                throw Error('Not Authorized');
            }
            const updatedNuzlocke = yield NuzlockeModel_1.default.findOneAndUpdate({ _id: id, 'pokemons._id': pokemon.id }, { $set: { 'pokemons.$': pokemon } }, { new: true })
                .populate({ path: 'game', populate: { path: 'region' } })
                .populate({ path: 'pokemons.pokemon', model: 'pokemon' })
                .populate({ path: 'pokemons.partner', model: 'pokemon' });
            return updatedNuzlocke;
        })
    }
};
exports.default = NuzlockeResolvers;
//# sourceMappingURL=NuzlockeResolvers.js.map