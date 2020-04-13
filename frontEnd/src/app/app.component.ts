import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from './Services/user.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';

  constructor(private userService: UserService, private http: HttpClient) {
    if (this.userService.loggedIn()) { // source page, reload on refresh.
      this.userService.initUser();
    }
  }
}
