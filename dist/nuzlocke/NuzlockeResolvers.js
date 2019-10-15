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
const NuzlockeResolvers = {
    Query: {
        getNuzlockes: (_, { userId }) => __awaiter(void 0, void 0, void 0, function* () {
            return yield NuzlockeModel_1.default.find({ user: userId }).populate('region');
        }),
        getNuzlocke: (_, { id }) => __awaiter(void 0, void 0, void 0, function* () {
            return yield NuzlockeModel_1.default.findById(id).populate('region');
        })
    },
    Mutations: {
        createNuzlocke: (_, { input }) => __awaiter(void 0, void 0, void 0, function* () {
            const nuzlocke = yield NuzlockeModel_1.default.create(input);
            return nuzlocke;
        }),
        updateEncounters: (_, { id, input }) => __awaiter(void 0, void 0, void 0, function* () {
            return yield NuzlockeModel_1.default.findByIdAndUpdate(id, { $set: { encounters: input } }, { new: true });
        }),
        updateTeam: (_, { id, input }) => __awaiter(void 0, void 0, void 0, function* () {
            return yield NuzlockeModel_1.default.findByIdAndUpdate(id, { $set: { team: input } }, { new: true });
        }),
    }
};
exports.default = NuzlockeResolvers;
//# sourceMappingURL=NuzlockeResolvers.js.map