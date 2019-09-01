import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgForm } from '@angular/forms';

import { CollaborateursService } from '../../../@Services/collaborateurs.service';
import { UtilService } from '../../../@Util/util.service';

@Component({
  selector: 'app-form-add-collaborateurs',
  templateUrl: './form-add-collaborateurs.component.html',
  styleUrls: ['./form-add-collaborateurs.component.css']
})
export class FormAddCollaborateursComponent implements OnInit {

  // Envoi l'event pour mettre à jour la table
  @Output() refreshTableEvent = new EventEmitter<Event>();

  // Mon Reactive Form
  formCollaborateur = new FormGroup({
    identite: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(
    private collaborateursService: CollaborateursService,
    private utilService: UtilService
    ) {}

  ngOnInit() {
  }

  // Quand on ajoute un collaborateur : un EVENT est envoyé au Parent pour rafraichir la table
  refreshTableFunction($event) {
      this.refreshTableEvent.emit($event);
  }

  // Ajouter une collaborateur + refresh de la table
  addCollaborateurController() {
    this.collaborateursService.addCollaborateurService(this.formCollaborateur.value)
    .subscribe
      (
      res => {
        if (res != null) {
            this.refreshTableFunction(true);
            this.utilService.openSnackBar('Collaborateur ajouté', 'OK');
        }
      }
      );
    this.formCollaborateur.reset();
  }

}
