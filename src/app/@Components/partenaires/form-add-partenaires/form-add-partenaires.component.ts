import { Component, OnInit , Output, EventEmitter, Input} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { HttpEventType, HttpResponse } from '@angular/common/http';

import { PartenairesService } from '../../../@Services/partenaires.service';
import { UtilService } from '../../../@Util/util.service';
import { FileUploadService } from '../../../@Services/file-upload.service';
import { Entreprise } from 'src/app/@Models/entreprise';

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
  progress: { percentage: number } = { percentage: 0 };

  // Mon Reactive Form
  formPartenaire = new FormGroup({
    identite: new FormControl('', Validators.required),
    telephone: new FormControl('', Validators.nullValidator),
    email: new FormControl('', Validators.email),
    posteOccupe: new FormControl('', Validators.nullValidator),
    descriptionDetaillee: new FormControl('', Validators.nullValidator),
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    entreprise: new FormControl('', Validators.nullValidator)
  });

  constructor(
    private partenairesService: PartenairesService,
    private utilService: UtilService,
    private uploadService: FileUploadService) {
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
    this.formPartenaire.patchValue({
      entreprise: this.entreprise,
    });
    this.partenairesService.addPartenaireService(this.formPartenaire.value)
    .subscribe
      (res => { if (res != null) {
          this.addPhotoController(res.id);
          // Placer un <mat-progress-spinner> ici
          this.refreshTableFunction(true);
          this.utilService.openSnackBar('Partenaire ajouté', 'OK');
          } else {
            this.utilService.openSnackBar('Veuillez vérifier vos paramètres', 'Erreur');
          }
        }
      );
    this.formPartenaire.reset();
  }

  // FileUpload
  selectFile($event) {
    this.selectedFiles = $event.target.files;
  }

  addPhotoController(id) {

    if (this.selectedFiles !=  null) {
    this.currentFileUpload = this.selectedFiles.item(0);

    this.uploadService.addPhotoPartenaire(this.currentFileUpload, id).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress.percentage = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          console.log('File is completely uploaded!');
        }
      });
    this.selectedFiles = undefined;
    }
  }
}
