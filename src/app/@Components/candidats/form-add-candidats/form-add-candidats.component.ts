import { Component, OnInit , Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { HttpEventType, HttpResponse } from '@angular/common/http';
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


@Component({
  selector: 'app-form-add-candidats',
  templateUrl: './form-add-candidats.component.html',
  styleUrls: ['./form-add-candidats.component.css']

})
export class FormAddCandidatsComponent implements OnInit {

  // Afin de fermer le sidenav du parent
  @Input() inputSideNav: MatSidenav;

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
    email: new FormControl('', Validators.email),
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

  }, { updateOn: 'change' });

  constructor(
    private candidatsService: CandidatsService,
    private utilService: UtilService,
    private uploadService: FileUploadService) {
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

    console.log('this.formCandidat.value : ' + this.formCandidat.value);

    this.candidatsService.addCandidatService(this.formCandidat.value)
    .subscribe
      (res => {
          if (res != null) {
          this.addFilesController(res.id);
          this.refreshTableFunction(true);
          this.utilService.openSnackBar('Candidat ajouté', 'OK');
          } else {
            this.utilService.openSnackBar('Veuillez vérifier vos paramètres', 'Erreur');
          }
        }
      );

    this.formCandidat.reset();

      // Faire le reset aux 3 listes filles
    this.childListeTechnologies.ngOnInit();
    this.childListeOpportunites.ngOnInit();
    this.childListeCertifications.ngOnInit();

  }

  // File Upload : Photo de profil + Cv Odix + Cv Original
  selectFile($event, typeFile) {
    if (typeFile === 'photodeprofil') {
      this.selectedFilesPhoto = $event.target.files;
    }

    if (typeFile === 'cvodix') {
      this.selectedFilesCvOdix = $event.target.files;
    }

    if (typeFile === 'cvoriginal') {
      this.selectedFilesCvOriginal = $event.target.files;
    }

  }

  // Fonction qui s'éxécute pour faire l'upload des 3 files
  addFilesController(id) {
    // Upload All 3 Files
    if (this.selectedFilesPhoto !=  null) {
        this.currentFileUploadPhoto = this.selectedFilesPhoto.item(0);

        this.uploadService.addPhotoCandidat(this.currentFileUploadPhoto, id).subscribe(event => {
              console.log('Photo is completely uploaded!');
          });

        this.selectedFilesPhoto = undefined;
      }

    if (this.selectedFilesCvOdix !=  null) {
        this.currentFileUploadCvOdix = this.selectedFilesCvOdix.item(0);

        this.uploadService.addCvOdixCandidat(this.currentFileUploadCvOdix, id).subscribe(event => {
              console.log('CvOdix is completely uploaded!');
          });

        this.selectedFilesCvOdix = undefined;
      }

    if (this.selectedFilesCvOriginal !=  null) {
        this.currentFileUploadCvOriginal = this.selectedFilesCvOriginal.item(0);

        this.uploadService.addCvOriginalCandidat(this.currentFileUploadCvOriginal, id).subscribe(event => {
              console.log('CvOriginal is completely uploaded!');
          });

        this.selectedFilesCvOriginal = undefined;
      }
  }

}
