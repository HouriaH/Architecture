import mongoose from "mongoose";
const Schema = mongoose.Schema;

export const MessageSchema = new Schema({
    user: { type: Schema.Types.Mixed },
    content: { type: String },
    date: { type: Date },
    userUpdate: { type: Schema.Types.Mixed },
    userUpdateContent: String
});
