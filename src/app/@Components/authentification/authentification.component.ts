import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';

import { FormAddCompteCandidatComponent } from '../../@Components/authentification/form-add-compte-candidat/form-add-compte-candidat.component';
import { FormAddComptePartenaireComponent } from '../../@Components/authentification/form-add-compte-partenaire/form-add-compte-partenaire.component';
import { FormRecupererPasswordComponent } from '../../@Components/authentification/form-recuperer-password/form-recuperer-password.component';
import { AuthentificationService } from 'src/app/@Services/authentification.service';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css']
})
export class AuthentificationComponent implements OnInit {

  constructor(public dialog: MatDialog,
              private authentificationService: AuthentificationService) { }

  ngOnInit() {
  }

  authenticateWithLinkedIn() {
    this.authentificationService.authenticateWithLinkedInService()
    .subscribe
      (
        res => {
            // Redirection vers le serveur d'Autorisation Linkedin pour obtenir le code
            window.location.href = res[0];
            return true;
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
      height: '180px',
      data: {
          // texte : "Attention : Afficher Message."
        }
      });

    // Fonction qui s'éxècute quand je ferme la modale
    dialogRef.afterClosed().subscribe(result => {
        if (result) {
            // do something here
        }
      });
  }

  // Ouvre le pop-up pour créer compte candidat
  openDialogCreerCompteCandidat(): void {
      // Objet pour configurer la modale
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.hasBackdrop = true;
      dialogConfig.closeOnNavigation = true;
      const dialogRef = this.dialog.open(FormAddCompteCandidatComponent, {
        width: '950px',
        height: '550px',
        data: {
            // texte : "Attention : Afficher Message."
          }
        });

      // Fonction qui s'éxècute quand je ferme la modale
      dialogRef.afterClosed().subscribe(result => {
          if (result) {
              // do something here
          }
        });
  }

  // Ouvre le pop-up pour créer compte recruteur
  openDialogCreerCompteRecruteur(): void {
      // Objet pour configurer la modale
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.hasBackdrop = true;
      dialogConfig.closeOnNavigation = true;
      const dialogRef = this.dialog.open(FormAddComptePartenaireComponent, {
        width: '700px',
        height: '550px',
        data: {
            // texte : "Attention : Afficher Message."
          }
        });

      // Fonction qui s'éxècute quand je ferme la modale
      dialogRef.afterClosed().subscribe(result => {
          if (result) {
              // do something here
          }
        });
  }

}
