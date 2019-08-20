import { Component, OnInit, Output, EventEmitter} from '@angular/core';

import { OpportunitesService } from '../../../@Services/opportunites.service';
import { Opportunite } from '../../../@Models/opportunite';

@Component({
  selector: 'app-liste-opportunites-for-add',
  templateUrl: './liste-opportunites-for-add.component.html',
  styleUrls: ['./liste-opportunites-for-add.component.css']
})
export class ListeOpportunitesForAddComponent implements OnInit {

  //Envoi l'event pour mettre à jour la table
  @Output() listeOpportunitesEvent = new EventEmitter<Event>();

  //Remplissage de la liste par défaut
  listeOpportunites: Opportunite[];

  constructor(private opportunitesService: OpportunitesService) {}

  ngOnInit() {
    this.getAllOpportunitesController("True");
  }


  //Remplir la liste par toutes les opportunites
  getAllOpportunitesController(etat): void {
    this.opportunitesService.getAllOpportunitesService(etat)
    .subscribe
      (
      res => { this.listeOpportunites = res;}
      )
  }

  //On emet un Event au parent à chaque changement de la liste (ajout et suppression)
  onListeOpportunitesChange($event){
    this.listeOpportunitesEvent.emit($event);
  }
}
