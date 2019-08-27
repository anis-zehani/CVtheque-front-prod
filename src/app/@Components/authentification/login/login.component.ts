import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthentificationService } from '../../../@Services/authentification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // Mon Reactive Form
  formAuthentification = new FormGroup({
    username: new FormControl('demo', Validators.nullValidator),
    password: new FormControl('demo', Validators.nullValidator)
  });

  username1 = 'user';
  password1 = '0b648431-51f5-4160-91dc-9ed29db89312';
  invalidLogin = false;

  constructor(private router: Router, private authentificationService: AuthentificationService) { }

  ngOnInit() {
  }

  checkLogin() {
    if (this.authentificationService.authenticate(this.username1, this.password1)
    ) {
      this.router.navigate(['accueil']);
      this.invalidLogin = false;
    } else {
      this.invalidLogin = true;
    }
  }

}
