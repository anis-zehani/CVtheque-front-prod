import { Component, OnInit, Inject } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

import { environment } from '../../../../environments/environment';
import { Rappel } from 'src/app/@Models/rappel';
import { Projet } from 'src/app/@Models/projet';
import { FileUploadService } from '../../../@Services/file-upload.service';

import { SharedDataService } from '../../../@Services/shared-data.service';

@Component({
  selector: 'app-form-edit-rappels',
  templateUrl: './form-edit-rappels.component.html'
})
export class FormEditRappelsComponent implements OnInit {

  //URL du serveur de stockage
  storageUrl = environment.storageUrl;

  //FileUpload
  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Rappel, 
    private uploadService: FileUploadService,
    private sharedService: SharedDataService) { }

  ngOnInit() {
  }

  //Parent intercepte l'event envoyé par son fils : <app-liste-deroulante-projets> qui génére un EventEmitter
  projetIdEventListner($event){
      //Mise à jour de l'objet data de la view
    
      if(this.data.projet === null)
      {
        let projet = new Projet();
        projet.id=$event;
        this.data.projet=projet;
      }
      else
      {
        this.data.projet.id=$event;
      }
  }

  remindMe(event: MatSlideToggleChange)
  {
    //Je met à jour la shared variable : shared data service
    this.sharedService.changeRemindMe(event.checked);
  }

  //FileUpload
  selectFile($event) {
    this.selectedFiles = $event.target.files;
  }

  addFileController(id) {
    if(this.selectedFiles != null)
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
