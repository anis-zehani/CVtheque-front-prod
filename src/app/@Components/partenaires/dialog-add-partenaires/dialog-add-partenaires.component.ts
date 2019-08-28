import { Component, OnInit , Output, EventEmitter, Input} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';

import { PartenairesService } from '../../../@Services/partenaires.service';
import { UtilService } from '../../../@Util/util.service';
import { FileUploadService } from '../../../@Services/file-upload.service';
import { Entreprise } from 'src/app/@Models/entreprise';


@Component({
  selector: 'app-dialog-add-partenaires',
  templateUrl: './dialog-add-partenaires.component.html',
  styleUrls: ['./dialog-add-partenaires.component.css']
  
})
export class DialogAddPartenairesComponent implements OnInit {

  //Afin de ferme le sidenav du parent
  @Input() inputSideNav: MatSidenav;

  //Envoi l'event pour mettre à jour la table
  @Output() refreshTableEvent = new EventEmitter<Event>();

  entreprise : Entreprise;

  //FileUpload
  selectedFiles: FileList;
  currentFileUpload: File;
  progress: { percentage: number } = { percentage: 0 };

  //Mon Reactive Form
  formPartenaire = new FormGroup({
    identite: new FormControl('', Validators.nullValidator),
    telephone: new FormControl('', Validators.nullValidator),
    email: new FormControl('', Validators.email),
    posteOccupe: new FormControl('', Validators.nullValidator),
    descriptionDetaillee: new FormControl('', Validators.nullValidator),
    username: new FormControl('', Validators.nullValidator),
    password: new FormControl('', Validators.nullValidator),
    entreprise: new FormControl('', Validators.nullValidator)
  });

  constructor(
    private partenairesService: PartenairesService, 
    private utilService: UtilService, 
    private uploadService: FileUploadService,
    private dialogRef: MatDialogRef<DialogAddPartenairesComponent>)
    {
      this.entreprise = new Entreprise(null, null, null);
    }

  ngOnInit() {}
  
    //ferme la modale et submit le formulaire
  save() {
    this.dialogRef.close(this.formPartenaire.value);
  }

  //Quand on ajoute un Partenaire : un EVENT est envoyé au Parent pour rafraichir la table
  refreshTableFunction($event){
    this.refreshTableEvent.emit($event);
  }

  //Parent intercepte l'event envoyé par son fils : <app-liste-entreprises> qui génére un EventEmitter
  entrepriseIdEventListner($event){
    this.entreprise.idEntreprise=$event;
  }

  //Ajouter un partenaire 
  addPartenaireController() {
    this.formPartenaire.patchValue({
      entreprise: this.entreprise,
    });
    this.partenairesService.addPartenaireService(this.formPartenaire.value)
    .subscribe
      (res => 
        { if(res != null)
          { 
          this.addPhotoController(res.id);
          //Placer un <mat-progress-spinner> ici
          this.refreshTableFunction(true);
          this.utilService.openSnackBar("Partenaire ajouté", "OK"); 
          }
        }
      )
      this.formPartenaire.reset();  
  }

  //FileUpload
  selectFile($event) {
    this.selectedFiles = $event.target.files;
  }
 
  addPhotoController(id) {

    if(this.selectedFiles !=  null)
    {
    this.currentFileUpload = this.selectedFiles.item(0);

    this.uploadService.addPhotoPartenaire(this.currentFileUpload, id).subscribe(event => 
      {
        if (event.type === HttpEventType.UploadProgress) 
        {
          this.progress.percentage = Math.round(100 * event.loaded / event.total);
        } 
        else if (event instanceof HttpResponse) 
        {
          console.log('File is completely uploaded!');
        }
      });
    this.selectedFiles = undefined;
    }
  }
}