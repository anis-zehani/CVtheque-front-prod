import { Component, Input, OnInit } from '@angular/core';

import { CandidatsService } from '../../../@Services/candidats.service';
import { Candidat } from '../../../@Models/candidat';
import { SharedDataService } from '../../../@Services/shared-data.service';

@Component({
  selector: 'app-liste-candidats-for-edit',
  templateUrl: './liste-candidats-for-edit.component.html',
  styleUrls: ['./liste-candidats-for-edit.component.css']
})
export class ListeCandidatsForEditComponent implements OnInit {

  // Remplissage de la liste par défaut
  listeCandidats: Candidat[] = [];

  // Les options selectionnées par l'utilisateur
  @Input() selectedOptionsCandidat: Candidat[];
  @Input() idOpportunite: number;

  constructor(
     private candidatsService: CandidatsService,
     private sharedService: SharedDataService) { }

  ngOnInit() {
    this.getAllCandidatsByOpportuniteController(this.idOpportunite);
    this.getAllCandidatsController();
  }

  // Récupère la liste des candidats liés à une opportunité
  getAllCandidatsByOpportuniteController(idOpportunite): void {
    this.candidatsService.getAllCandidatsByOpportuniteService(idOpportunite)
    .subscribe
      (
      res => {
        this.selectedOptionsCandidat = res;
      }
      );
  }


  // Remplir la liste par tous les candidats
  getAllCandidatsController(): void {
    this.candidatsService.getAllCandidatsService('True')
    .subscribe
      (
      res => {
        this.listeCandidats = res;
        // Utile pour la comparaison et affichage de la différence entre les deux listes
        if (this.selectedOptionsCandidat) {
          // Je dois faire la différence entre 2 Arrays

          for (const i in this.selectedOptionsCandidat) {
            for (const j in this.listeCandidats) {

              if (this.selectedOptionsCandidat[i].id === this.listeCandidats[j].id) {
                this.listeCandidats[j].selected = true;
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
  onListeCandidatChange($event) {
    if ($event) {
      this.sharedService.changeListeCandidatIsModified(true);
      this.sharedService.changeListeCandidat($event);
    }
  }
}

