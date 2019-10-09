import { Component, OnInit , Output, EventEmitter, Input} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { MatDialog, MatDialogConfig } from '@angular/material';

import { PartenairesService } from '../../../@Services/partenaires.service';
import { UtilService } from '../../../@Util/util.service';
import { FileUploadService } from '../../../@Services/file-upload.service';
import { Entreprise } from 'src/app/@Models/entreprise';
import { MatSpinnerComponent } from '../../dialogs/mat-spinner/mat-spinner.component';

@Component({
  selector: 'app-form-add-partenaires',
  templateUrl: './form-add-partenaires.component.html',
  styleUrls: ['./form-add-partenaires.component.css']

})
export class FormAddPartenairesComponent implements OnInit {

  // Afin de ferme le sidenav du parent
  @Input() inputSideNav: MatSidenav;

  // Envoi l'event pour mettre à jour la table
  @Output() refreshTableEvent = new EventEmitter<Event>();

  entreprise: Entreprise;

  // FileUpload
  selectedFiles: FileList;
  currentFileUpload: File;
  namePhoto = 'Aucune photo de profil';

  // Mon Reactive Form
  formPartenaire = new FormGroup({
    identite: new FormControl('', Validators.required),
    telephone: new FormControl('', Validators.nullValidator),
    email: new FormControl('', Validators.required),
    posteOccupe: new FormControl('', Validators.nullValidator),
    descriptionDetaillee: new FormControl('', Validators.nullValidator),
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    entreprise: new FormControl('', Validators.nullValidator)
  });

  constructor(
    private partenairesService: PartenairesService,
    private utilService: UtilService,
    private uploadService: FileUploadService,
    public dialog: MatDialog) {
      this.entreprise = new Entreprise(null, null, null);
    }

  ngOnInit() {}

  // Quand on ajoute un Partenaire : un EVENT est envoyé au Parent pour rafraichir la table
  refreshTableFunction($event) {
    this.refreshTableEvent.emit($event);
  }

  // Parent intercepte l'event envoyé par son fils : <app-liste-entreprises> qui génére un EventEmitter
  entrepriseIdEventListner($event) {
    this.entreprise.idEntreprise = $event;
  }

  // Ajouter un partenaire
  addPartenaireController() {
    // On ouvre la modale Spinner
    this.openDialogSpinner();

    this.formPartenaire.patchValue({
      entreprise: this.entreprise,
    });
    this.partenairesService.addPartenaireService(this.formPartenaire.value)
    .subscribe
      (res => { if (res != null) {
          this.addPhotoController(res.id);
          this.refreshTableFunction(true);
          // On ferme la modale Spinner
          this.closeDialogSpinner();
          this.utilService.openSnackBar('Partenaire ajouté', 'OK');
          } else {
            // On ferme la modale Spinner
            this.closeDialogSpinner();
            this.utilService.openSnackBar('Une erreur est survenue durant l\ajout du partenaire', 'Erreur');
          }
        }
      );
    this.formPartenaire.reset();
  }

  // FileUpload
  selectFile($event) {
    this.selectedFiles = $event.target.files;
    this.namePhoto = this.selectedFiles.item(0).name;
  }

  addPhotoController(id) {
    if (this.selectedFiles !=  null) {
    this.currentFileUpload = this.selectedFiles.item(0);
    this.uploadService.addPhotoPartenaire(this.currentFileUpload, id).subscribe(event => {
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
