"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const RegionSchema = new mongoose_1.Schema({
    _id: Number,
    name: {
        type: String,
        required: true
    },
    locations: [{
            type: String,
            required: true
        }]
}, { _id: false });
const Region = mongoose_1.model('region', RegionSchema);
exports.default = Region;
//# sourceMappingURL=RegionModel.js.map