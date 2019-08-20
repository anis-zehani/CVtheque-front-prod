import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { MatDialog,MatDialogConfig } from '@angular/material/dialog';

import { TechnologiesService } from '../../../@Services/technologies.service';
import { Technologie } from '../../../@Models/technologie';
import { DialogAddTechnologiesComponent } from '../../../@Components/technologies/dialog-add-technologies/dialog-add-technologies.component';

@Component({
  selector: 'app-liste-technologies-for-add',
  templateUrl: './liste-technologies-for-add.component.html',
  styleUrls: ['./liste-technologies-for-add.component.css']
})
export class ListeTechnologiesForAddComponent implements OnInit {

  //Envoi l'event pour mettre à jour la table
  @Output() listeTechnologiesEvent = new EventEmitter<Event>();

  //Remplissage de la liste par défaut
  listeTechnologies: Technologie[]=[];

  constructor(
    private technologiesService: TechnologiesService,    
    public dialog: MatDialog) { }

  ngOnInit() {
    this.getAllTechnologiesController();
  }


  //Remplir la liste par toutes les technologies
  getAllTechnologiesController(): void {
    this.technologiesService.getAllTechnologiesService()
    .subscribe
      (
      res => { this.listeTechnologies = res;}
      )
  }

  //On emet un Event au parent à chaque changement de la liste (ajout et suppression)
  onListeTechnologieChange($event){
    this.listeTechnologiesEvent.emit($event);
  }

  //Ouvre le pop-up pour ajouter une technologie
  openDialog(): void {
    //Objet pour configurer la modale
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.hasBackdrop=true;
    dialogConfig.closeOnNavigation = true;

    //Objet pour déclencher l'ouverture de la modale
    const dialogRef = this.dialog.open(DialogAddTechnologiesComponent, {
      width: '400px',
      height: '500px'
    });

    //Fonction qui s'éxècute quand je ferme la modale
    dialogRef.afterClosed().subscribe(result => {
      //On refresh la liste déroulante aprés ajout de la technologie
      this.getAllTechnologiesController();
    });
  }
}
