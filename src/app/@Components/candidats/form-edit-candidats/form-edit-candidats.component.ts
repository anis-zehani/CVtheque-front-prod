import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { HttpEventType, HttpResponse } from '@angular/common/http';

import { environment } from '../../../../environments/environment';
import { Candidat } from '../../../@Models/candidat';
import { FileUploadService } from '../../../@Services/file-upload.service';
import { Entreprise } from 'src/app/@Models/entreprise';
import { Ecole } from 'src/app/@Models/ecole';

@Component({
  selector: 'app-form-edit-candidats',
  templateUrl: './form-edit-candidats.component.html',
  styleUrls: ['./form-edit-candidats.component.css']
})
export class FormEditCandidatsComponent implements OnInit {

  // URL du serveur de stockage
  storageUrl = environment.storageUrl;

  // FileUpload : Photo
  selectedFilesPhoto: FileList;
  currentFileUploadPhoto: File;
  progressFilesPhoto: { percentage: number } = { percentage: 0 };

  // FileUpload : CvOdix
  selectedFilesCvOdix: FileList;
  currentFileUploadCvOdix: File;
  progressFilesCvOdix: { percentage: number } = { percentage: 0 };

  // FileUpload : CvOriginal
  selectedFilesCvOriginal: FileList;
  currentFileUploadCvOriginal: File;
  progressFilesCvOriginal: { percentage: number } = { percentage: 0 };

  nombreEnfants: string = this.data.nombreEnfants.toString();

  constructor(@Inject(MAT_DIALOG_DATA) public data: Candidat, private uploadService: FileUploadService) {}

  ngOnInit() {
    // Si le candidat possède une image Linkedin alors on réajuste l'url d'affichage de l'image
    if (this.data.idLinkedin !== '') {
      this.storageUrl = '';
    }
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

  // Parent intercepte l'event envoyé par son fils : <app-liste-ecoles> qui génére un EventEmitter
  ecoleIdEventListner($event) {
    // Mise à jour de l'objet data de la view

    if (this.data.diplome.ecole === null) {
      const ecole = new Ecole();
      ecole.idEcole = $event;
      this.data.diplome.ecole = ecole;
    } else {
      this.data.diplome.ecole.idEcole = $event;
    }
  }

  // File Upload : Photo de profil + Cv Odix + Cv Original
  selectFileEditCandidat($event, typeFile) {
    if (typeFile === 'photodeprofil') {
      this.selectedFilesPhoto = $event.target.files;
      // console.log("photodeprofil");
    }

    if (typeFile === 'cvodix') {
      this.selectedFilesCvOdix = $event.target.files;
      // console.log("cvodix");
    }

    if (typeFile === 'cvoriginal') {
      this.selectedFilesCvOriginal = $event.target.files;
      // console.log("cvoriginal");
    }

  }

  // Click sur le bouton "Confirmer"
  editFilesController(id) {
    // Upload All 3 Files
    if (this.selectedFilesPhoto !=  null) {
        this.currentFileUploadPhoto = this.selectedFilesPhoto.item(0);

        this.uploadService.addPhotoCandidat(this.currentFileUploadPhoto, id).subscribe(event => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progressFilesPhoto.percentage = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              console.log('Photo is completely uploaded!');
            }
          });

        this.selectedFilesPhoto = undefined;
      }

    if (this.selectedFilesCvOdix !=  null) {
        this.currentFileUploadCvOdix = this.selectedFilesCvOdix.item(0);

        this.uploadService.addCvOdixCandidat(this.currentFileUploadCvOdix, id).subscribe(event => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progressFilesCvOdix.percentage = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              console.log('CvOdix is completely uploaded!');
            }
          });

        this.selectedFilesCvOdix = undefined;
      }

    if (this.selectedFilesCvOriginal !=  null) {
        this.currentFileUploadCvOriginal = this.selectedFilesCvOriginal.item(0);

        this.uploadService.addCvOriginalCandidat(this.currentFileUploadCvOriginal, id).subscribe(event => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progressFilesCvOriginal.percentage = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              console.log('CvOriginal is completely uploaded!');
            }
          });

        this.selectedFilesCvOriginal = undefined;
      }
  }
}
