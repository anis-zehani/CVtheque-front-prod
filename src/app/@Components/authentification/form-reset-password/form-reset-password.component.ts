import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UtilisateurService } from 'src/app/@Services/utilisateur.service';
import { UtilService } from 'src/app/@Util/util.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthentificationService } from 'src/app/@Services/authentification.service';

@Component({
  selector: 'app-form-reset-password',
  templateUrl: './form-reset-password.component.html',
  styleUrls: ['./form-reset-password.component.css']
})
export class FormResetPasswordComponent implements OnInit {

  // Mon Reactive Form
  formResetPassword = new FormGroup({
    email: new FormControl('', Validators.email),
    password: new FormControl('', Validators.required)
  });
  invalidLogin = false;

  constructor(private utilisateurService: UtilisateurService,
              private authentificationService: AuthentificationService,
              private utilService: UtilService,
              private route: ActivatedRoute,
              private router: Router) {
                this.route.queryParams.subscribe(params => {
                  this.formResetPassword.patchValue({
                    email: params.email,
                  });
              });
               }

  ngOnInit() {
  }

  resetPassword() {
    this.utilisateurService.resetPasswordUtilisateurService(
      this.formResetPassword.get('email').value,
      this.formResetPassword.get('password').value)
    .subscribe
      (
        utilisateur => {
            if (utilisateur != null) {
              // On affiche un message de confirmation + ON REDIRIGE VERS HOME PAGE
              this.checkLogin(utilisateur.username, utilisateur.password);
              this.utilService.openSnackBar('Votre mot de passe a été mis à jour', 'OK');
            } else {
              // On affiche un message d'erreur'
              this.utilService.openSnackBar('Votre mot de passe n\'a pas pu être réinitialisé', 'Erreur');
            }

        }
      );
  }

  checkLogin(username, password) {
    this.authentificationService.authenticateByResetPassword(username, password)
     .subscribe(
      data => {
        this.router.navigate(['accueil']);
        this.invalidLogin = false;
      },
      error => {
        // Afficher un message d'erreur d'authentification
        this.utilService.openSnackBar('Veuillez vérifier vos paramètres, merci.', 'Erreur de connection');
        this.invalidLogin = true;
      }
    );
  }

}
