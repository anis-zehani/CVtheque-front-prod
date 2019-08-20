import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

import { Opportunite } from '../../../@Models/opportunite';
import { Partenaire } from 'src/app/@Models/partenaire';

@Component({
  selector: 'app-form-edit-opportunites',
  templateUrl: './form-edit-opportunites.component.html',
  styleUrls: ['./form-edit-opportunites.component.css']
})
export class FormEditOpportunitesComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
  }

  //Parent intercepte l'event envoyé par son fils : <app-liste-partenaires> qui génére un EventEmitter
  partenaireIdEventListner($event){
    //Mise à jour de l'objet data de la view

    if(this.data.responsableOpportunite === null)
    {
      let partenaire = new Partenaire();
      partenaire.id=$event;
      this.data.responsableOpportunite=partenaire;
    }
    else
    {
      this.data.responsableOpportunite.id=$event;
    }
  }
}
