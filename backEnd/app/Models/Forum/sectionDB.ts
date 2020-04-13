import { ISectionModel } from "../../Interfaces/Forum/ISection";
import mongoose, { Model } from "mongoose";
const Schema = mongoose.Schema;
export const SectionSchema = new Schema({
    titleSection: { type: String, required: true, unique: true, dropDups: true },
    descSection: { type: String, required: true },
    urlSection: { type: String, required: true, unique: true, dropDups: true },
    nbMessage: Number,
    nbTopic: Number,
    lastUser: { type: Schema.Types.Mixed },
    lastMessageDate: Date
});

export let Section: Model<ISectionModel> = mongoose.model<ISectionModel>("sectionData", SectionSchema, "Section");
