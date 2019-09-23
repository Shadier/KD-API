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
    password: String,
    role: Number,
    userIA: Boolean,
    remoteDays: {
        monday: Boolean,
        tuesday: Boolean,
        wednesday: Boolean,
        thursday: Boolean,
        friday: Boolean
    },
    last_partner: this,
    last_day: Number,
});
module.exports = mongoose_1.default.model('User', UserSchema);
//# sourceMappingURL=user.js.map