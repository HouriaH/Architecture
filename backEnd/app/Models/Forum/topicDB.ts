import { ITopicModel } from "../../Interfaces/Forum/ITopic";
import { MessageSchema } from "./messageDB";

import mongoose, { Model } from "mongoose";
const Schema = mongoose.Schema;
var Message = MessageSchema;
export const TopicSchema = new Schema({
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

export let Topic: Model<ITopicModel> = mongoose.model<ITopicModel>("topic", TopicSchema, "Topic");