import { Component, OnInit } from '@angular/core';
import { UtilService } from '../../@Util/util.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html'
})
export class AccueilComponent implements OnInit {

  role: string;
  constructor(private utilService: UtilService) {}

  ngOnInit() {
    // je récupère le rôle pour la restriction d'accès dans le menu
    this.role = this.utilService.getRoleUtilisateurFromToken();
  }

}
