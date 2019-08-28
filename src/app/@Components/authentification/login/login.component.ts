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

  invalidLogin = false;

  constructor(private router: Router, private authentificationService: AuthentificationService) { }

  ngOnInit() {
  }

  checkLogin() {
    this.authentificationService.authenticate(
      this.formAuthentification.get('username').value,
      this.formAuthentification.get('password').value)
     .subscribe(
      data => {
        this.router.navigate(['accueil']);
        this.invalidLogin = false;
        console.log(data);
      },
      error => {
        this.invalidLogin = true;
        console.log(error);
      }
    );
  }
}
