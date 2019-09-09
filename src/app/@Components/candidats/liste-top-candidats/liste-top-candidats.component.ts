import { Component, OnInit } from '@angular/core';

import { CandidatsFavorisService } from '../../../@Services/candidats-favoris.service';
import { UtilService } from 'src/app/@Util/util.service';
import { CandidatsFavoris } from 'src/app/@Models/candidats-favoris';

@Component({
  selector: 'app-liste-top-candidats',
  templateUrl: './liste-top-candidats.component.html',
  styleUrls: ['./liste-top-candidats.component.css']
})
export class ListeTopCandidatsComponent implements OnInit {

  constructor(private candidatsFavorisService: CandidatsFavorisService, private utilService: UtilService) { }

  // Remplissage de la liste par défaut
  listeCandidatsFavoris: CandidatsFavoris[] = [];
  idUtilisateur: number;

  ngOnInit() {
    // je récupère idUtilisateur pour faire l'appel au WS avec le bon id Utilisateur
    this.idUtilisateur = this.utilService.getIdUtilisateurFromToken();
    this.getAllCandidatsFavorisController(this.idUtilisateur);
  }

  // Remplir la liste par tous les candidats
  getAllCandidatsFavorisController(idUtilisateur): void {
    this.candidatsFavorisService.getAllCandidatsFavorisForUtilisateurService(idUtilisateur)
    .subscribe
      (
      res => { this.listeCandidatsFavoris = res; }
      );
  }

}
