import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

import { OpportunitesService } from '../../../@Services/opportunites.service';
import { Opportunite } from '../../../@Models/opportunite';
import { SharedDataService } from '../../../@Services/shared-data.service';

@Component({
  selector: 'app-liste-opportunites-for-edit',
  templateUrl: './liste-opportunites-for-edit.component.html',
  styleUrls: ['./liste-opportunites-for-edit.component.css']
})
export class ListeOpportunitesForEditComponent implements OnInit {

  // Envoi l'event pour mettre à jour la table
  @Output() listeOpportunitesEvent = new EventEmitter<Event>();

  // Remplissage de la liste par défaut
  listeOpportunites: Opportunite[];

  // Les options selectionnées par l'utilisateur
  @Input() selectedOptionsOpportunite: Opportunite[];

  constructor(private opportunitesService: OpportunitesService, private sharedService: SharedDataService) {}

  ngOnInit() {
    this.getAllOpportunitesController('True');
  }


  // Remplir la liste par toutes les opportunites
  getAllOpportunitesController(etat): void {
    this.opportunitesService.getAllOpportunitesService(etat)
    .subscribe
      (
      res => {
        this.listeOpportunites = res;
        // Utile pour la comparaison et affichage de la différence entre les deux listes
        if (this.selectedOptionsOpportunite) {
          // Je dois faire la différence entre 2 Arrays

          for (const i in this.selectedOptionsOpportunite)
          {
            for (const j in this.listeOpportunites) {

              if (this.selectedOptionsOpportunite[i].id === this.listeOpportunites[j].id) {
                this.listeOpportunites[j].selected = true;
                break;
              }
            }
          }
        }
        // Penser à faire le tri selon ce qui selectionné en avant
      }
      );
  }


  // On récupére la nouvelle liste à chaque changement puis on l'envoi via le service partagé à l'écran
  // datagrid-candidat qui exécute la fonction de fermeture pop-up, donc il récupère les bonnes
  // valeurs du formulaire
  onSelectionChange($event) {
    if ($event) {
      this.sharedService.changeListeOpportuniteIsModified(true);
      this.sharedService.changeListeOpportunite($event);
    }
  }
}

