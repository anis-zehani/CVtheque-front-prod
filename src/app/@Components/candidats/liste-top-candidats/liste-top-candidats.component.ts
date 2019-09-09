import { Component, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';

import { CandidatsFavorisService } from '../../../@Services/candidats-favoris.service';
import { UtilService } from 'src/app/@Util/util.service';
import { CandidatsFavoris } from 'src/app/@Models/candidats-favoris';
import { DeleteConfirmationComponent } from '../../dialogs/delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-liste-top-candidats',
  templateUrl: './liste-top-candidats.component.html',
  styleUrls: ['./liste-top-candidats.component.css']
})
export class ListeTopCandidatsComponent implements OnInit {

  constructor(private candidatsFavorisService: CandidatsFavorisService,
              private utilService: UtilService,
              public dialog: MatDialog) { }

  // Remplissage de la liste par défaut
  listeCandidatsFavoris: CandidatsFavoris[] = [];
  idUtilisateur: number;

  ngOnInit() {
    // je récupère idUtilisateur pour faire l'appel au WS avec le bon id Utilisateur
    this.idUtilisateur = this.utilService.getIdUtilisateurFromToken();
    this.getAllCandidatsFavorisController(this.idUtilisateur);
  }

  // Remplir la liste par tous les candidats
  getAllCandidatsFavorisController(idUtilisateur): void {
    this.candidatsFavorisService.getAllCandidatsFavorisForUtilisateurService(idUtilisateur)
    .subscribe
      (
      res => { this.listeCandidatsFavoris = res; }
      );
  }

  // Supprimer un candidat des favoris d'un Utilisateur
  openDialogDeleteCandidatFavori(idTopCandidat) {

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
        texte : 'Attention : ce candidat sera supprimé des favoris.'
      }
    });

    // Fonction qui s'éxècute quand je ferme la modale
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.candidatsFavorisService.deleteCandidatFromFavorisToUtilisateurService(idTopCandidat)
        .subscribe
          (
          res => {
            if (res != null) {
              this.utilService.openSnackBar('Candidat supprimé des Favoris', 'OK');
              }
          }
          );
      }
    });
  }

}
