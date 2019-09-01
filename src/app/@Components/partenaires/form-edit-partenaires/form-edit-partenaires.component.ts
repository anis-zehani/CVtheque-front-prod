import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

import { environment } from '../../../../environments/environment';
import { Partenaire } from '../../../@Models/partenaire';
import { FileUploadService } from '../../../@Services/file-upload.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Entreprise } from 'src/app/@Models/entreprise';

@Component({
  selector: 'app-form-edit-partenaires',
  templateUrl: './form-edit-partenaires.component.html',
  styleUrls: ['./form-edit-partenaires.component.css']
})
export class FormEditPartenairesComponent implements OnInit {

  // URL du serveur de stockage
  storageUrl = environment.storageUrl;

  // FileUpload
  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };

  constructor(@Inject(MAT_DIALOG_DATA) public data: Partenaire, private uploadService: FileUploadService) {}

  ngOnInit() {
  }

  // Parent intercepte l'event envoyé par son fils : <app-liste-entreprises> qui génére un EventEmitter
  entrepriseIdEventListner($event) {
    // Mise à jour de l'objet data de la view

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

        this.uploadService.addPhotoPartenaire(this.currentFileUpload, id).subscribe(event => {
            if (event.type === HttpEventType.UploadProgress) { this.progress.percentage = Math.round(100 * event.loaded / event.total); } else if (event instanceof HttpResponse) {console.log('File is completely uploaded!'); }
          });
        this.selectedFiles = undefined;
  }
  }

}
