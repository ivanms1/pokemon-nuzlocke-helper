"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const GameModel_1 = __importDefault(require("../GameModel"));
const games_1 = require("./games");
require('dotenv').config();
const uri = process.env.DATABASE_URI;
mongoose_1.default.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to database'))
    .catch(err => console.log(err));
mongoose_1.default.set('useFindAndModify', false);
games_1.games.map(game => {
    return new GameModel_1.default({
        _id: game._id,
        name: game.name,
        generation: game.generation,
        region: game.region
    }).save();
});
//# sourceMappingURL=script.js.map