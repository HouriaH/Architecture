"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
exports.SectionSchema = new Schema({
    titleSection: { type: String, required: true, unique: true, dropDups: true },
    descSection: { type: String, required: true },
    urlSection: { type: String, required: true, unique: true, dropDups: true },
    nbMessage: Number,
    nbTopic: Number,
    lastUser: { type: Schema.Types.Mixed },
    lastMessageDate: Date
});
exports.Section = mongoose_1.default.model("sectionData", exports.SectionSchema, "Section");
//# sourceMappingURL=sectionDB.js.map