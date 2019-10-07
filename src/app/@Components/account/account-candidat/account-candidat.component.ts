import { Component, OnInit } from '@angular/core';
import { CandidatsService } from '../../../@Services/candidats.service';
import { UtilService } from '../../../@Util/util.service';
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
  diplomeToSend: Diplome;
  visaToSend: Visa;
  curriculumToSend: Curriculum;

  constructor(private candidatsService: CandidatsService, private utilService: UtilService) {
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
    typeDiplomeAutoFill,
    ecoleAutoFill,
    dateObtentionDiplomeAutoFill,
    typeVisaAutoFill,
    dateDebutVisaAutoFill,
    dateFinVisaAutoFill,
    disponibiliteAutoFill,
    dateDemarrageCarriereAutoFill,
    dateEpuisementPasseportAutoFill,
    situationFamilialeAutoFill,
    nombreEnfantsAutoFill,
    adresseAutoFill,
    descriptionDetailleeAutoFill
  ) {
    this.candidatToSend = new Candidat(id);
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
    this.candidatToSend.diplome.typeDiplomeAutoFill = typeDiplomeAutoFill;
    this.candidatToSend.diplome.dateObtentionDiplomeAutoFill = dateObtentionDiplomeAutoFill;
    this.candidatToSend.diplome.ecoleAutoFill = ecoleAutoFill;
    // Visa
    this.candidatToSend.visa.dateDebutVisaAutoFill = dateDebutVisaAutoFill;
    this.candidatToSend.visa.dateFinVisaAutoFill = dateFinVisaAutoFill;
    this.candidatToSend.visa.typeVisaAutoFill = typeVisaAutoFill;

    this.utilService.openSnackBar('Votre profil a été mis à jour', 'OK' + id);
  }

}
