import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';

import { environment } from '../../../../environments/environment';
import { Rappel } from 'src/app/@Models/rappel';
import { Projet } from 'src/app/@Models/projet';
import { FileUploadService } from '../../../@Services/file-upload.service';

import { SharedDataService } from '../../../@Services/shared-data.service';
import { MatSpinnerComponent } from '../../dialogs/mat-spinner/mat-spinner.component';

@Component({
  selector: 'app-form-edit-rappels',
  templateUrl: './form-edit-rappels.component.html'
})
export class FormEditRappelsComponent implements OnInit {

  // URL du serveur de stockage
  storageUrl = environment.storageUrl;
  namePJ = 'Aucun fichier choisi';

  // FileUpload
  selectedFiles: FileList;
  currentFileUpload: File;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Rappel,
    private uploadService: FileUploadService,
    private sharedService: SharedDataService,
    public dialog: MatDialog) { }

  ngOnInit() {
  }

  // Parent intercepte l'event envoyé par son fils : <app-liste-deroulante-projets> qui génére un EventEmitter
  projetIdEventListner($event) {
      // Mise à jour de l'objet data de la view

      if (this.data.projet === null) {
        const projet = new Projet();
        projet.id = $event;
        this.data.projet = projet;
      } else {
        this.data.projet.id = $event;
      }
  }

  remindMe(event: MatSlideToggleChange) {
    // Je met à jour la shared variable : shared data service
    this.sharedService.changeRemindMe(event.checked);
  }

  // FileUpload
  selectFile($event, id) {
    this.selectedFiles = $event.target.files;
    this.namePJ =  this.selectedFiles.item(0).name;
    this.addFileController(id);
  }

  async addFileController(id) {
    // On ouvre la modale Spinner
    this.openDialogSpinner();

    if (this.selectedFiles != null) {
    this.currentFileUpload = this.selectedFiles.item(0);
    const result = await this.uploadService.addFichierRappel(this.currentFileUpload, id);
    this.selectedFiles = undefined;
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
