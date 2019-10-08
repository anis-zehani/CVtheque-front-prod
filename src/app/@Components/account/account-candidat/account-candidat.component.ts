import { Component, OnInit } from '@angular/core';
import { CandidatsService } from '../../../@Services/candidats.service';
import { UtilService } from '../../../@Util/util.service';
import { FileUploadService } from '../../../@Services/file-upload.service';

import { environment } from '../../../../environments/environment';
import { Candidat } from 'src/app/@Models/candidat';
import { Diplome } from 'src/app/@Models/diplome';
import { Visa } from 'src/app/@Models/visa';
import { Curriculum } from 'src/app/@Models/curriculum';

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

  // FileUpload : CvOriginal AutoFill
  selectedFilesCvOriginalAutoFill: FileList;
  currentFileUploadCvOriginalAutoFill: File;

  constructor(private candidatsService: CandidatsService, private utilService: UtilService, private uploadService: FileUploadService) {
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
    this.getOneCandidatsController(this.id);
  }

  // Afficher le Candidat
  getOneCandidatsController(id): void {
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
        this.utilService.openSnackBar('Votre profil a été mis à jour', 'OK');
      },
      error: () => {
        this.utilService.openSnackBar('Une erreur est survenue durant la mise à jour', 'Erreur');
      }
    });
  }

  // Upload Photo de Profil AutoFill
  async editPhotoProfilAutoFill(id) {
    if (this.selectedFilesPhotoAutoFill !=  null) {
        this.currentFileUploadPhotoAutoFill = this.selectedFilesPhotoAutoFill.item(0);
        const result = await this.uploadService.addPhotoCandidatAutoFill(this.currentFileUploadPhotoAutoFill, id);
        this.selectedFilesPhotoAutoFill = undefined;
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
}
