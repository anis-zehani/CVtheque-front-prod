import { Component, OnInit , ViewChild} from '@angular/core';
import { DatagridPartenairesComponent } from '../../@Components/partenaires/datagrid-partenaires/datagrid-partenaires.component';

@Component({
  selector: 'app-partenaires',
  templateUrl: './partenaires.component.html',
  styleUrls: ['./partenaires.component.css'],
})

export class PartenairesComponent implements OnInit {

  //Afin d'appeler la fonction de Refrech Table chez le fils
  @ViewChild(DatagridPartenairesComponent, {static: false}) Datagrid: DatagridPartenairesComponent;

  constructor() {}

  ngOnInit() {}

  //Afin de rafraichir la table quand on ajoute un Partenaire
  onRefreshTableEvent($event) 
  {
    this.Datagrid.getAllPartenairesController(this.Datagrid.etatPartenaire);
  }

}

