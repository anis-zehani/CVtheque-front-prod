import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

import { Ecole } from '../../../@Models/ecole';

@Component({
  selector: 'app-form-edit-ecoles',
  templateUrl: './form-edit-ecoles.component.html'
})
export class FormEditEcolesComponent implements OnInit {

  ecole : Ecole;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Ecole) 
  {
    this.ecole = new Ecole();
  }

  ngOnInit() {
  }

}
