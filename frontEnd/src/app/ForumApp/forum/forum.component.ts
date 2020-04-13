import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SectionModel } from 'src/app/Models/Forum/Section';
import { ForumService } from 'src/app/Services/forum.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit {

  public sectionList$: Observable<Array<SectionModel>>;
  constructor(private _forumService: ForumService, public userService: UserService) {
    this.sectionList$ = this._forumService.getAllSection();
  }

  ngOnInit() {

  }
}
