import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-validation-entreprise',
  templateUrl: './validation-entreprise.component.html',
  styleUrls: ['./validation-entreprise.component.css']
})
export class ValidationEntrepriseComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

    // Parent intercepte l'event envoyé par son fils : <app-liste-entreprises> qui génére un EventEmitter
  entrepriseIdEventListner($event) {
    this.data.idEntreprise = $event;
  }
}
