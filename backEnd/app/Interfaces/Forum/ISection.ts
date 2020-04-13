import { Document } from 'mongoose';
import { IUser } from '../User';
export interface ISectionModel {
    _id: String,
    titleSection: String,
    descSection: String,
    urlSection: String,
    nbMessage: Number,
    nbTopic: Number,
    lastUser: IUser,
    lastMessageDate: Date
}