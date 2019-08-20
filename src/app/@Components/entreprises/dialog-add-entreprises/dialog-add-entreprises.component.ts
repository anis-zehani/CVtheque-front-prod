import { Component, OnInit , Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { EntreprisesService } from '../../../@Services/entreprises.service';
import { UtilService } from '../../../@Util/util.service';


@Component({
  selector: 'app-dialog-add-entreprises',
  templateUrl: './dialog-add-entreprises.component.html'
  
})
export class DialogAddEntreprisesComponent implements OnInit {

  //Envoi l'event pour mettre à jour la table
  @Output() refreshTableEvent = new EventEmitter<Event>();

  //Mon Reactive Form
  formEntreprise = new FormGroup({
    nomEntreprise: new FormControl('', Validators.nullValidator),
    descriptionDetaillee: new FormControl('', Validators.nullValidator)
  });

  constructor(
    private entreprisesService: EntreprisesService, 
    private utilService: UtilService,
    private dialogRef: MatDialogRef<DialogAddEntreprisesComponent>) {}

  ngOnInit() {
  }

  //ferme la modale et submit le formulaire
  save() {
    this.dialogRef.close(this.formEntreprise.value);
  }

  //Quand on ajoute une Entreprise : un EVENT est envoyé au Parent pour rafraichir la table
  refreshTableFunction($event){
    this.refreshTableEvent.emit($event);
  }

  //Ajouter une entreprise 
  addEntrepriseController() {
    this.entreprisesService.addEntrepriseService(this.formEntreprise.value)
    .subscribe
      (res => 
        { if(res != null)
          { 
          this.refreshTableFunction(true);
          this.utilService.openSnackBar("Entreprise ajoutée", "OK"); 
          }
        }
      )
      this.formEntreprise.reset();  
  }
}
