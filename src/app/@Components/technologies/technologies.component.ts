import { Component, OnInit, ViewChild } from '@angular/core';

import { UtilService } from '../../@Util/util.service';
import { DatagridTechnologiesComponent } from '../../@Components/technologies/datagrid-technologies/datagrid-technologies.component';


@Component({
  selector: 'app-technologies',
  templateUrl: './technologies.component.html'
})

export class TechnologiesComponent implements OnInit {

  @ViewChild(DatagridTechnologiesComponent, {static: false}) Datagrid: DatagridTechnologiesComponent;

  role: string;

  constructor(private utilService: UtilService) {}

  // Afin de rafraichir la table quand on ajoute une technologie
  onRefreshTableEvent($event) {
    this.Datagrid.getAllTechnologiesController();
  }

  ngOnInit() {
    // je récupère le rôle pour la restriction d'accès dans le menu
    this.role = this.utilService.getRoleUtilisateurFromToken();
  }

}
