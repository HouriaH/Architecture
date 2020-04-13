import { Document } from 'mongoose';

import { IUser } from '../User';

export interface IMessageModel extends Document {
    user: any,
    content: String,
    date: Date,
    userUpdate: IUser,
    userUpdateContent: String
}