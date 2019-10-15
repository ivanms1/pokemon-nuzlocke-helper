"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const RegionModel_1 = __importDefault(require("../RegionModel"));
const regions_1 = require("./regions");
require('dotenv').config();
const uri = process.env.DATABASE_URI;
mongoose_1.default.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to database'))
    .catch(err => console.log(err));
mongoose_1.default.set('useFindAndModify', false);
regions_1.regions.map(region => {
    return new RegionModel_1.default({
        _id: region._id,
        name: region.name,
        locations: region.locations.map(location => location.name)
    }).save();
});
//# sourceMappingURL=script.js.map