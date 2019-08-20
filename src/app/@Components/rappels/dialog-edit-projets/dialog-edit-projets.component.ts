import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

import { Projet } from '../../../@Models/projet';

@Component({
  selector: 'app-dialog-edit-projets',
  templateUrl: './dialog-edit-projets.component.html'
})
export class DialogEditProjetsComponent implements OnInit {

  projet : Projet;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Projet) 
  {
    this.projet = new Projet();
  }

  ngOnInit() {
  }

}
