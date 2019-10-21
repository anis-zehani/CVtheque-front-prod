import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { CandidatsService } from '../../../@Services/candidats.service';
import { UtilService } from '../../../@Util/util.service';
import { FileUploadService } from '../../../@Services/file-upload.service';

import { environment } from '../../../../environments/environment';
import { Candidat } from 'src/app/@Models/candidat';
import { Diplome } from 'src/app/@Models/diplome';
import { Visa } from 'src/app/@Models/visa';
import { Curriculum } from 'src/app/@Models/curriculum';
import { MatSpinnerComponent } from '../../dialogs/mat-spinner/mat-spinner.component';

@Component({
  selector: 'app-account-candidat',
  templateUrl: './account-candidat.component.html',
  styleUrls: ['./account-candidat.component.css']
})
export class AccountCandidatComponent implements OnInit {

  // URL du serveur de stockage
  storageUrl = environment.storageUrl;

  id: number;
  candidat: Candidat;
  candidatToSend: Candidat;
  urlCvOriginalAutoFill: string;

  diplomeToSend: Diplome;
  visaToSend: Visa;
  curriculumToSend: Curriculum;

  // FileUpload : Photo AutoFill
  selectedFilesPhotoAutoFill: FileList;
  currentFileUploadPhotoAutoFill: File;
  namePhoto: string;
  // FileUpload : CvOriginal AutoFill
  selectedFilesCvOriginalAutoFill: FileList;
  currentFileUploadCvOriginalAutoFill: File;
  nameCv: string;

  constructor(
    private candidatsService: CandidatsService,
    private utilService: UtilService,
    private uploadService: FileUploadService,
    public dialog: MatDialog) {

    this.candidatToSend = new Candidat(null);

    this.diplomeToSend =  new Diplome();
    this.visaToSend = new Visa();
    this.curriculumToSend =  new Curriculum();

    this.candidatToSend.diplome = this.diplomeToSend;
    this.candidatToSend.visa = this.visaToSend;
    this.candidatToSend.curriculum = this.curriculumToSend;
  }

  ngOnInit() {
    // je récupère le id
    this.id = this.utilService.getIdUtilisateurFromToken();
    this.getOneCandidatController(this.id);
  }

  // Afficher le Candidat
  getOneCandidatController(id): void {
    this.candidatsService.getOneCandidatService(this.id)
    .subscribe
      (
      data => {
        this.candidat = data;
        // Pour contourner un bug JS
        this.urlCvOriginalAutoFill = data.curriculum.urlCvOriginalAutoFill;
      }
      );
  }

  // Click sur le bouton Modifier mes informations
  editCandidatAutoFill(
    id,
    telephoneAutoFill,
    posteOccupeAutoFill,
    entrepriseAutoFill,
    salaireActuelAutoFill,
    pretentionSalarialeAutoFill,
    dateDeNaissanceAutoFill,
    emailAutoFill,
    disponibiliteAutoFill,
    dateDemarrageCarriereAutoFill,
    dateEpuisementPasseportAutoFill,
    situationFamilialeAutoFill,
    nombreEnfantsAutoFill,
    adresseAutoFill,
    descriptionDetailleeAutoFill,
    diplome,
    visa
  ) {
    // On ouvre la modale Spinner
    this.openDialogSpinner();

    this.candidatToSend = new Candidat(id);
    this.diplomeToSend = new Diplome();
    this.visaToSend = new Visa();
    this.candidatToSend.diplome = this.diplomeToSend;
    this.candidatToSend.visa = this.visaToSend;

    this.candidatToSend.telephoneAutoFill = telephoneAutoFill;
    this.candidatToSend.posteOccupeAutoFill = posteOccupeAutoFill;
    this.candidatToSend.entrepriseAutoFill = entrepriseAutoFill;
    this.candidatToSend.salaireActuelAutoFill = salaireActuelAutoFill;
    this.candidatToSend.pretentionSalarialeAutoFill = pretentionSalarialeAutoFill;
    this.candidatToSend.dateDeNaissanceAutoFill = dateDeNaissanceAutoFill;
    this.candidatToSend.emailAutoFill = emailAutoFill;

    this.candidatToSend.disponibiliteAutoFill = disponibiliteAutoFill;
    this.candidatToSend.dateDemarrageCarriereAutoFill = dateDemarrageCarriereAutoFill;
    this.candidatToSend.dateEpuisementPasseportAutoFill = dateEpuisementPasseportAutoFill;
    this.candidatToSend.situationFamilialeAutoFill = situationFamilialeAutoFill;
    this.candidatToSend.nombreEnfantsAutoFill = nombreEnfantsAutoFill;
    this.candidatToSend.adresseAutoFill = adresseAutoFill;
    this.candidatToSend.descriptionDetailleeAutoFill = descriptionDetailleeAutoFill;

    // Diplôme
    this.candidatToSend.diplome.typeDiplomeAutoFill = diplome.typeDiplomeAutoFill;
    this.candidatToSend.diplome.dateObtentionDiplomeAutoFill = diplome.dateObtentionDiplomeAutoFill;
    this.candidatToSend.diplome.ecoleAutoFill = diplome.ecoleAutoFill;
    // Visa
    this.candidatToSend.visa.dateDebutVisaAutoFill = visa.dateDebutVisaAutoFill;
    this.candidatToSend.visa.dateFinVisaAutoFill = visa.dateFinVisaAutoFill;
    this.candidatToSend.visa.typeVisaAutoFill = visa.typeVisaAutoFill;

    this.candidatsService.editCandidatAutoFillService(this.candidatToSend)
    .subscribe({
      next: (res) => {
        // Ici on fait appel à EditPhoto qui contient l'appel Async de EditCvOriginal
        this.editPhotoProfilAutoFill(id);
        // On ferme la modale Spinner
        this.closeDialogSpinner();
        // Refresh de la UI
        this.ngOnInit();
        this.utilService.openSnackBar('Votre profil a été mis à jour', 'OK');
      },
      error: () => {
        // On ferme la modale Spinner
        this.closeDialogSpinner();
        this.utilService.openSnackBar('Une erreur est survenue durant la mise à jour du profil', 'Erreur');
      }
    });
  }

  // File Upload : Photo de profil AutoFill
  selectPhotoProfilAutoFill($event, typeFile) {
    if (typeFile === 'photodeprofilAutoFill') {
      this.selectedFilesPhotoAutoFill = $event.target.files;
      this.namePhoto = this.selectedFilesPhotoAutoFill.item(0).name;
    }
  }

  // File Upload : Cv Original AutoFill
  selectCvOriginalAutoFill($event, typeFile) {
    if (typeFile === 'cvoriginalAutoFill') {
      this.selectedFilesCvOriginalAutoFill = $event.target.files;
      this.nameCv = this.selectedFilesCvOriginalAutoFill.item(0).name;
    }
  }

  // Upload Photo de Profil AutoFill
  async editPhotoProfilAutoFill(id) {
    if (this.selectedFilesPhotoAutoFill !=  null) {
        this.currentFileUploadPhotoAutoFill = this.selectedFilesPhotoAutoFill.item(0);
        const result = await this.uploadService.addPhotoCandidatAutoFill(this.currentFileUploadPhotoAutoFill, id);
        if (result != null) {
          this.editCvOriginalAutoFill(id);
        }
        this.selectedFilesPhotoAutoFill = undefined;
    } else {
    this.editCvOriginalAutoFill(id);
    }
  }

  // Upload Cv Original AutoFill
  async editCvOriginalAutoFill(id) {
    if (this.selectedFilesCvOriginalAutoFill !=  null) {
        this.currentFileUploadCvOriginalAutoFill = this.selectedFilesCvOriginalAutoFill.item(0);
        const result = await this.uploadService.addCvOriginalCandidatAutoFill(this.currentFileUploadCvOriginalAutoFill, id);
        this.selectedFilesCvOriginalAutoFill = undefined;
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
