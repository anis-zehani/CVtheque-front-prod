import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

import { environment } from '../../../../environments/environment';
import { Candidat } from '../../../@Models/candidat';

@Component({
  selector: 'app-show-candidat',
  templateUrl: './show-candidat.component.html',
  styleUrls: ['./show-candidat.component.css']
})
export class ShowCandidatComponent implements OnInit {

  //URL du serveur de stockage
  storageUrl = environment.storageUrl;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Candidat) { }

  ngOnInit() {
  }

}
