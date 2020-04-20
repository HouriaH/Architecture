"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
exports.UserSchema = new Schema({
    motdepasse: { type: String, required: true },
    mail: { type: String, required: true, unique: true },
    nom: { type: String, required: true },
    role: { type: String, required: true, enum: ['admin', 'moderateur', 'utilisateur'] }
});
exports.User = mongoose_1.default.model("user", exports.UserSchema, "User");
//# sourceMappingURL=User.js.map