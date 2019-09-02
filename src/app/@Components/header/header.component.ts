import { Component, OnInit } from '@angular/core';
import { UtilService } from '../../@Util/util.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  identite: string;
  role: string;

  constructor(private utilService: UtilService) {}

  ngOnInit() {

    // je récupère l'identité pour l'afficher dans le menu
    this.identite = this.utilService.getIdentiteUtilisateurFromToken();

    // je récupère le rôle pour la restriction d'accès dans le menu
    this.role = this.utilService.getRoleUtilisateurFromToken();
  }

}
