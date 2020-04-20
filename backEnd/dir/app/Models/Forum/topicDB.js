"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const messageDB_1 = require("./messageDB");
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
var Message = messageDB_1.MessageSchema;
exports.TopicSchema = new Schema({
    urlSection: { type: String },
    titleTopic: { type: String },
    idTopic: { type: String },
    creator: { type: Schema.Types.Mixed },
    lastUser: { type: Schema.Types.Mixed },
    createdDate: { type: Date },
    lastUpdateDate: { type: Date },
    pinSection: { type: Boolean },
    pinForum: { type: Boolean },
    nbMessage: Number,
    nbParticipant: Number,
    Messages: [Message]
});
exports.Topic = mongoose_1.default.model("topic", exports.TopicSchema, "Topic");
//# sourceMappingURL=topicDB.js.map