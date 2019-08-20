import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

import { Collaborateur } from 'src/app/@Models/collaborateur';
@Component({
  selector: 'app-form-edit-collaborateurs',
  templateUrl: './form-edit-collaborateurs.component.html'
})
export class FormEditCollaborateursComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Collaborateur) { }

  ngOnInit() {
  }

}
