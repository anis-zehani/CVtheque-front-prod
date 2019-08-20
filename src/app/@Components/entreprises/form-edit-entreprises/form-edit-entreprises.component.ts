import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

import { Entreprise } from '../../../@Models/entreprise';

@Component({
  selector: 'app-form-edit-entreprises',
  templateUrl: './form-edit-entreprises.component.html'
})
export class FormEditEntreprisesComponent implements OnInit {

  entreprise : Entreprise;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Entreprise) 
  {
    this.entreprise = new Entreprise(null, null, null);
  }

  ngOnInit() {
  }

}
