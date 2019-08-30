import { Component, OnInit } from '@angular/core';

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

    // je récupère l'id pour l'envoyer dans les requêtes REST
    this.id = sessionStorage.getItem('id');

    // je récupère l'identité pour l'afficher dans le menu
    this.identite = sessionStorage.getItem('identite');

    // je récupère le rôle pour la restriction d'accès dans le menu
    this.role = sessionStorage.getItem('role');
  }

}
