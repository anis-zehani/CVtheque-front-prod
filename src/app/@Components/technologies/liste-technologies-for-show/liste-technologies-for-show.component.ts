import { Component, OnInit, Input} from '@angular/core';
import { Technologie } from 'src/app/@Models/technologie';

@Component({
  selector: 'app-liste-technologies-for-show',
  templateUrl: './liste-technologies-for-show.component.html',
  styleUrls: ['./liste-technologies-for-show.component.css']
})
export class ListeTechnologiesForShowComponent implements OnInit {

  @Input() listeTechnologies : Technologie[]=[];

  constructor() { }

  ngOnInit() {
  }

}
