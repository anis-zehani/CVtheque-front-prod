import { Component, OnInit, ViewChild } from '@angular/core';
import { DatagridEntreprisesComponent } from '../../@Components/entreprises/datagrid-entreprises/datagrid-entreprises.component';

@Component({
  selector: 'app-entreprises',
  templateUrl: './entreprises.component.html'
})

export class EntreprisesComponent implements OnInit {

  @ViewChild(DatagridEntreprisesComponent, {static: false}) Datagrid: DatagridEntreprisesComponent;

  constructor() {}

  //Afin de rafraichir la table quand on ajoute une entreprise
  onRefreshTableEvent(agreed: boolean) 
  {
    this.Datagrid.getAllEntreprisesController();
  }

  ngOnInit() {
  }

}