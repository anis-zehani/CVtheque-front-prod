import { Component, OnInit } from '@angular/core';
import { CandidatsService } from '../../../@Services/candidats.service';
import { UtilService } from '../../../@Util/util.service';
import { environment } from '../../../../environments/environment';
import { Candidat } from 'src/app/@Models/candidat';

@Component({
  selector: 'app-account-candidat',
  templateUrl: './account-candidat.component.html',
  styleUrls: ['./account-candidat.component.css']
})
export class AccountCandidatComponent implements OnInit {

  // URL du serveur de stockage
  storageUrl = environment.storageUrl;

  id: number;
  candidat: Candidat;

  constructor(private candidatsService: CandidatsService, private utilService: UtilService) { }

  ngOnInit() {
    // je récupère le id
    this.id = this.utilService.getIdUtilisateurFromToken();
    this.getOneCandidatsController(this.id);
  }

  // Afficher le Candidat
  getOneCandidatsController(id): void {
    this.candidatsService.getOneCandidatService(this.id)
    .subscribe
      (
      data => {
        this.candidat = data;
      }
      );
  }

}
