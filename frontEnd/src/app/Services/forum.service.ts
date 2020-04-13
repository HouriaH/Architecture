import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { SectionModel } from 'src/app/Models/Forum/Section';
import { TopicModel } from 'src/app/Models/Forum/Topic';
@Injectable({
  providedIn: 'root'
})
export class ForumService {

  // tslint:disable-next-line: variable-name
  private _sectionPostUrl = environment.baseAPI + 'forumAPI/postSection';
  private _sectionGetAllUrl = environment.baseAPI + 'forumAPI/getAllSection';
  private _createTopic = environment.baseAPI + 'forumAPI/createTopic';
  private _getAllTopics = environment.baseAPI + 'forumAPI/getAllTopics';
  private _retrieveTopic = environment.baseAPI + 'forumAPI/retrieveTopic';
  private _postMessage = environment.baseAPI + 'forumAPI/postMessageTopic';

  constructor(private http: HttpClient) {
  }

  registerSection(sectionData, error) { /*error object with section*/
    return this.http.post<any>(this._sectionPostUrl, sectionData).subscribe(
      result => {
      },
      err => {
        console.log(err);
        error.section = 'Erreur, voir console.';
      }
    );
  }

  getAllSection() {
    return this.http.get<Array<SectionModel>>(this._sectionGetAllUrl);
  }

    createTopic(topic: TopicModel) {
    return this.http.post<any>(this._createTopic, topic);
  }

  postMessage(urlSection, idTopic, content, currentUser, userFound, pinSection) {
    const obj = {
      urlSection,
      idTopic,
      content,
      user: TopicModel.userForumData(currentUser),
      userFound,
      pinSection
    };
    return this.http.post<any>(this._postMessage, obj);
  }

  getAllTopics(urlSection) { // passage de listSection par référence implicitement
    const headersParamaters = { urlSection };
    const httpOptions = {
      headers: { 'Content-Type': 'application/json' },
      params: { ...headersParamaters}
    };
    return this.http.get<any>(this._getAllTopics, httpOptions);
  }
  retrieveTopic(urlSection, idTopic) {
    const headersParamaters = { urlSection, idTopic };
    const httpOptions = {
      headers: { 'Content-Type': 'application/json' },
      params: { ...headersParamaters}
    };
    return this.http.get<any>(this._retrieveTopic, httpOptions);
  }
}
