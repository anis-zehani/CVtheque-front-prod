import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Entreprise } from 'src/app/@Models/entreprise';

@Component({
  selector: 'app-show-entreprise',
  templateUrl: './show-entreprise.component.html',
  styleUrls: ['./show-entreprise.component.css']
})
export class ShowEntrepriseComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Entreprise) { }

  ngOnInit() {
  }

}
