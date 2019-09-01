import { Component, OnInit , Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef} from '@angular/material/dialog';

import { TechnologiesService } from '../../../@Services/technologies.service';
import { UtilService } from '../../../@Util/util.service';


@Component({
  selector: 'app-dialog-add-technologies',
  templateUrl: './dialog-add-technologies.component.html'
})
export class DialogAddTechnologiesComponent implements OnInit {

  // Envoi l'event pour mettre à jour la table
  @Output() refreshTableEvent = new EventEmitter<Event>();

  // Mon Reactive Form
  formTechnologie = new FormGroup({
    nomTechnologie: new FormControl('', Validators.required),
    descriptionDetaillee: new FormControl('', Validators.nullValidator)
  });

  constructor(
    private technologiesService: TechnologiesService,
    private utilService: UtilService,
    private dialogRef: MatDialogRef<DialogAddTechnologiesComponent>) {}

  ngOnInit() {
  }

  // ferme la modale et submit le formulaire
  save() {
    this.dialogRef.close(this.formTechnologie.value);
  }

  // Quand on ajoute une Technologie : un EVENT est envoyé au Parent pour rafraichir la table
  refreshTableFunction($event) {
    this.refreshTableEvent.emit($event);
  }

  // Ajouter une technologie
  addTechnologieController() {
    this.technologiesService.addTechnologieService(this.formTechnologie.value)
    .subscribe
      (res => { if (res != null) {
          this.refreshTableFunction(true);
          this.utilService.openSnackBar('Technologie ajoutée', 'OK');
          }
        }
      );
    this.formTechnologie.reset();
  }
}
