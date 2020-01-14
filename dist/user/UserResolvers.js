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
const UserModel_1 = __importDefault(require("./UserModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const auth_1 = require("./auth");
const UserResolvers = {
    Query: {
        getUser: (_, { userId }) => __awaiter(void 0, void 0, void 0, function* () {
            return yield UserModel_1.default.findOne({ _id: userId })
                .populate('nuzlockes')
                .populate({
                path: 'nuzlockes',
                populate: [
                    { path: 'game' },
                    { path: 'pokemons.pokemon', model: 'pokemon' },
                    { path: 'pokemons.partner', model: 'pokemon' }
                ]
            });
        }),
        getCurrentUser: (_, args, { userId }) => __awaiter(void 0, void 0, void 0, function* () {
            return yield UserModel_1.default.findById(userId);
        })
    },
    Mutation: {
        signUp: (_, { input }, { res }) => __awaiter(void 0, void 0, void 0, function* () {
            const { email } = input;
            const user = yield UserModel_1.default.findOne({ email });
            if (user)
                throw Error('Email already registered');
            const hashedPassword = yield bcryptjs_1.default.hashSync(input.password, 10);
            input.password = hashedPassword;
            const newUser = yield UserModel_1.default.create(input);
            const token = auth_1.createAccessToken(newUser);
            auth_1.sendRefreshToken(res, auth_1.createRefreshToken(newUser));
            return {
                userId: newUser.id,
                token,
                tokenExpiration: 3
            };
        }),
        login: (_, { input }, { res }) => __awaiter(void 0, void 0, void 0, function* () {
            const { password } = input;
            const user = yield UserModel_1.default.findOne({ email: input.email });
            if (!user) {
                throw Error('email is not registered');
            }
            const isMatch = yield bcryptjs_1.default.compare(password, user.password);
            if (!isMatch) {
                throw new Error('Invalid credentials');
            }
            const token = auth_1.createAccessToken(user);
            res.cookie('nuzlocke-helper', auth_1.createRefreshToken(user), {
                httpOnly: true
            });
            return {
                userId: user.id,
                token,
                tokenExpiration: 3
            };
        })
    }
};
exports.default = UserResolvers;
//# sourceMappingURL=UserResolvers.js.map