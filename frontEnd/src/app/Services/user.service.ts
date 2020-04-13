import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from 'src/app/Models/User';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _postInscriptionUrl = environment.userAPI + 'postInscription';
  private _postConnexionUrl = environment.userAPI + 'postConnexion';
  public currentUser: User;
  constructor(private http: HttpClient, private router: Router) {
  }

  public postInscription(user: User) {
    console.log(this._postInscriptionUrl);
    this.http.post(this._postInscriptionUrl, user).subscribe(
      (userFromAPI) => {
        this.currentUser = new User(userFromAPI);
        this.storeItem(this.currentUser);
        this.router.navigate(['/forum']);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  public canPinTopic() {
    return this.currentUser.role !== 'utilisateur';
  }

  public postConnexion(user: User) {
    this.http.post(this._postConnexionUrl, user).subscribe(
      (userFromAPI) => {
        this.currentUser = new User(userFromAPI);
        this.storeItem(this.currentUser);
        this.router.navigate(['/forum']);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  loggedIn() {
    const loggedIn = !!localStorage.getItem('currentUser');
    return loggedIn;
  }

  checkLog() {
      const loggedIn = !!localStorage.getItem('currentUser');
      if (loggedIn) {
        this.initUser();
      }
      return loggedIn;
  }
  getUserRole() {
    return JSON.parse(localStorage.getItem('currentUser'))['role'];
  }

  initUser() {
    this.currentUser = new User(JSON.parse(localStorage.getItem('currentUser')));
    console.log('user from localstorage : ', this.currentUser);
  }

  storeItem(userFromAPI) {
    localStorage.setItem('currentUser', JSON.stringify(userFromAPI));
  }
}
