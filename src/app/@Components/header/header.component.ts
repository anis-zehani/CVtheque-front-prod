import { Component, OnInit } from '@angular/core';
import * as jwt_decode from 'jwt-decode';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  id: string;
  identite: string;
  role: string;

  constructor() {}

  ngOnInit() {

    // je récupère le token à partir de la session : le token contient les claims
    // les claims contiennent : id, identite, role
    const decodedToken = jwt_decode(sessionStorage.getItem('token'));

    // je récupère l'id pour l'envoyer dans les requêtes REST
    this.id = decodedToken.id;

    // je récupère l'identité pour l'afficher dans le menu
    this.identite = decodedToken.identite;

    // je récupère le rôle pour la restriction d'accès dans le menu
    this.role = decodedToken.role;
  }

}
