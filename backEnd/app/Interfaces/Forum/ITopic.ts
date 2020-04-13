import { Document } from 'mongoose';
import { IMessageModel } from './IMessage';
import { IUser } from '../User';
export interface ITopicModel extends Document {
    _id: String,
    urlSection: String,
    titleTopic: String,
    idTopic: String,
    creator: IUser,
    lastUser: IUser,
    createdDate: { type: Date },
    lastUpdateDate: Date,
    pinSection: Boolean,
    pinForum: Boolean,
    nbMessage: Number,
    nbParticipant: Number,
    Messages: Array<IMessageModel>
}