import { User } from "src/app/Models/User";

export class MessageModel {
  user: any; // userModel Light
  content: String;
  date: Date;
  userUpdate: User;
  userUpdateContent: String;

  constructor(user: any, content: String) {
    this.user = user;
    this.content = content;
    this.date = new Date;
  }

}
