import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { environment } from '../../../../environments/environment';
import { Candidat } from '../../../@Models/candidat';
import { FileUploadService } from '../../../@Services/file-upload.service';
import { Entreprise } from 'src/app/@Models/entreprise';
import { Ecole } from 'src/app/@Models/ecole';
import { MatSpinnerComponent } from '../../dialogs/mat-spinner/mat-spinner.component';

@Component({
  selector: 'app-form-edit-candidats',
  templateUrl: './form-edit-candidats.component.html',
  styleUrls: ['./form-edit-candidats.component.css']
})
export class FormEditCandidatsComponent implements OnInit {

  // URL du serveur de stockage
  storageUrl = environment.storageUrl;
  namePhoto = 'Aucune photo de profil';
  nameCvOdix = 'Aucun fichier choisi';
  nameCvOriginal = 'Aucun fichier choisi';

  // FileUpload : Photo
  selectedFilesPhoto: FileList;
  currentFileUploadPhoto: File;

  // FileUpload : CvOdix
  selectedFilesCvOdix: FileList;
  currentFileUploadCvOdix: File;

  // FileUpload : CvOriginal
  selectedFilesCvOriginal: FileList;
  currentFileUploadCvOriginal: File;

  nombreEnfants: string = this.data.nombreEnfants.toString();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Candidat,
    private uploadService: FileUploadService,
    public dialog: MatDialog) {}

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
      this.namePhoto = this.selectedFilesPhoto.item(0).name;
    }
  }
  // File Upload : Cv Odix
  selectEditCvOdix($event, typeFile) {
    if (typeFile === 'cvodixToEdit') {
      this.selectedFilesCvOdix = $event.target.files;
      this.nameCvOdix = this.selectedFilesCvOdix.item(0).name;
    }
  }
  // File Upload : Cv Original
  selectEditCvOriginal($event, typeFile) {
    if (typeFile === 'cvoriginalToEdit') {
      this.selectedFilesCvOriginal = $event.target.files;
      this.nameCvOriginal = this.selectedFilesCvOriginal.item(0).name;
    }
  }

  // Upload Photo de Profil
  async editPhotoProfil(id) {
    // On ouvre la modale Spinner
    this.openDialogSpinner();

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

    // On ferme la modale Spinner
    this.closeDialogSpinner();
  }

  openDialogSpinner(): void {
    // Objet pour configurer la modale Spinner : le temps de l'upload
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.closeOnNavigation = false;
    const dialogRef = this.dialog.open(MatSpinnerComponent, {
      width: '450px',
      height: '200px',
      data: {
          // texte : "Afficher Message."
        }
      });
  }

  closeDialogSpinner(): void {
    // Ferme toutes les modales Spinner : upload is out
    this.dialog.closeAll();
  }
}
