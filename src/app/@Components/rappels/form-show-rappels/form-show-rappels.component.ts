import { Component, OnInit, Inject } from '@angular/core';
import { Rappel } from 'src/app/@Models/rappel';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-form-show-rappels',
  templateUrl: './form-show-rappels.component.html',
  styleUrls: ['./form-show-rappels.component.css']
})
export class FormShowRappelsComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Rappel) { }

  ngOnInit() {
  }

}
