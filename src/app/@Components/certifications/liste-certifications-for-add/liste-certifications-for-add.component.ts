import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { MatDialog,MatDialogConfig } from '@angular/material/dialog';

import { CertificationsService } from '../../../@Services/certifications.service';
import { Certification } from '../../../@Models/certification';
import { DialogAddCertificationsComponent } from '../../../@Components/certifications/dialog-add-certifications/dialog-add-certifications.component';

@Component({
  selector: 'app-liste-certifications-for-add',
  templateUrl: './liste-certifications-for-add.component.html',
  styleUrls: ['./liste-certifications-for-add.component.css']
})
export class ListeCertificationsForAddComponent implements OnInit {

  //Envoi l'event pour mettre à jour la table
  @Output() listeCertificationsEvent = new EventEmitter<Event>();

  //Remplissage de la liste par défaut
  listeCertifications: Certification[];

  constructor(
    private certificationsService: CertificationsService, 
    public dialog: MatDialog) {}

  ngOnInit() {
    this.getAllCertificationsController();
  }


  //Remplir la liste par toutes les certifications
  getAllCertificationsController(): void {
    this.certificationsService.getAllCertificationsService()
    .subscribe
      (
      res => { this.listeCertifications = res;}
      )
  }

  //On emet un Event au parent à chaque changement de la liste (ajout et suppression)
  onListeCertificationChange($event){
    this.listeCertificationsEvent.emit($event);
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
