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
const apollo_server_express_1 = require("apollo-server-express");
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const jsonwebtoken_1 = require("jsonwebtoken");
const path_1 = __importDefault(require("path"));
require("dotenv/config");
const typeDefs_1 = __importDefault(require("./typeDefs"));
const resolvers_1 = __importDefault(require("./resolvers"));
const isAuth_1 = __importDefault(require("./isAuth"));
const UserModel_1 = __importDefault(require("./user/UserModel"));
const auth_1 = require("./user/auth");
const uri = process.env.DATABASE_URI;
mongoose_1.default
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to database'))
    .catch(err => console.log(err));
mongoose_1.default.set('useFindAndModify', false);
const server = new apollo_server_express_1.ApolloServer({
    typeDefs: typeDefs_1.default,
    resolvers: resolvers_1.default,
    context: ({ res, req }) => {
        return Object.assign({ res }, isAuth_1.default(req.headers.authorization));
    }
});
const app = express_1.default();
app.use(cookie_parser_1.default());
app.use(cors_1.default({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.post('/refresh-token', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies['nuzlocke-helper'];
    if (!token) {
        return res.send({ ok: false, accessToken: '' });
    }
    let payload = null;
    try {
        payload = jsonwebtoken_1.verify(token, process.env.COOKIE_KEY);
    }
    catch (error) {
        console.log(error);
        return res.send({ ok: false, accessToken: '' });
    }
    const user = yield UserModel_1.default.findById(payload.userId);
    if (!user) {
        return res.send({ ok: false, accessToken: '' });
    }
    auth_1.sendRefreshToken(res, auth_1.createRefreshToken(user));
    return res.send({ ok: true, accessToken: auth_1.createAccessToken(user) });
}));
app.use(express_1.default.static('public'));
app.get('*', (req, res) => {
    res.sendFile(path_1.default.resolve(__dirname, 'public', 'index.html'));
});
server.applyMiddleware({
    app,
    cors: false
});
const PORT = process.env.PORT || 4000;
app.listen({ port: PORT }, () => console.log(`🚀  Server ready at http://localhost:${PORT}${server.graphqlPath}`));
//# sourceMappingURL=index.js.map