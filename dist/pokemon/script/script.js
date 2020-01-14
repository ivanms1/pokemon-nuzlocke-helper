"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const PokemonModel_1 = __importDefault(require("../PokemonModel"));
const pokemons_1 = require("./pokemons");
const uri = process.env.DATABASE_URI;
mongoose_1.default.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to database'))
    .catch(err => console.log(err));
pokemons_1.pokemons.map((pokemon) => {
    return new PokemonModel_1.default({
        id: pokemon.id,
        name: pokemon.name.english,
        type: pokemon.type,
        baseStats: {
            hp: pokemon.base.HP,
            attack: pokemon.base.Attack,
            defense: pokemon.base.Defense,
            specialAttack: pokemon.base['Sp. Attack'],
            specialDefense: pokemon.base['Sp. Defense'],
            speed: pokemon.base.Speed
        },
        image: `https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/images/${(('000' + pokemon.id).substr(-3))}.png`,
        sprite: `https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/sprites/${(('000' + pokemon.id).substr(-3))}MS.png`
    }).save();
});
//# sourceMappingURL=script.js.map