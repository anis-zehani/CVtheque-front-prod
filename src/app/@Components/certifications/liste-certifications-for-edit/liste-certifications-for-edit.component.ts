import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { MatDialog,MatDialogConfig } from '@angular/material/dialog';

import { CertificationsService } from '../../../@Services/certifications.service';
import { Certification } from '../../../@Models/certification';
import { SharedDataService } from '../../../@Services/shared-data.service';
import { DialogAddCertificationsComponent } from '../../../@Components/certifications/dialog-add-certifications/dialog-add-certifications.component';

@Component({
  selector: 'app-liste-certifications-for-edit',
  templateUrl: './liste-certifications-for-edit.component.html',
  styleUrls: ['./liste-certifications-for-edit.component.css']
})
export class ListeCertificationsForEditComponent implements OnInit {

  //Envoi l'event pour mettre à jour la table
  @Output() listeCertificationsEvent = new EventEmitter<Event>();

  //Remplissage de la liste par défaut
  listeCertifications: Certification[]; 
  
  //Les options selectionnées par l'utilisateur
  @Input() selectedOptionsCertification: Certification[];

  constructor(
    private certificationsService: CertificationsService, 
    private sharedService: SharedDataService,
    public dialog: MatDialog) {}

  ngOnInit() {
    this.getAllCertificationsController();
  }


  //Remplir la liste par toutes les certifications
  getAllCertificationsController(): void {
    this.certificationsService.getAllCertificationsService()
    .subscribe
      (
      res => 
      { 
        this.listeCertifications = res;
        //Utile pour la comparaison et affichage de la différence entre les deux listes
        if(this.selectedOptionsCertification)
        {
          //Je dois faire la différence entre 2 Arrays

          for(let i in this.selectedOptionsCertification) 
          {
            for(let j in this.listeCertifications) 
            {
              
              if(this.selectedOptionsCertification[i].id === this.listeCertifications[j].id)
              {
                this.listeCertifications[j].selected = true;
                break;
              }
            }
          }
        }
        //Penser à faire le tri selon ce qui selectionné en avant
      }
      )
  } 

  //On récupére la nouvelle liste à chaque changement puis on l'envoi via le service partagé à l'écran
  //datagrid-candidat qui exécute la fonction de fermeture pop-up, donc il récupère les bonnes
  //valeurs du formulaire
  onSelectionChange($event){
    if($event)
    {
      this.sharedService.changeListeCertificationIsModified(true);
      this.sharedService.changeListeCertification($event);
    }
  }

  //Ouvre le pop-up pour ajouter une certification
  openDialogCertification(): void {
    //Objet pour configurer la modale
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.hasBackdrop=true;
    dialogConfig.closeOnNavigation = true;

    //Objet pour déclencher l'ouverture de la modale
    const dialogRef = this.dialog.open(DialogAddCertificationsComponent, {
      width: '400px',
      height: '500px'
    });

    //Fonction qui s'éxècute quand je ferme la modale
    dialogRef.afterClosed().subscribe(result => {
      //On refresh la liste déroulante aprés ajout de la certification
      this.getAllCertificationsController();
    });
  }
}

