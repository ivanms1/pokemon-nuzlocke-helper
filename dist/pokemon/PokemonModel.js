"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PokemonSchema = new mongoose_1.Schema({
    _id: Number,
    name: {
        type: String,
        required: true
    },
    type: [{
            type: String,
            required: true
        }],
    image: {
        type: String,
        required: true
    },
    sprite: {
        type: String,
        required: true
    },
    baseStats: {
        hp: {
            type: Number,
            required: true
        },
        attack: {
            type: Number,
            required: true
        },
        defense: {
            type: Number,
            required: true
        },
        specialAttack: {
            type: Number,
            required: true
        },
        specialDefense: {
            type: Number,
            required: true
        },
        speed: {
            type: Number,
            required: true
        }
    }
}, { _id: false });
const Pokemon = mongoose_1.model('pokemon', PokemonSchema);
exports.default = Pokemon;
//# sourceMappingURL=PokemonModel.js.map