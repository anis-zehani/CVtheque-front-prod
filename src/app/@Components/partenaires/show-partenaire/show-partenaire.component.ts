import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { environment } from '../../../../environments/environment';

import { Partenaire } from 'src/app/@Models/partenaire';

@Component({
  selector: 'app-show-partenaire',
  templateUrl: './show-partenaire.component.html',
  styleUrls: ['./show-partenaire.component.css']
})
export class ShowPartenaireComponent implements OnInit {

  //URL du serveur de stockage
  storageUrl = environment.storageUrl;
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: Partenaire) { }

  ngOnInit() {
  }

}
