import { User } from "src/app/Models/User";

export class SectionModel {
  _id: String;
  titleSection: String;
  descSection: String;
  urlSection: String;
  nbMessage: Number;
  nbTopic: Number;
  lastUser: User;
  lastMessageDate: Date;
  constructor() {
    this.titleSection = '';
    this.descSection = '';
    this.urlSection = '';
    this.nbMessage = 0;
    this.nbTopic = 0;
  }
}
