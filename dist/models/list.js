'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ProductSchema = require('./product').schema;
const Schema = mongoose_1.default.Schema;
const ListSchema = Schema({
    quantity: Number,
    product: ProductSchema,
    subtotal: Number,
    purchaseId: String,
});
module.exports = mongoose_1.default.model('List', ListSchema);
//# sourceMappingURL=list.js.map