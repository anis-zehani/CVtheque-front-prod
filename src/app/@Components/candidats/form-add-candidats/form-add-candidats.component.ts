import { Component, OnInit , Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { MatSidenav } from '@angular/material/sidenav';
import { CandidatsService } from '../../../@Services/candidats.service';
import { UtilService } from '../../../@Util/util.service';
import { FileUploadService } from '../../../@Services/file-upload.service';
import { Entreprise } from 'src/app/@Models/entreprise';
import { Ecole } from 'src/app/@Models/ecole';
import { Diplome } from 'src/app/@Models/diplome';
import { Curriculum } from 'src/app/@Models/curriculum';
import { Visa } from 'src/app/@Models/visa';
import { Technologie } from 'src/app/@Models/technologie';
import { Opportunite } from 'src/app/@Models/opportunite';
import { Certification } from 'src/app/@Models/certification';
import { ListeTechnologiesForAddComponent } from '../../../@Components/technologies/liste-technologies-for-add/liste-technologies-for-add.component';
import { ListeOpportunitesForAddComponent } from '../../../@Components/opportunites/liste-opportunites-for-add/liste-opportunites-for-add.component';
import { ListeCertificationsForAddComponent } from '../../../@Components/certifications/liste-certifications-for-add/liste-certifications-for-add.component';
import { Router } from '@angular/router';
import { MatSpinnerComponent } from '../../dialogs/mat-spinner/mat-spinner.component';


@Component({
  selector: 'app-form-add-candidats',
  templateUrl: './form-add-candidats.component.html',
  styleUrls: ['./form-add-candidats.component.css']

})
export class FormAddCandidatsComponent implements OnInit {

  // Afin de fermer le sidenav du parent
  @Input() inputSideNav: MatSidenav;

  namePhoto = 'Aucune photo de profil';
  nameCvOdix = 'Aucun fichier choisi';
  nameCvOriginal = 'Aucun fichier choisi';

  // Envoi l'event pour mettre à jour la table
  @Output() refreshTableEvent = new EventEmitter<Event>();

  entreprise: Entreprise;
  ecole: Ecole;
  diplome: Diplome;
  curriculum: Curriculum;
  visa: Visa;
  listeTechnologies: Technologie[];
  listeOpportunites: Opportunite[];
  listeCertifications: Certification[];

  listeTechnologiesFinale: Technologie[] = [];
  listeOpportunitesFinale: Opportunite[] = [];
  listeCertificationsFinale: Certification[] = [];

  @ViewChild(ListeTechnologiesForAddComponent, {static: false}) childListeTechnologies: ListeTechnologiesForAddComponent;
  @ViewChild(ListeOpportunitesForAddComponent, {static: false}) childListeOpportunites: ListeOpportunitesForAddComponent;
  @ViewChild(ListeCertificationsForAddComponent, {static: false}) childListeCertifications: ListeCertificationsForAddComponent;

  public defaultSituationFamiliale: 'Non_Mentionee';

  // FileUpload : Photo
  selectedFilesPhoto: FileList;
  currentFileUploadPhoto: File;

  // FileUpload : CvOdix
  selectedFilesCvOdix: FileList;
  currentFileUploadCvOdix: File;

  // FileUpload : CvOriginal
  selectedFilesCvOriginal: FileList;
  currentFileUploadCvOriginal: File;

  // Mon Reactive Form
  formCandidat = new FormGroup({
    // Informations basiques
    identite: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    telephone: new FormControl('', Validators.nullValidator),
    email: new FormControl('', Validators.required),
    posteOccupe: new FormControl('', Validators.nullValidator),
    descriptionDetaillee: new FormControl('', Validators.nullValidator),
    entreprise: new FormControl('', Validators.nullValidator),

    // Informations spécifiques
    salaireActuel: new FormControl('', Validators.nullValidator),
    pretentionSalariale: new FormControl('', Validators.nullValidator),
    situationFamiliale: new FormControl('Non_Mentionee', Validators.nullValidator),
    nombreEnfants: new FormControl('', Validators.nullValidator),
    adresse: new FormControl('', Validators.nullValidator),
    dateDeNaissance: new FormControl('', Validators.nullValidator),
    niveauEnFrancais: new FormControl('Non_Mentionee', Validators.nullValidator),
    niveauEnAnglais: new FormControl('Non_Mentionee', Validators.nullValidator),
    noteGlobale: new FormControl('Non_Mentionee', Validators.nullValidator),
    disponibilite: new FormControl('Non_Mentionee', Validators.nullValidator),
    dateDemarrageCarriere: new FormControl('', Validators.nullValidator),
    dateEpuisementPasseport: new FormControl('', Validators.nullValidator),

    // Diplôme
    typeDiplome: new FormControl('Non_Mentionee', Validators.nullValidator),
    ecole: new FormControl('', Validators.nullValidator),
    dateObtentionDiplome: new FormControl('', Validators.nullValidator),

    // Visa
    typeVisa: new FormControl('Non_Mentionee', Validators.nullValidator),
    dateDebutVisa: new FormControl('', Validators.nullValidator),
    dateFinVisa: new FormControl('', Validators.nullValidator),

    diplome: new FormControl('', Validators.nullValidator),
    visa: new FormControl('', Validators.nullValidator),

    listeTechnologies: new FormControl('', Validators.nullValidator),
    listeOpportunites: new FormControl('', Validators.nullValidator),
    listeCertifications: new FormControl('', Validators.nullValidator)

  });

  constructor(
    private router: Router,
    private candidatsService: CandidatsService,
    private utilService: UtilService,
    private uploadService: FileUploadService,
    public dialog: MatDialog) {
      this.entreprise = new Entreprise(null, null, null);
      this.ecole = new Ecole();
      this.diplome = new Diplome();
      this.visa = new Visa();
    }

  ngOnInit() {}

  // Quand on ajoute un Candidat : un EVENT est envoyé au Parent pour rafraichir la table
  refreshTableFunction($event) {
    this.refreshTableEvent.emit($event);
  }

  // Parent intercepte l'event envoyé par son fils : <app-liste-entreprises> qui génére un EventEmitter
  entrepriseIdEventListner($event) {
    this.entreprise.idEntreprise = $event;
  }

  // Parent intercepte l'event envoyé par son fils : <app-liste-ecoles> qui génére un EventEmitter
  ecoleIdEventListner($event) {
    this.ecole.idEcole = $event;
  }

  // Parent intercepte l'event envoyé par son fils : <app-liste-technologies-for-add> qui génére un EventEmitter
  listeTechnologiesEventListner($event) {

    this.listeTechnologiesFinale = [];
    for (let i = 0; i < $event.length; i++) {
      const technologie = new Technologie($event[i]._value.id, $event[i]._value.nomTechnologie, null);
      this.listeTechnologiesFinale.push(technologie);
    }
    this.listeTechnologies = this.listeTechnologiesFinale;
  }

  // Parent intercepte l'event envoyé par son fils : <app-liste-opportunites> qui génére un EventEmitter
  listeOpportunitesEventListner($event) {

    this.listeOpportunitesFinale = [];

    for (let i = 0; i < $event.length; i++) {
      const opportunite = new Opportunite($event[i]._value.id, $event[i]._value.titreOpportunite);
      this.listeOpportunitesFinale.push(opportunite);
    }
    this.listeOpportunites = this.listeOpportunitesFinale;
  }

  // Parent intercepte l'event envoyé par son fils : <app-liste-certifications> qui génére un EventEmitter
  listeCertificationsEventListner($event) {

    this.listeCertificationsFinale = [];

    for (let i = 0; i < $event.length; i++) {
      const certification = new Certification($event[i]._value.id, $event[i]._value.nomCertification, null);
      this.listeCertificationsFinale.push(certification);
    }
    this.listeCertifications = this.listeCertificationsFinale;

  }

  // Ajouter un candidat
  addCandidatController() {
    // On ouvre la modale Spinner
    this.openDialogSpinner();
    // Remplissage Objet Diplome
    this.diplome.typeDiplome = this.formCandidat.value.typeDiplome;
    this.diplome.ecole = this.ecole;
    this.diplome.dateObtentionDiplome = this.formCandidat.value.dateObtentionDiplome;

    // Remplissage Objet Visa
    this.visa.typeVisa = this.formCandidat.value.typeVisa;
    this.visa.dateDebutVisa = this.formCandidat.value.dateDebutVisa;
    this.visa.dateFinVisa = this.formCandidat.value.dateFinVisa;

    // Insertion des objets supplémentaires
    this.formCandidat.patchValue({
      entreprise: this.entreprise,
      diplome: this.diplome,
      visa: this.visa,

      listeTechnologies : this.listeTechnologies,
      listeOpportunites : this.listeOpportunites,
      listeCertifications :  this.listeCertifications
    });

    // Suppression des objets redondants : Diplome
    this.formCandidat.removeControl('typeDiplome');
    this.formCandidat.removeControl('ecole');
    this.formCandidat.removeControl('dateObtentionDiplome');

    // Suppression des objets redondants : Visa
    this.formCandidat.removeControl('typeVisa');
    this.formCandidat.removeControl('dateDebutVisa');
    this.formCandidat.removeControl('dateFinVisa');

    this.candidatsService.addCandidatService(this.formCandidat.value)
    .subscribe({
      next: (res) => {
        this.addPhotoProfil(res.id);
        // On ferme la modale Spinner
        this.closeDialogSpinner();
        this.utilService.openSnackBar('Candidat ajouté', 'OK');
      },
      error: () => {
        this.utilService.openSnackBar('Une erreur est survenue durant l\'ajout du candidat', 'Erreur');
      }
  });
  }

  // File Upload : Photo de profil
  selectPhotoProfil($event, typeFile) {
    if (typeFile === 'photodeprofil') {
      this.selectedFilesPhoto = $event.target.files;
      this.namePhoto = this.selectedFilesPhoto.item(0).name;
    }
  }
  // File Upload : Cv Odix
  selectCvOdix($event, typeFile) {
    if (typeFile === 'cvodix') {
      this.selectedFilesCvOdix = $event.target.files;
      this.nameCvOdix = this.selectedFilesCvOdix.item(0).name;
    }
  }
  // File Upload : Cv Original
  selectCvOriginal($event, typeFile) {
    if (typeFile === 'cvoriginal') {
      this.selectedFilesCvOriginal = $event.target.files;
      this.nameCvOriginal = this.selectedFilesCvOriginal.item(0).name;
    }
  }

  // Upload Photo de Profil
  async addPhotoProfil(id) {
    if (this.selectedFilesPhoto !=  null) {
        this.currentFileUploadPhoto = this.selectedFilesPhoto.item(0);
        const result = await this.uploadService.addPhotoCandidat(this.currentFileUploadPhoto, id);
        if (result != null) {
          this.addCvOdix(id);
        }
        this.selectedFilesPhoto = undefined;

    } else {
      this.addCvOdix(id);
    }
  }

  // Upload Cv Odix
  async addCvOdix(id) {
    if (this.selectedFilesCvOdix !=  null) {
        this.currentFileUploadCvOdix = this.selectedFilesCvOdix.item(0);
        const result = await this.uploadService.addCvOdixCandidat(this.currentFileUploadCvOdix, id);
        if (result != null) {
          this.addCvOriginal(id);
        }
        this.selectedFilesCvOdix = undefined;

    } else {
        this.addCvOriginal(id);
    }
  }

  // Upload Cv Original
  async addCvOriginal(id) {
    if (this.selectedFilesCvOriginal !=  null) {
        this.currentFileUploadCvOriginal = this.selectedFilesCvOriginal.item(0);
        const result = await this.uploadService.addCvOriginalCandidat(this.currentFileUploadCvOriginal, id);
        this.selectedFilesCvOriginal = undefined;
        if (result != null) {
           window.location.href = '/candidats';
        }
    } else {
       window.location.href = '/candidats';
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
    this.refreshTableFunction(null);
  }
}
