import { Component, OnInit, ViewChild } from '@angular/core';

import { UtilService } from '../../@Util/util.service';
import { DatagridCertificationsComponent } from '../../@Components/certifications/datagrid-certifications/datagrid-certifications.component';


@Component({
  selector: 'app-certifications',
  templateUrl: './certifications.component.html'
})

export class CertificationsComponent implements OnInit {

  @ViewChild(DatagridCertificationsComponent, {static: false}) Datagrid: DatagridCertificationsComponent;

  role: string;

  constructor(private utilService: UtilService) {}

  // Afin de rafraichir la table quand on ajoute une certification
  onRefreshTableEvent($event) {
    this.Datagrid.getAllCertificationsController();
  }

  ngOnInit() {
    // je récupère le rôle pour la restriction d'accès dans le menu
    this.role = this.utilService.getRoleUtilisateurFromToken();
  }

}
