import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { FormAddCompteCandidatComponent } from '../../@Components/authentification/form-add-compte-candidat/form-add-compte-candidat.component';
import { FormAddComptePartenaireComponent } from '../../@Components/authentification/form-add-compte-partenaire/form-add-compte-partenaire.component';
import { FormRecupererPasswordComponent } from '../../@Components/authentification/form-recuperer-password/form-recuperer-password.component';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css']
})
export class AuthentificationComponent implements OnInit {

  // Mon Reactive Form
  formAuthentification = new FormGroup({
    email: new FormControl('admin', Validators.nullValidator),
    password: new FormControl('admin', Validators.nullValidator)
  });

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  authentification() {
  }

  // Ouvre le pop-up pour récupérer le mot de passe oublié
  openDialogRecupererPassword(id): void {
    // Objet pour configurer la modale
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.hasBackdrop = true;
    dialogConfig.closeOnNavigation = true;
    const dialogRef = this.dialog.open(FormRecupererPasswordComponent, {
      width: '450px',
      height: '180px',
      data: {
          // id: id,
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
  openDialogCreerCompteCandidat(id): void {
      // Objet pour configurer la modale
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.hasBackdrop = true;
      dialogConfig.closeOnNavigation = true;
      const dialogRef = this.dialog.open(FormAddCompteCandidatComponent, {
        width: '450px',
        height: '180px',
        data: {
            // id: id,
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
  openDialogCreerCompteRecruteur(id): void {
      // Objet pour configurer la modale
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.hasBackdrop = true;
      dialogConfig.closeOnNavigation = true;
      const dialogRef = this.dialog.open(FormAddComptePartenaireComponent, {
        width: '450px',
        height: '180px',
        data: {
            // id: id,
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
