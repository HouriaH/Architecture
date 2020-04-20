"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
exports.MessageSchema = new Schema({
    user: { type: Schema.Types.Mixed },
    content: { type: String },
    date: { type: Date },
    userUpdate: { type: Schema.Types.Mixed },
    userUpdateContent: String
});
//# sourceMappingURL=messageDB.js.map