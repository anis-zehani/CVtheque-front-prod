import { Component, OnInit } from '@angular/core';

import { UtilisateurService } from '../../../@Services/utilisateur.service';
import { OpportunitesService } from '../../../@Services/opportunites.service';
import { UtilService } from 'src/app/@Util/util.service';
import { Opportunite } from 'src/app/@Models/opportunite';

@Component({
  selector: 'app-liste-top-opportunites',
  templateUrl: './liste-top-opportunites.component.html',
  styleUrls: ['./liste-top-opportunites.component.css']
})
export class ListeTopOpportunitesComponent implements OnInit {

  constructor(private opportunitesService: OpportunitesService, private utilService: UtilService) { }

  // Remplissage de la liste par défaut
  listeOpportunites: Opportunite[] = [];
  idUtilisateur: number;

  ngOnInit() {
    // je récupère idUtilisateur pour faire l'appel au WS avec le bon id Utilisateur
    this.idUtilisateur = this.utilService.getIdUtilisateurFromToken();
    this.getAllOpportunitesFavorisController(this.idUtilisateur);
  }

  // Remplir la liste par toutes les opportunités
  getAllOpportunitesFavorisController(idUtilisateur): void {
    this.opportunitesService.getAllOpportunitesFavorisForUtilisateurService(idUtilisateur)
    .subscribe
      (
      res => { this.listeOpportunites = res; }
      );
  }

}
