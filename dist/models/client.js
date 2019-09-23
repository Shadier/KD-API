'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const UserSchema = Schema({
    name: String,
    lastname: String,
    email: String,
    age: Number,
});
module.exports = mongoose_1.default.model('User', UserSchema);
//# sourceMappingURL=client.js.map