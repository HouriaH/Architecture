import { Component, OnInit, ViewChild, Input, ElementRef, Renderer2 } from '@angular/core';
import * as dateFns from 'date-fns';
import { TopicModel } from 'src/app/Models/Forum/Topic';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topic-template',
  templateUrl: './topic-template.component.html',
  styleUrls: ['./topic-template.component.scss']
})
export class TopicTemplateComponent implements OnInit {

  _topicData: TopicModel;
  messagesLength: number;
  nbParticipant: number;
  lastnom: String = '';
  lastMessageDate = '';
  currentDocument: any;
  @ViewChild('pinTopic', {static: true}) pinTopic: ElementRef;
  lastUpdateDateParsed: String;
  imgProfilAuthorSrc = '';
  imgProfilLastUserSrc = '';
  @Input() set topicData(topicData: TopicModel) {
    this._topicData = topicData;
    this.initPinImg();
    this.initLastParticipant();
  }

  constructor(private router: Router, private renderer: Renderer2) { }

  ngOnInit() {
  }

  topicRedirect() {
    this.router.navigate([this.router.url + `/${this._topicData.idTopic}`]);
  }

  initLastParticipant() {
    if (this._topicData.lastUser) {
      this.lastnom = this._topicData.lastUser.nom;
      const date = new Date(this._topicData.lastUpdateDate);
      this.initDateLastMessage(date);
    }
  }

  initDateLastMessage(date) {
    this.lastUpdateDateParsed = 'Il y a ' + dateFns.formatDistanceToNow(date, { addSuffix: true });
  }

  initPinImg() {
    if (this._topicData.pinForum) {
      this.renderer.setAttribute(this.pinTopic.nativeElement, 'src', '/assets/pinForum.svg');
      this.renderer.setStyle(this.pinTopic.nativeElement, 'display', 'block');
    } else if (this._topicData.pinSection) {
      this.renderer.setAttribute(this.pinTopic.nativeElement, 'src', '/assets/pinSection.svg');
      this.renderer.setStyle(this.pinTopic.nativeElement, 'display', 'block');
    }
  }
}
