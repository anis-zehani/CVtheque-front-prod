import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { environment } from '../../../../environments/environment';
import { Partenaire } from '../../../@Models/partenaire';
import { FileUploadService } from '../../../@Services/file-upload.service';
import { Entreprise } from 'src/app/@Models/entreprise';
import { MatSpinnerComponent } from '../../dialogs/mat-spinner/mat-spinner.component';

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
  namePhoto: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Partenaire,
    private uploadService: FileUploadService,
    public dialog: MatDialog) {}

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
  selectEditPhotoProfil($event, idPartenaire) {
    this.selectedFiles = $event.target.files;
    this.namePhoto = this.selectedFiles.item(0).name;
    this.editPhotoController(idPartenaire);
  }

  // Click sur le bouton "Confirmer"
  editPhotoController(id) {
    // On ouvre la modale Spinner
    this.openDialogSpinner();
    // On teste si une image a été selectionnée
    if (this.selectedFiles != null) {
        this.currentFileUpload = this.selectedFiles.item(0);
        this.uploadService.addPhotoPartenaire(this.currentFileUpload, id).subscribe(event => {
          });
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
