import { Component, OnInit , Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef} from '@angular/material/dialog';

import { TechnologiesService } from '../../../@Services/technologies.service';
import { UtilService } from '../../../@Util/util.service';


@Component({
  selector: 'app-form-add-technologies',
  templateUrl: './form-add-technologies.component.html'
  
})
export class FormAddTechnologiesComponent implements OnInit {

  //Envoi l'event pour mettre à jour la table
  @Output() refreshTableEvent = new EventEmitter<Event>();

  //Mon Reactive Form
  formTechnologie = new FormGroup({
    nomTechnologie: new FormControl('', Validators.nullValidator),
    descriptionDetaillee: new FormControl('', Validators.nullValidator)
  });

  constructor(
    private technologiesService: TechnologiesService, 
    private utilService: UtilService,
    private dialogRef: MatDialogRef<FormAddTechnologiesComponent>) {}

  ngOnInit() {
  }

  //Quand on ajoute une Technologie : un EVENT est envoyé au Parent pour rafraichir la table
  refreshTableFunction($event){
    this.refreshTableEvent.emit($event);
  }

  //Ajouter une technologie 
  addTechnologieController() {
    this.technologiesService.addTechnologieService(this.formTechnologie.value)
    .subscribe
      (res => 
        { if(res != null)
          { 
          this.refreshTableFunction(true);
          this.utilService.openSnackBar("Technologie ajoutée", "OK"); 
          }
        }
      )
      this.formTechnologie.reset();  
  }
}
