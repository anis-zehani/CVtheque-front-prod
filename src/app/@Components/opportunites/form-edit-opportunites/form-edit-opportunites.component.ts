import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

import { UtilService } from '../../../@Util/util.service';
import { Partenaire } from 'src/app/@Models/partenaire';

@Component({
  selector: 'app-form-edit-opportunites',
  templateUrl: './form-edit-opportunites.component.html',
  styleUrls: ['./form-edit-opportunites.component.css']
})
export class FormEditOpportunitesComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private utilService: UtilService) {}

  role: string;
  idUtilisateur: number;

  ngOnInit() {
    // je récupère le rôle pour la restriction d'accès dans le menu
    this.role = this.utilService.getRoleUtilisateurFromToken();
    this.idUtilisateur = this.utilService.getIdUtilisateurFromToken();
  }

  // Parent intercepte l'event envoyé par son fils : <app-liste-partenaires> qui génére un EventEmitter
  partenaireIdEventListner($event) {
    // Mise à jour de l'objet data de la view

    if (this.data.responsableOpportunite === null) {
      const partenaire = new Partenaire();
      partenaire.id = $event;
      this.data.responsableOpportunite = partenaire;
    } else {
      this.data.responsableOpportunite.id = $event;
    }
  }
}
