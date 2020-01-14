"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
require("dotenv/config");
const jwtKey = process.env.JWT_KEY;
const cookieKey = process.env.COOKIE_KEY;
exports.createAccessToken = (user) => {
    return jsonwebtoken_1.sign({
        userId: user.id,
        email: user.email
    }, jwtKey, {
        expiresIn: '15m'
    });
};
exports.createRefreshToken = (user) => {
    return jsonwebtoken_1.sign({
        userId: user.id
    }, cookieKey, {
        expiresIn: '7d'
    });
};
exports.sendRefreshToken = (res, token) => {
    res.cookie('nuzlocke-helper', token, {
        httpOnly: true,
        path: '/refresh-token'
    });
};
//# sourceMappingURL=auth.js.map