import { Component, OnInit , Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { MatDialogRef } from '@angular/material/dialog';

import { RappelsService } from '../../../@Services/rappels.service';
import { UtilService } from '../../../@Util/util.service';
import { Projet } from 'src/app/@Models/projet';
import { FileUploadService } from '../../../@Services/file-upload.service';
import { MatSpinnerComponent } from '../../dialogs/mat-spinner/mat-spinner.component';

@Component({
  selector: 'app-form-add-rappels',
  templateUrl: './form-add-rappels.component.html'

})
export class FormAddRappelsComponent implements OnInit {

  // Envoi l'event pour mettre à jour la table
  @Output() refreshTableEvent = new EventEmitter<Event>();

  projet: Projet;

  // FileUpload
  selectedFiles: FileList;
  currentFileUpload: File;
  namePJ = 'Aucun fichier choisi';

  // Mon Reactive Form
  formRappel = new FormGroup({
    detailsRappel: new FormControl('', Validators.required),
    dateEcheance: new FormControl('', Validators.nullValidator),
    priorite: new FormControl('Non_Mentionee', Validators.nullValidator),
    remindMe: new FormControl('', Validators.nullValidator),
    projet: new FormControl('', Validators.nullValidator)
  });

  constructor(
    private rappelsService: RappelsService,
    private utilService: UtilService,
    private uploadService: FileUploadService,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<FormAddRappelsComponent>
    ) {
    this.projet = new Projet();
  }

  ngOnInit() {
  }

  // ferme la modale et submit le formulaire
  save() {
    this.dialogRef.close(this.formRappel.value);
  }

  // Parent intercepte l'event envoyé par son fils : <app-liste-projets> qui génére un EventEmitter
  projetIdEventListner($event) {
    this.projet.id = $event;
  }

  // Ajouter une rappel
  addRappelController() {
    // On ouvre la modale Spinner
    this.openDialogSpinner();

    this.formRappel.patchValue({
      projet: this.projet,
    });
    this.rappelsService.addRappelService(this.formRappel.value)
    .subscribe
      (res => {
          if (res != null) {
          this.addFileController(res.id);
          this.utilService.openSnackBar('Rappel ajouté', 'OK');
          }
        }
      );
    // On ferme la modale Spinner
    this.closeDialogSpinner();

    this.formRappel.reset();
  }

  // FileUpload
  selectFile($event) {
      this.selectedFiles = $event.target.files;
      this.namePJ =  this.selectedFiles.item(0).name;
  }

  addFileController(id) {
    if (this.selectedFiles !=  null) {
    this.currentFileUpload = this.selectedFiles.item(0);
    this.uploadService.addFichierRappel(this.currentFileUpload, id).subscribe(event => {
      });
    this.selectedFiles = undefined;
    }
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
