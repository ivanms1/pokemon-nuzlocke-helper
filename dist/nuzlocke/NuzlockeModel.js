"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const NuzlockeSchema = new mongoose_1.Schema({
    type: {
        type: String,
        enum: ['NORMAL', 'CAGELOCKE', 'SOUL_LINK'],
        required: true
    },
    game: {
        type: Number,
        ref: 'game'
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'user'
    },
    name: {
        type: String,
        required: true
    },
    encounters: [{
            location: {
                type: String,
                required: true
            },
            pokemon: {
                type: Number,
                ref: 'pokemon'
            },
            isCaptured: {
                type: Boolean,
                required: true
            }
        }],
    team: [{
            pokemon: {
                type: Number,
                required: true,
                ref: 'pokemon'
            },
            nickname: {
                type: String
            },
            status: {
                type: String,
                enum: ['ALIVE', 'DEAD', 'RELEASED', 'IN_PC'],
                required: true
            },
            level: {
                type: Number,
                default: 1
            },
            moves: [{
                    type: Number,
                    ref: 'move'
                }]
        }],
    score: {
        type: Number,
        default: 0
    },
    deaths: {
        type: Number,
        default: 0
    }
});
const Nuzlocke = mongoose_1.model('nuzlocke', NuzlockeSchema);
exports.default = Nuzlocke;
//# sourceMappingURL=NuzlockeModel.js.map