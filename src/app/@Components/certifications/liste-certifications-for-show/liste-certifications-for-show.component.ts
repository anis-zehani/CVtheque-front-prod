import { Component, OnInit, Input } from '@angular/core';
import { Certification } from 'src/app/@Models/certification';

@Component({
  selector: 'app-liste-certifications-for-show', 
  templateUrl: './liste-certifications-for-show.component.html'
})
export class ListeCertificationsForShowComponent implements OnInit {

  @Input() listeCertifications : Certification[]=[];

  constructor() { }

  ngOnInit() {
  }

}
