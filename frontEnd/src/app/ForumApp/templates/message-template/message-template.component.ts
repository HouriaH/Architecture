import { Component, OnInit, ViewChild, Input, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-message-template',
  templateUrl: './message-template.component.html',
  styleUrls: ['./message-template.component.scss']
})
export class MessageTemplateComponent implements OnInit {
  _messageData: any;
  currentDocument: any;
  content = '';

  @Input() set messageData(messageData: any) {
    this._messageData = messageData;
    this.content = this._messageData.content;
  }
  constructor(private router: Router, private renderer: Renderer2) { }

  ngOnInit() {
  }

}
