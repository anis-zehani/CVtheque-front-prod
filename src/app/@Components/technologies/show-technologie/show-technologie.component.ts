import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Technologie } from 'src/app/@Models/technologie';

@Component({
  selector: 'app-show-technologie',
  templateUrl: './show-technologie.component.html',
  styleUrls: ['./show-technologie.component.css']
})
export class ShowTechnologieComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Technologie) { }

  ngOnInit() {
  }

}
