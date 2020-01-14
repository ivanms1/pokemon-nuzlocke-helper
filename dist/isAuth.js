"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const isAuth = (authorization) => {
    if (!authorization) {
        return {
            isAuth: false
        };
    }
    const token = authorization.split(' ')[1];
    let decodedToken;
    try {
        decodedToken = jsonwebtoken_1.verify(token, process.env.JWT_KEY);
    }
    catch (error) {
        return {
            isAuth: false
        };
    }
    if (!decodedToken) {
        return {
            isAuth: false
        };
    }
    return {
        isAuth: true,
        userId: decodedToken.userId
    };
};
exports.default = isAuth;
//# sourceMappingURL=isAuth.js.map