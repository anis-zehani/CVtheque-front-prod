import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { UtilisateurService } from 'src/app/@Services/utilisateur.service';
import { UtilService } from 'src/app/@Util/util.service';

@Component({
  selector: 'app-form-recuperer-password',
  templateUrl: './form-recuperer-password.component.html',
  styleUrls: ['./form-recuperer-password.component.css']
})
export class FormRecupererPasswordComponent implements OnInit {
  // Mon Reactive Form
  formRecupererPassword = new FormGroup({
    email: new FormControl('', Validators.email)
  });

  constructor(private utilisateurService: UtilisateurService,
              public dialog: MatDialog,
              private utilService: UtilService) { }

  ngOnInit() {
  }

  // on récupère l'adresse email puis on lance le service de récupération du Password
  recupererPassword() {
    const email = this.formRecupererPassword.get('email').value;
    this.utilisateurService.getOneUtilisateurService(email)
    .subscribe
      (
        res => {
            if (res != null) {
              // On envoi le mail via Back avec lien de Reset Password
              this.utilisateurService.envoiEmailResetPasswordService(email)
              .subscribe
                (
                  result => {
                      if (result) {
                        // On affiche un message de confirmation
                        this.utilService.openSnackBar('Merci de vérifier votre boite email, un lien de réinitialisation vous a été envoyé', 'OK');
                      } else {
                        // On affiche un message d'erreur'
                        this.utilService.openSnackBar('Une erreur dans l\'envoi du mail de réinitialisation du mot de passe', 'Erreur');
                      }
                  }
                );
            } else {
              this.utilService.openSnackBar('Veuillez vérifier votre entrée, aucun utilisateur n\'existe pour :' + email, 'Utilisateur inexistant');
            }

        }
      );
  }

  // Ouvre le pop-up pour réinitialiser le mot de passe dèja oublié
  /*openDialogResetPassword(email): void {
    // Objet pour configurer la modale
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.hasBackdrop = true;
    dialogConfig.closeOnNavigation = true;
    const dialogRef = this.dialog.open(FormResetPasswordComponent, {
        width: '450px',
        height: '350px',
        data: {email},
        });

    // Fonction qui s'éxècute quand je ferme la modale
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
          // On reset le Password
          this.resetPassword(result.email, result.password);
          }
    });
  }

  resetPassword(email, password) {
    this.utilisateurService.resetPasswordUtilisateurService(email, password)
    .subscribe
      (
        res => {
            if (res != null) {
              // On affiche un message de confirmation
              this.utilService.openSnackBar('Votre mot de passe a été mis à jour', 'OK');
            } else {
              // On affiche un message d'erreur'
              this.utilService.openSnackBar('Votre mot de passe n\'a pas pu être réinitialisé', 'Erreur');
            }

        }
      );
  }*/

}
