import { Component, OnInit, Inject } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { MAT_DIALOG_DATA } from '@angular/material';

import { Rappel } from 'src/app/@Models/rappel';

@Component({
  selector: 'app-form-show-rappels',
  templateUrl: './form-show-rappels.component.html',
  styleUrls: ['./form-show-rappels.component.css']
})
export class FormShowRappelsComponent implements OnInit {

  // URL du serveur de stockage
  storageUrl = environment.storageUrl;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Rappel) { }

  ngOnInit() {
  }

}
