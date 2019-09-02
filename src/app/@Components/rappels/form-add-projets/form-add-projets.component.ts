import { Component, OnInit , Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { ProjetsService } from '../../../@Services/projets.service';
import { UtilService } from '../../../@Util/util.service';


@Component({
  selector: 'app-form-add-projets',
  templateUrl: './form-add-projets.component.html'

})
export class FormAddProjetsComponent implements OnInit {

  // Envoi l'event pour mettre à jour la table
  @Output() refreshTableEvent = new EventEmitter<Event>();

  // Mon Reactive Form
  formProjet = new FormGroup({
    nomProjet: new FormControl('', Validators.required),
    detailsProjet: new FormControl('', Validators.nullValidator)
  });

  constructor(
    private projetsService: ProjetsService,
    private utilService: UtilService,
    private dialogRef: MatDialogRef<FormAddProjetsComponent>
    ) {}

  ngOnInit() {
  }

  // ferme la modale et submit le formulaire
  save() {
    this.dialogRef.close(this.formProjet.value);
  }


  // Ajouter une projet
  addProjetController() {
    this.projetsService.addProjetService(this.formProjet.value)
    .subscribe
      (res => { if (res != null) {
          this.utilService.openSnackBar('Projet ajouté', 'OK');
          }
        }
      );
    this.formProjet.reset();
  }
}
