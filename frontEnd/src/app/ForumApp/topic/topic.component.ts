import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/Services/user.service';
import { ActivatedRoute } from '@angular/router';
import { ForumService } from 'src/app/Services/forum.service';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styleUrls: ['./topic.component.scss']
})
export class TopicComponent implements OnInit {

  urlSection$: Observable<any>;
  idTopic$: Observable<any>;
  urlSection: string;
  idTopic: string;
  listMessage = [];
  titleTopic: string;
  pinSection: boolean = false;
  p = 0;
  loaded = false;
  messageSended = false;
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
  constructor(private userService: UserService, private route: ActivatedRoute, private forumService: ForumService) {
    this.urlSection$ = this.route.params.pipe(take(1));
    this.urlSection$.subscribe(params => {
      this.urlSection = params['urlSection'];
      this.idTopic = params['idTopic'];
      this.retrieveTopic();
    });
  }

  ngOnInit() {
  }
  retrieveTopic() {
    this.forumService.retrieveTopic(this.urlSection, this.idTopic)
      .subscribe(
        (result) => {
          let i = 0;
          this.titleTopic = result.titleTopic;
          this.pinSection = result.pinSection;
          result = result.Messages.map(
            (obj) => {
              obj.index = i++;
              return obj;
            }
          );
          this.listMessage = [...result];
          this.loaded = true;
          setTimeout(() => {
            this.messageSended = false;
          }, 5000);
        },
        (err) => {
          console.log(err);
          this.loaded = true;
        }
      );
  }

  createMessage() {
    if (this.text.length > 2 && !this.messageSended) {
      this.messageSended = true;
      let i = 0;
      const listMsgLength = this.listMessage.length;
      let userFound = false;
      while (i < listMsgLength && !userFound) {
        userFound = (this.listMessage[i].user.nom === this.userService.currentUser.nom);
        i++;
      }
      // tslint:disable-next-line:max-line-length
      this.forumService.postMessage(this.urlSection, this.idTopic, this.text, this.userService.currentUser, userFound, this.pinSection)
        .subscribe(
          (result) => {
            this.text = '';
            this.retrieveTopic();
          },
          (err) => {
            this.messageSended = false;
            console.log(err);
          }
        );
    }
  }
}
