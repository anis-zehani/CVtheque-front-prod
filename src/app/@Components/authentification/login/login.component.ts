import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthentificationService } from '../../../@Services/authentification.service';
import { UtilService } from 'src/app/@Util/util.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // Mon Reactive Form
  formAuthentification = new FormGroup({
    username: new FormControl('', Validators.nullValidator),
    password: new FormControl('', Validators.nullValidator)
  });

  invalidLogin = false;

  constructor(private router: Router,
              private utilService: UtilService,
              private authentificationService: AuthentificationService) { }

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
        // local storage : valable en dehors du Scope de la session
        // localStorage.setItem('sign-in-odix', 'Plateforme Odix');
      },
      error => {
        // Afficher un message d'erreur d'authentification
        this.utilService.openSnackBar('Spring Security Authentication : les paramètres fournis ne sont pas correctes.', 'Oops');
        this.invalidLogin = true;
      }
    );
  }
}
