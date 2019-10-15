"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    nuzlockes: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'nuzlocke'
        }]
});
const User = mongoose_1.model('user', UserSchema);
exports.default = User;
//# sourceMappingURL=UserModel.js.map