import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { environment } from '../../../../environments/environment';

import { Opportunite } from 'src/app/@Models/opportunite';
import { ShowPartenaireComponent } from '../../../@Components/partenaires/show-partenaire/show-partenaire.component';

@Component({
  selector: 'app-show-opportunite',
  templateUrl: './show-opportunite.component.html',
  styleUrls: ['./show-opportunite.component.css']
})
export class ShowOpportuniteComponent implements OnInit {

  //URL du serveur de stockage
  storageUrl = environment.storageUrl;
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: Opportunite, public dialog: MatDialog) { }

  ngOnInit() {
  }

  //Ouvre le pop-up pour afficher un partenaire
  openDialogShowPartenaire(id, identite, telephone, email, posteOccupe, descriptionDetaillee, urlPhoto, login, password, etatPartenaire, entreprise): void {
      //Objet pour configurer la modale
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.hasBackdrop=true;
      dialogConfig.closeOnNavigation = true;
  
      //Objet pour déclencher l'ouverture de la modale
      const dialogRef = this.dialog.open(ShowPartenaireComponent, {
        width: '850px',
        height: '650px',
        data: {
          id: id, 
          identite: identite,
          telephone : telephone,
          email : email,
          posteOccupe : posteOccupe,
          descriptionDetaillee : descriptionDetaillee,
          urlPhoto : urlPhoto,
          login : login,
          password : password,
          etatPartenaire : etatPartenaire,
          entreprise : entreprise
        }
      });
  }

}
