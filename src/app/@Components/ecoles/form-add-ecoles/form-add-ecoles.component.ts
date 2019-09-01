import { Component, OnInit , Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { EcolesService } from '../../../@Services/ecoles.service';
import { UtilService } from '../../../@Util/util.service';

@Component({
  selector: 'app-form-add-ecoles',
  templateUrl: './form-add-ecoles.component.html'

})
export class FormAddEcolesComponent implements OnInit {

  // Envoi l'event pour mettre à jour la table
  @Output() refreshTableEvent = new EventEmitter<Event>();

  // Mon Reactive Form
  formEcole = new FormGroup({
    nomEcole: new FormControl('', Validators.required)
  });

  constructor(
    private ecolesService: EcolesService,
    private utilService: UtilService,
    private dialogRef: MatDialogRef<FormAddEcolesComponent>) {}

  ngOnInit() {
  }

  // ferme la modale et submit le formulaire
  save() {
    this.dialogRef.close(this.formEcole.value);
  }

  // Quand on ajoute une École : un EVENT est envoyé au Parent pour rafraichir la table
  refreshTableFunction($event) {
    this.refreshTableEvent.emit($event);
  }

  // Ajouter une école
  addEcoleController() {
    this.ecolesService.addEcoleService(this.formEcole.value)
    .subscribe
      (res => { if (res != null) {
          this.refreshTableFunction(true);
          this.utilService.openSnackBar('École ajoutée', 'OK');
          }
        }
      );
    this.formEcole.reset();
  }
}
