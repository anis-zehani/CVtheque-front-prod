import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthentificationService } from '../../../@Services/authentification.service';
import { UtilService } from 'src/app/@Util/util.service';
import { FormRecupererPasswordComponent } from '../form-recuperer-password/form-recuperer-password.component';


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
              public dialog: MatDialog,
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
        this.utilService.openSnackBar('Veuillez vérifier vos paramètres, merci.', 'Erreur de connection');
        this.invalidLogin = true;
      }
    );
  }

    // Ouvre le pop-up pour récupérer le mot de passe oublié
    openDialogRecupererPassword(): void {
      // Objet pour configurer la modale
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.hasBackdrop = true;
      dialogConfig.closeOnNavigation = true;
      const dialogRef = this.dialog.open(FormRecupererPasswordComponent, {
        width: '450px',
        height: '250px'
        });
    }

}
