import { Component, OnInit, ViewChild } from '@angular/core';
import { DatagridCertificationsComponent } from '../../@Components/certifications/datagrid-certifications/datagrid-certifications.component';


@Component({
  selector: 'app-certifications',
  templateUrl: './certifications.component.html'
})

export class CertificationsComponent implements OnInit {

  @ViewChild(DatagridCertificationsComponent, {static: false}) Datagrid: DatagridCertificationsComponent;

  constructor() {}

  //Afin de rafraichir la table quand on ajoute une certification
  onRefreshTableEvent($event) 
  {
    this.Datagrid.getAllCertificationsController();
  }

  ngOnInit() {
  }

}