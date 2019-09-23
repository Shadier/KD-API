'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const ProductSchema = Schema({
    codebar: String,
    name: String,
    description: String,
    size: String,
    cost: Number,
    price: Number,
    stock: Number
});
module.exports = mongoose_1.default.model('Product', ProductSchema);
//# sourceMappingURL=product.js.map