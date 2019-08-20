import { Component, OnInit, ViewChild } from '@angular/core';

import { DatagridTechnologiesComponent } from '../../@Components/technologies/datagrid-technologies/datagrid-technologies.component';


@Component({
  selector: 'app-technologies',
  templateUrl: './technologies.component.html'
})

export class TechnologiesComponent implements OnInit {

  @ViewChild(DatagridTechnologiesComponent, {static: false}) Datagrid: DatagridTechnologiesComponent;

  constructor() {}

  //Afin de rafraichir la table quand on ajoute une technologie
  onRefreshTableEvent($event) 
  {
    this.Datagrid.getAllTechnologiesController();
  }

  ngOnInit() {
  }

}