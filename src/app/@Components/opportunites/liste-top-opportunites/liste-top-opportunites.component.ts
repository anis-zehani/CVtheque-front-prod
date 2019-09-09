import { Component, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';

import { OpportunitesFavorisService } from '../../../@Services/opportunites-favoris.service';
import { UtilService } from 'src/app/@Util/util.service';
import { OpportunitesFavoris } from 'src/app/@Models/opportunites-favoris';
import { DeleteConfirmationComponent } from '../../dialogs/delete-confirmation/delete-confirmation.component';


@Component({
  selector: 'app-liste-top-opportunites',
  templateUrl: './liste-top-opportunites.component.html',
  styleUrls: ['./liste-top-opportunites.component.css']
})
export class ListeTopOpportunitesComponent implements OnInit {

  constructor(private opportunitesFavorisService: OpportunitesFavorisService,
              private utilService: UtilService,
              public dialog: MatDialog) { }

  // Remplissage de la liste par défaut
  listeOpportunitesFavoris: OpportunitesFavoris[] = [];
  idUtilisateur: number;

  ngOnInit() {
    // je récupère idUtilisateur pour faire l'appel au WS avec le bon id Utilisateur
    this.idUtilisateur = this.utilService.getIdUtilisateurFromToken();
    this.getAllOpportunitesFavorisController(this.idUtilisateur);
  }

  // Remplir la liste par toutes les opportunités
  getAllOpportunitesFavorisController(idUtilisateur): void {
    this.opportunitesFavorisService.getAllOpportunitesFavorisForUtilisateurService(idUtilisateur)
    .subscribe
      (
      res => { this.listeOpportunitesFavoris = res; }
      );
  }

  // Supprimer une opportunité des favoris d'un Utilisateur
  openDialogDeleteOpportuniteFavorie(idTopOpportunite) {

    // Objet pour configurer la modale
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.hasBackdrop = true;
    dialogConfig.closeOnNavigation = true;

    // Objet pour déclencher l'ouverture de la modale
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      width: '450px',
      height: '180px',
      data: {
        texte : 'Attention : cette opportunité sera supprimée des favoris.'
      }
    });

    // Fonction qui s'éxècute quand je ferme la modale
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.opportunitesFavorisService.deleteOpportuniteFromFavorisToUtilisateurService(idTopOpportunite)
        .subscribe
          (
          res => {
            if (res != null) {
              this.utilService.openSnackBar('Opportunité supprimée des Favoris', 'OK');
              }
          }
          );
      }
    });
  }

}
