'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ClientSchema = require('./client').schema;
const Schema = mongoose_1.default.Schema;
const PurchaseSchema = Schema({
    client: ClientSchema,
    date: Date,
    subtotal: Number,
    total: Number,
});
module.exports = mongoose_1.default.model('Purchase', PurchaseSchema);
//# sourceMappingURL=purchase.js.map