"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const GameSchema = new mongoose_1.Schema({
    _id: Number,
    name: {
        type: String,
        required: true
    },
    generation: {
        type: String,
        required: true
    },
    region: {
        type: Number,
        ref: 'region'
    }
}, { _id: false });
const Game = mongoose_1.model('game', GameSchema);
exports.default = Game;
//# sourceMappingURL=GameModel.js.map