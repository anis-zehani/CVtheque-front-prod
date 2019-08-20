import { Component, OnInit , Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';

import { RappelsService } from '../../../@Services/rappels.service';
import { UtilService } from '../../../@Util/util.service';
import { Projet } from 'src/app/@Models/projet';
import { FileUploadService } from '../../../@Services/file-upload.service';

@Component({
  selector: 'app-form-add-rappels',
  templateUrl: './form-add-rappels.component.html'
  
})
export class FormAddRappelsComponent implements OnInit {

  //Envoi l'event pour mettre à jour la table
  @Output() refreshTableEvent = new EventEmitter<Event>();

  projet:Projet;

  //FileUpload
  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };

  //Mon Reactive Form
  formRappel = new FormGroup({
    detailsRappel: new FormControl('', Validators.nullValidator),
    dateEcheance: new FormControl('', Validators.nullValidator),
    priorite: new FormControl('Non_Mentionee', Validators.nullValidator),
    remindMe: new FormControl('', Validators.nullValidator),
    projet: new FormControl('', Validators.nullValidator)
  });

  constructor(
    private rappelsService: RappelsService, 
    private utilService: UtilService,
    private uploadService: FileUploadService,
    private dialogRef: MatDialogRef<FormAddRappelsComponent>
    ) 
  {
    this.projet = new Projet();
  }

  ngOnInit() {
  }

  //ferme la modale et submit le formulaire
  save() {
    this.dialogRef.close(this.formRappel.value);
  }

  //Parent intercepte l'event envoyé par son fils : <app-liste-projets> qui génére un EventEmitter
  projetIdEventListner($event){
    this.projet.id = $event;
  }

  //Ajouter une rappel 
  addRappelController() {
    this.formRappel.patchValue({
      projet: this.projet,
    });
    this.rappelsService.addRappelService(this.formRappel.value)
    .subscribe
      (res => 
        { if(res != null)
          { 
          this.addFileController(res.id);
          this.utilService.openSnackBar("Rappel ajouté", "OK"); 
          }
        }
      )
      this.formRappel.reset();  
  }

  //FileUpload
  selectFile($event) {
      this.selectedFiles = $event.target.files;
  }

  addFileController(id) {

    if(this.selectedFiles !=  null)
    {
    this.currentFileUpload = this.selectedFiles.item(0);

    this.uploadService.addFichierRappel(this.currentFileUpload, id).subscribe(event => 
      {
        if (event.type === HttpEventType.UploadProgress) 
        {
          this.progress.percentage = Math.round(100 * event.loaded / event.total);
        } 
        else if (event instanceof HttpResponse) 
        {
          console.log('File is completely uploaded!');
        }
      });
    this.selectedFiles = undefined;
    }
  }
}
