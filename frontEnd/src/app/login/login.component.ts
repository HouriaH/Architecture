import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/Models/User';
import { UserService } from 'src/app/Services/user.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  connexion = true;
  user: User = new User();
  checkProfessor = false;
  constructor(private userService: UserService) {
    this.user.role = 'utilisateur';
  }

  ngOnInit() {
  }

  changePanel() {
    this.connexion = !this.connexion;
  }

  onSubmitConnexion(connexionForm: NgForm) {
    if (connexionForm.valid) {
      this.userService.postConnexion(this.user); // Observable<User>
    }
  }
  onSubmitInscription(inscriptionForm: NgForm) {
    if (inscriptionForm.valid) {
      this.userService.postInscription(this.user); // Observable<User>
    }
  }
}
