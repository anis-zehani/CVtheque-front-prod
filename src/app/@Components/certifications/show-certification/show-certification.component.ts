import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Certification } from 'src/app/@Models/certification';

@Component({
  selector: 'app-show-certification',
  templateUrl: './show-certification.component.html',
  styleUrls: ['./show-certification.component.css']
})
export class ShowCertificationComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Certification) { }

  ngOnInit() {
  }

}
