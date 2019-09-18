import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { TechnologiesService } from '../../../@Services/technologies.service';
import { Technologie } from '../../../@Models/technologie';

@Component({
  selector: 'app-liste-technologies-for-search',
  templateUrl: './liste-technologies-for-search.component.html',
  styleUrls: ['./liste-technologies-for-search.component.css']
})
export class ListeTechnologiesForSearchComponent implements OnInit {

  // Envoi l'event pour mettre à jour la table
  @Output() listeTechnologiesForSearchEvent = new EventEmitter<Event>();

  // Remplissage de la liste par défaut
  listeTechnologies: Technologie[] = [];

  constructor(
    private technologiesService: TechnologiesService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.getAllTechnologiesController();
  }


  // Remplir la liste par toutes les technologies
  getAllTechnologiesController(): void {
    this.technologiesService.getAllTechnologiesService()
    .subscribe
      (
      res => { this.listeTechnologies = res; }
      );
  }

  // On emet un Event au parent à chaque changement de la liste (Select / deSelect)
  onListeTechnologieChange($event) {
    this.listeTechnologiesForSearchEvent.emit($event);
  }

}
