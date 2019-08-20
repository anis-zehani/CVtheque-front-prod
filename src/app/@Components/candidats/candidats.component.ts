import { Component, OnInit , ViewChild} from '@angular/core';
import { DatagridCandidatsComponent } from '../../@Components/candidats/datagrid-candidats/datagrid-candidats.component';
import { Technologie } from 'src/app/@Models/technologie';


@Component({
  selector: 'app-candidats',
  templateUrl: './candidats.component.html',
  styleUrls: ['./candidats.component.css'],
})

export class CandidatsComponent implements OnInit {

  //Afin d'appeler la fonction de Refrech Table chez le fils
  @ViewChild(DatagridCandidatsComponent, {static: false}) Datagrid: DatagridCandidatsComponent;

  listeTechnologies : Technologie[];

  constructor() {}

  ngOnInit() {}

  //Afin de rafraichir la table quand on ajoute un Candidat
  onRefreshTableEvent($event) 
  {
    this.Datagrid.getAllCandidatsController(this.Datagrid.etatCandidat);
  }

  //Afin de récupérer la liste des candidats par recherche via liste de technologies
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
      this.Datagrid.getAllCandidatsByListTechnologiesController(this.listeTechnologies);
    }
    else
    {
      this.Datagrid.getAllCandidatsController(this.Datagrid.etatCandidat);
    }
    
  }

}

