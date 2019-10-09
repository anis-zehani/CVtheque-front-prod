import { Component, OnInit , Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { MatSidenav } from '@angular/material/sidenav';

import { ContactsService } from '../../../@Services/contacts.service';
import { UtilService } from '../../../@Util/util.service';
import { FileUploadService } from '../../../@Services/file-upload.service';
import { Entreprise } from 'src/app/@Models/entreprise';
import { MatSpinnerComponent } from '../../dialogs/mat-spinner/mat-spinner.component';

@Component({
  selector: 'app-form-add-contacts',
  templateUrl: './form-add-contacts.component.html',
  styleUrls: ['./form-add-contacts.component.css']

})
export class FormAddContactsComponent implements OnInit {

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
  formContact = new FormGroup({
    identite: new FormControl('', Validators.required),
    telephone: new FormControl('', Validators.nullValidator),
    email: new FormControl('', Validators.required),
    posteOccupe: new FormControl('', Validators.nullValidator),
    descriptionDetaillee: new FormControl('', Validators.nullValidator),
    entreprise: new FormControl('', Validators.nullValidator)
  });

  constructor(
    private contactsService: ContactsService,
    private utilService: UtilService,
    private uploadService: FileUploadService,
    public dialog: MatDialog) {
      this.entreprise = new Entreprise(null, null, null);
    }

  ngOnInit() {}

  // Quand on ajoute une Contact : un EVENT est envoyé au Parent pour rafraichir la table
  refreshTableFunction($event) {
    this.refreshTableEvent.emit($event);
  }

  // Parent intercepte l'event envoyé par son fils : <app-liste-entreprises> qui génére un EventEmitter
  entrepriseIdEventListner($event) {
    this.entreprise.idEntreprise = $event;
  }

  // Ajouter un contact
  addContactController() {
    // On ouvre la modale Spinner
    this.openDialogSpinner();

    this.formContact.patchValue({
      entreprise: this.entreprise,
    });
    this.contactsService.addContactService(this.formContact.value)
    .subscribe
      (
        res => { if (res != null) {
          this.addPhotoController(res.id);
          // Placer un <mat-progress-spinner> ici
          this.refreshTableFunction(true);
          // On ferme la modale Spinner
          this.closeDialogSpinner();
          this.utilService.openSnackBar('Contact ajouté', 'OK');
          } else {
            // On ferme la modale Spinner
            this.closeDialogSpinner();
            this.utilService.openSnackBar('Une erreur est survenue durant l\ajout du contact', 'Erreur');
          }
        }
      );
    this.formContact.reset();
  }

  // FileUpload
  selectFile($event) {
    this.selectedFiles = $event.target.files;
    this.namePhoto = this.selectedFiles.item(0).name;
  }

  addPhotoController(id) {
    if (this.selectedFiles !=  null) {
    this.currentFileUpload = this.selectedFiles.item(0);
    this.uploadService.addPhotoContact(this.currentFileUpload, id).subscribe(event => {
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
