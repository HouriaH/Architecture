import { Component, OnInit } from '@angular/core';
import { SectionModel } from 'src/app/Models/Forum/Section';
import { ForumService } from 'src/app/Services/forum.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-creation-section',
  templateUrl: './creation-section.component.html',
  styleUrls: ['./creation-section.component.scss']
})
export class CreationSectionComponent implements OnInit {


  error = { section: '' };
  sectionData = new SectionModel();

  constructor(private forumService: ForumService) { }

  ngOnInit() {
  }

  onSubmitSection(sectionForm: NgForm) {
    if (sectionForm.valid) {
      this.forumService.registerSection(this.sectionData, this.error);
    }
  }
}
