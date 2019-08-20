import { Component, OnInit, ViewChild } from '@angular/core';

import { DatagridCollaborateursComponent } from './datagrid-collaborateurs/datagrid-collaborateurs.component';

@Component({
  selector: 'app-collaborateurs',
  templateUrl: './collaborateurs.component.html',
  styleUrls: ['./collaborateurs.component.css']
})

export class CollaborateursComponent implements OnInit {

  @ViewChild(DatagridCollaborateursComponent, {static: false}) Datagrid: DatagridCollaborateursComponent;

  constructor() {}

  ngOnInit(){
  }

   //Afin de rafraichir la table quand on ajoute une technologie
   onRefreshTableEvent($event) 
   {
     this.Datagrid.getAllCollaborateursController();
   }
}
