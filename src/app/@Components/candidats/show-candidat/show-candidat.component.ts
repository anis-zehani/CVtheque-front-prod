import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

import { CandidatsFavorisService } from '../../../@Services/candidats-favoris.service';
import { UtilService } from 'src/app/@Util/util.service';
import { environment } from '../../../../environments/environment';
import { Candidat } from '../../../@Models/candidat';
import { CandidatsFavoris } from 'src/app/@Models/candidats-favoris';

@Component({
  selector: 'app-show-candidat',
  templateUrl: './show-candidat.component.html',
  styleUrls: ['./show-candidat.component.css']
})
export class ShowCandidatComponent implements OnInit {

  // URL du serveur de stockage
  storageUrl = environment.storageUrl;
  idUtilisateur: number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Candidat,
              private utilService: UtilService,
              private candidatsFavorisService: CandidatsFavorisService) { }

  ngOnInit() {
    // je récupère idUtilisateur pour faire l'appel au WS avec le bon id Utilisateur
    this.idUtilisateur = this.utilService.getIdUtilisateurFromToken();
  }

  addCandidatToFavorite(idUtilisateur, idCandidat, identiteCandidat) {

    console.log(idUtilisateur);
    console.log(idCandidat);
    console.log(identiteCandidat);

    const candidatFavori = new CandidatsFavoris();
    candidatFavori.idUtilisateur = idUtilisateur;
    candidatFavori.idCandidat = idCandidat;
    candidatFavori.identiteCandidat = identiteCandidat;

    this.candidatsFavorisService.addCandidatToFavorisToUtilisateurService(candidatFavori)
    .subscribe
      (
      res => { }
      );
  }

}
