"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const NuzlockePokemonSchema = new mongoose_1.Schema({
    location: {
        type: String,
        required: true
    },
    pokemon: {
        type: Number,
        ref: 'pokemon'
    },
    partner: {
        type: Number,
        ref: 'pokemon'
    },
    nickname: {
        type: String
    },
    status: {
        type: String,
        enum: ['IN_TEAM', 'IN_PC', 'DEAD', 'SEEN'],
        required: true
    },
    level: {
        type: Number,
        default: 1
    },
    moves: [
        {
            type: Number,
            ref: 'move'
        }
    ]
});
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
        ref: 'user',
        required: true
    },
    name: {
        type: String
    },
    pokemons: [
        {
            type: NuzlockePokemonSchema
        }
    ],
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