import { Component, OnInit } from '@angular/core';
import { UtilisateurService } from '../../../@Services/utilisateur.service';
import { Candidat } from 'src/app/@Models/candidat';
import { UtilService } from 'src/app/@Util/util.service';

@Component({
  selector: 'app-liste-top-candidats',
  templateUrl: './liste-top-candidats.component.html',
  styleUrls: ['./liste-top-candidats.component.css']
})
export class ListeTopCandidatsComponent implements OnInit {

  constructor(private utilisateurService: UtilisateurService, private utilService: UtilService) { }

  // Remplissage de la liste par défaut
  listeCandidats: Candidat[] = [];
  idUtilisateur: number;

  ngOnInit() {
    // je récupère idUtilisateur pour faire l'appel au WS avec le bon id Utilisateur
    this.idUtilisateur = this.utilService.getIdUtilisateurFromToken();
    this.getAllCandidatsFavorisController(this.idUtilisateur);
  }

  // Remplir la liste par tous les candidats
  getAllCandidatsFavorisController(idUtilisateur): void {
    this.utilisateurService.getAllCandidatsFavorisForUtilisateurService(idUtilisateur)
    .subscribe
      (
      res => { this.listeCandidats = res; }
      );
  }

}
