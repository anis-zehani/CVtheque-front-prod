import { Component, OnInit, Inject } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { MAT_DIALOG_DATA } from '@angular/material';

import { environment } from '../../../../environments/environment';
import { Contact } from '../../../@Models/contact';
import { FileUploadService } from '../../../@Services/file-upload.service';
import { Entreprise } from 'src/app/@Models/entreprise';

@Component({
  selector: 'app-form-edit-contacts',
  templateUrl: './form-edit-contacts.component.html',
  styleUrls: ['./form-edit-contacts.component.css']
})
export class FormEditContactsComponent implements OnInit {

  // URL du serveur de stockage
  storageUrl = environment.storageUrl;

  // FileUpload
  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };

  constructor(@Inject(MAT_DIALOG_DATA) public data: Contact, private uploadService: FileUploadService) {}

  ngOnInit() {
  }

  // Parent intercepte l'event envoyé par son fils : <app-liste-entreprises> qui génére un EventEmitter
  entrepriseIdEventListner($event) {
    // Mise à jour de l'objet data de la view
    // this.data.entreprise.idEntreprise=$event;

    if (this.data.entreprise === null) {
      const entreprise = new Entreprise(null, null, null);
      entreprise.idEntreprise = $event;
      this.data.entreprise = entreprise;
    } else {
      this.data.entreprise.idEntreprise = $event;
    }
  }

  // FileUpload
  selectFile($event) {
    this.selectedFiles = $event.target.files;
  }

  // Click sur le bouton "Confirmer"
  editPhotoController(id) {
    // On teste si une image a été selectionnée
    if (this.selectedFiles != null) {
        this.currentFileUpload = this.selectedFiles.item(0);

        this.uploadService.addPhotoContact(this.currentFileUpload, id).subscribe(event => {
            if (event.type === HttpEventType.UploadProgress) { this.progress.percentage = Math.round(100 * event.loaded / event.total); } else if (event instanceof HttpResponse) {console.log('File is completely uploaded!'); }
          });
        this.selectedFiles = undefined;
  }
  }

}
