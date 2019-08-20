import { Component, OnInit, ViewChild } from '@angular/core';
import { DatagridEcolesComponent } from '../../@Components/ecoles/datagrid-ecoles/datagrid-ecoles.component';

@Component({
  selector: 'app-ecoles',
  templateUrl: './ecoles.component.html'
})

export class EcolesComponent implements OnInit {

  @ViewChild(DatagridEcolesComponent, {static: false}) Datagrid: DatagridEcolesComponent;

  constructor() {}

  //Afin de rafraichir la table quand on ajoute une ecole
  onRefreshTableEvent($event) 
  {
    this.Datagrid.getAllEcolesController();
  }

  ngOnInit() {
  }

}