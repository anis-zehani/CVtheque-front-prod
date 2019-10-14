import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { TechnologiesService } from '../../../@Services/technologies.service';
import { Technologie } from '../../../@Models/technologie';
import { SharedDataService } from '../../../@Services/shared-data.service';
import { DialogAddTechnologiesComponent } from '../../../@Components/technologies/dialog-add-technologies/dialog-add-technologies.component';

@Component({
  selector: 'app-liste-technologies-for-edit',
  templateUrl: './liste-technologies-for-edit.component.html',
  styleUrls: ['./liste-technologies-for-edit.component.css']
})
export class ListeTechnologiesForEditComponent implements OnInit {

  // Envoi l'event pour mettre à jour la table
  @Output() listeTechnologiesEvent = new EventEmitter<Event>();

  // Remplissage de la liste par défaut
  listeTechnologies: Technologie[] = [];

  // Les options selectionnées par l'utilisateur
  @Input() selectedOptionsTechnologie: Technologie[];

  constructor(
     private technologiesService: TechnologiesService,
     private sharedService: SharedDataService,
     public dialog: MatDialog) { }

  ngOnInit() {
    this.getAllTechnologiesController();
  }


  // Remplir la liste par toutes les technologies
  getAllTechnologiesController(): void {
    this.technologiesService.getAllTechnologiesService()
    .subscribe
      (
      res => {
        this.listeTechnologies = res;
        // Utile pour la comparaison et affichage de la différence entre les deux listes
        if (this.selectedOptionsTechnologie) {
          // Je dois faire la différence entre 2 Arrays

          for (const i in this.selectedOptionsTechnologie)
          {
            for (const j in this.listeTechnologies) {

              if (this.selectedOptionsTechnologie[i].id === this.listeTechnologies[j].id) {
                this.listeTechnologies[j].selected = true;
                break;
              }
            }
          }
        }
        // Penser à faire le tri selon ce qui est selectionné en avant
      }
      );
  }


  // On récupére la nouvelle liste à chaque changement puis on l'envoi via le service partagé à l'écran
  // datagrid-candidat qui exécute la fonction de fermeture pop-up, donc il récupère les bonnes
  // valeurs du formulaire
  onSelectionChange($event) {
    if ($event) {
      this.sharedService.changeListeTechnologieIsModified(true);
      this.sharedService.changeListeTechnologie($event);
    }
  }


  // Ouvre le pop-up pour ajouter une technologie
  openDialog(): void {
    // Objet pour configurer la modale
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.hasBackdrop = true;
    dialogConfig.closeOnNavigation = true;

    // Objet pour déclencher l'ouverture de la modale
    const dialogRef = this.dialog.open(DialogAddTechnologiesComponent, {
      width: '400px',
      height: '500px'
    });

    // Fonction qui s'éxècute quand je ferme la modale
    dialogRef.afterClosed().subscribe(result => {
      // On refresh la liste déroulante aprés ajout de la technologie
      this.getAllTechnologiesController();
    });
  }
}

