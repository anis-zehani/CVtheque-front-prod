import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { environment } from '../../../../environments/environment';

import { UtilService } from '../../../@Util/util.service';
import { Opportunite } from 'src/app/@Models/opportunite';
import { ShowPartenaireComponent } from '../../../@Components/partenaires/show-partenaire/show-partenaire.component';
import { OpportunitesFavorisService } from 'src/app/@Services/opportunites-favoris.service';
import { OpportunitesFavoris } from 'src/app/@Models/opportunites-favoris';

@Component({
  selector: 'app-show-opportunite',
  templateUrl: './show-opportunite.component.html',
  styleUrls: ['./show-opportunite.component.css']
})
export class ShowOpportuniteComponent implements OnInit {

  // URL du serveur de stockage
  storageUrl = environment.storageUrl;

  role: string;
  idUtilisateur: number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Opportunite,
              public dialog: MatDialog,
              private utilService: UtilService,
              private opportunitesFavorisService: OpportunitesFavorisService) { }

  ngOnInit() {
    // je récupère le rôle pour la restriction d'accès dans le menu
    this.role = this.utilService.getRoleUtilisateurFromToken();
    this.idUtilisateur = this.utilService.getIdUtilisateurFromToken();
  }

  addOpportuniteToFavorite(idUtilisateur, idOpportunite, titreOpportunite) {

    console.log(idUtilisateur);
    console.log(idOpportunite);
    console.log(titreOpportunite);

    const opportuniteFavorite = new OpportunitesFavoris();
    opportuniteFavorite.idUtilisateur = idUtilisateur;
    opportuniteFavorite.idOpportunite = idOpportunite;
    opportuniteFavorite.titreOpportunite = titreOpportunite;

    this.opportunitesFavorisService.addOpportuniteToFavorisToUtilisateurService(opportuniteFavorite)
    .subscribe
      (
      res => { }
      );
  }

  // Ouvre le pop-up pour afficher un partenaire
  openDialogShowPartenaire(id, identite, telephone, email, posteOccupe, descriptionDetaillee, urlPhoto, username, password, etatPartenaire, entreprise): void {
      // Objet pour configurer la modale
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.hasBackdrop = true;
      dialogConfig.closeOnNavigation = true;

      // Objet pour déclencher l'ouverture de la modale
      const dialogRef = this.dialog.open(ShowPartenaireComponent, {
        width: '850px',
        height: '650px',
        data: {
          id,
          identite,
          telephone,
          email,
          posteOccupe,
          descriptionDetaillee,
          urlPhoto,
          username,
          password,
          etatPartenaire,
          entreprise
        }
      });
  }

}
