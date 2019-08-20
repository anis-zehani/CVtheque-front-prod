import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

import { Technologie } from '../../../@Models/technologie';

@Component({
  selector: 'app-form-edit-technologies',
  templateUrl: './form-edit-technologies.component.html'
})
export class FormEditTechnologiesComponent implements OnInit {

  technologie : Technologie;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Technologie) 
  {
    this.technologie = new Technologie(null,null,null);
  }

  ngOnInit() {
  }

}
