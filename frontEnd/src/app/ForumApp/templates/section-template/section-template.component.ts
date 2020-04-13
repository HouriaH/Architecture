import { Component, OnInit, ViewChild, Input, Renderer2 } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as dateFns from 'date-fns';
import * as frLocale from 'date-fns/locale/fr/index.js';
import { SectionModel } from 'src/app/Models/Forum/Section';
import { Router } from '@angular/router';
@Component({
  selector: 'app-section-template',
  templateUrl: './section-template.component.html',
  styleUrls: ['./section-template.component.scss']
})
export class SectionTemplateComponent implements OnInit {

  _sectionData: SectionModel;
  lastnom = '';
  lastMessageDate = '';
  currentDocument: any;
  @Input() set sectionData(sectionData: SectionModel) {
    this._sectionData = sectionData;
    this.initLastParticipant();
  }

  constructor(private router: Router, private renderer: Renderer2) {
  }

  ngOnInit() {
  }
  sectionRedirect() {
    this.router.navigate(['/forum', this._sectionData.urlSection]);
  }
  initLastParticipant() {
    if (this._sectionData.lastUser) {
      this.lastnom = this._sectionData.lastUser.nom;
      const date = new Date(this._sectionData.lastMessageDate);
      this.initDateLastMessage(date);
    }
  }
  initDateLastMessage(date) {
    this.lastMessageDate = 'Il y a ' + dateFns.formatDistanceToNow(date, { addSuffix: true });
  }
}
