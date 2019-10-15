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
const UserResolvers = {
    Mutation: {
        signUp: (_, { input }) => __awaiter(void 0, void 0, void 0, function* () {
            return yield UserModel_1.default.create({ input });
        }),
        login: (_, { input }) => __awaiter(void 0, void 0, void 0, function* () {
            return UserModel_1.default.find({ email: input.email })
                .then(user => {
                if (!user) {
                    throw Error('email is not registered');
                }
                if (input.password !== user.password) {
                    throw Error('invalid credentials');
                }
                return user;
            });
        })
    }
};
exports.default = UserResolvers;
//# sourceMappingURL=UserResolvers.js.map