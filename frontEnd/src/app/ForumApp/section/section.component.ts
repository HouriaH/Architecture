import { Component, OnInit, ViewChild } from '@angular/core';
import { TopicModel } from 'src/app/Models/Forum/Topic';
import { take } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { ForumService } from 'src/app/Services/forum.service';
import { UserService } from 'src/app/Services/user.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent implements OnInit {
  listTopic$: Observable<any>;
  listTopicGlobal = [];
  listTopicPin = [];
  listTopicSection = [];
  urlSection: String;
  titleTopic = '';
  pinSection = false;
  pinForum = false;
  loaded = false;
  topicSended = false;
  urlSectionToShow = '';
  p = 0;
  text = '';
  tinyMceSettings = {
    base_url: '/tinymce', // Root for resources
    suffix: '.min',       // Suffix to use when loading resources
    language: 'fr_FR',
    plugins: 'lists, advlist, fullscreen, code, link, image, paste, styleselect, emoticons, charmap',
    toolbar: ["fullscreen | link forecolor numlist bullist | styleselect fontsizeselect | italic", "emoticons charmap | alignleft aligncenter alignright alignjustify | image undo redo |"],
    browser_spellcheck: true,
    contextmenu: false
  };
  constructor(private router: Router, private route: ActivatedRoute, private forumService: ForumService, public userService: UserService) {
    this.route.params.pipe(take(1)).subscribe((params) => {
      this.urlSection = params['urlSection'];
      this.urlSectionToShow = this.urlSection.split('-').join(' ');
      this.initListTopic();
    });
  }

  ngOnInit() {

  }

  createTopic() {
    this.topicSended = true;
    const topic = new TopicModel(this.titleTopic, this.urlSection, this.text,
      this.userService.currentUser, this.pinSection, this.pinForum);
    this.forumService.createTopic(topic)
      .subscribe(
        idTopic => {
          this.router.navigate([this.router.url + `/${idTopic}`]);
        },
        err => {
          this.topicSended = false;
          console.log(err);
          this.errorBtn();
        }
      );
  }


  initListTopic() {
    this.forumService.getAllTopics(this.urlSection).subscribe(
      (lists) => {
        this.listTopicGlobal = lists.globalList;
        this.listTopicPin = lists.pinList;
        this.listTopicSection = lists.sectionList;
        this.loaded = true;
      },
      (err) => {
        this.loaded = true;
        console.log(err);
      }
    );
  }

  ngOnDestroy() {
  }

  sortTopics(result) {
    return result;
  }

  errorBtn() {
    const btn = document.getElementById('btnCreateTopic') as HTMLButtonElement;
    btn.style.backgroundColor = "rgba(255,0,0,0.3)";
    setTimeout(() => { btn.style.backgroundColor = "rgba(0,0,0,0.7)"; }, 1200);
  }

}
