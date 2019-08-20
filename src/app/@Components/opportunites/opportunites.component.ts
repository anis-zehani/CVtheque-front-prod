import { Component, OnInit , ViewChild} from '@angular/core';
import { DatagridOpportunitesComponent } from '../../@Components/opportunites/datagrid-opportunites/datagrid-opportunites.component';
import { Technologie } from 'src/app/@Models/technologie';


@Component({
  selector: 'app-opportunites',
  templateUrl: './opportunites.component.html',
  styleUrls: ['./opportunites.component.css'],
})

export class OpportunitesComponent implements OnInit {

  //Afin d'appeler la fonction de Refrech Table chez le fils
  @ViewChild(DatagridOpportunitesComponent, {static: false}) Datagrid: DatagridOpportunitesComponent;

  listeTechnologies : Technologie[];
  listeTechnologiesFinale: Technologie[] = [];

  constructor() {}

  ngOnInit() {}

  //Afin de rafraichir la table quand on ajoute un Opportunite
  onRefreshTableEvent($event) 
  {
    this.Datagrid.getAllOpportunitesController(this.Datagrid.etatOpportunite);
  }

  //Afin de récupérer la liste des opportunités par recherche via liste de technologies
  onListeTechnologiesForSearchEvent($event)
  {
    
    let listeTechnologiesFinale: Technologie[] = [];

    for(let i=0;i<$event.length;i++)
    {
      listeTechnologiesFinale.push($event[i]._value.id);
    }
    this.listeTechnologies = listeTechnologiesFinale;


    if(this.listeTechnologies.length >0 )
    {
      this.Datagrid.getAllOpportunitesByListTechnologiesController(this.listeTechnologies);
    }
    else
    {
      this.Datagrid.getAllOpportunitesController(this.Datagrid.etatOpportunite);
    }
    
  }


}

