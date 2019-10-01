import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

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

  // File Upload : Photo de profil
  selectEditPhotoProfil($event, typeFile) {
    if (typeFile === 'photodeprofilToEdit') {
      this.selectedFilesPhoto = $event.target.files;
    }
  }
  // File Upload : Cv Odix
  selectEditCvOdix($event, typeFile) {
    if (typeFile === 'cvodixToEdit') {
      this.selectedFilesCvOdix = $event.target.files;
    }
  }
  // File Upload : Cv Original
  selectEditCvOriginal($event, typeFile) {
    if (typeFile === 'cvoriginalToEdit') {
      this.selectedFilesCvOriginal = $event.target.files;
    }
  }

  // Upload Photo de Profil
  async editPhotoProfil(id) {
    if (this.selectedFilesPhoto !=  null) {
        this.currentFileUploadPhoto = this.selectedFilesPhoto.item(0);
        const result = await this.uploadService.addPhotoCandidat(this.currentFileUploadPhoto, id);
        if (result != null) {
          this.editCvOdix(id);
        }
        this.selectedFilesPhoto = undefined;
    } else {
      this.editCvOdix(id);
    }
  }

  // Upload Cv Odix
  async editCvOdix(id) {
    if (this.selectedFilesCvOdix !=  null) {
        this.currentFileUploadCvOdix = this.selectedFilesCvOdix.item(0);
        const result = await this.uploadService.addCvOdixCandidat(this.currentFileUploadCvOdix, id);
        if (result != null) {
          this.editCvOriginal(id);
        }
        this.selectedFilesCvOdix = undefined;
    } else {
        this.editCvOriginal(id);
    }
  }

  // Upload Cv Original
  async editCvOriginal(id) {
    if (this.selectedFilesCvOriginal !=  null) {
        this.currentFileUploadCvOriginal = this.selectedFilesCvOriginal.item(0);
        const result = await this.uploadService.addCvOriginalCandidat(this.currentFileUploadCvOriginal, id);
        this.selectedFilesCvOriginal = undefined;
    }
  }
}
