import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';

import { SharedDataService } from '../../../@Services/shared-data.service';
import { UtilService } from '../../../@Util/util.service';
import { DeleteConfirmationComponent } from '../../dialogs/delete-confirmation/delete-confirmation.component';
import { FormEditCandidatsComponent } from '../form-edit-candidats/form-edit-candidats.component';
import { ShowCandidatComponent } from '../show-candidat/show-candidat.component';
import { CandidatsService } from '../../../@Services/candidats.service';
import { Candidat } from 'src/app/@Models/candidat';
import { Entreprise } from '../../../@Models/entreprise';
import { Ecole } from 'src/app/@Models/ecole';
import { Curriculum } from 'src/app/@Models/curriculum';
import { Visa } from 'src/app/@Models/visa';
import { Diplome } from 'src/app/@Models/diplome';
import { Technologie } from 'src/app/@Models/technologie';
import { Opportunite } from 'src/app/@Models/opportunite';
import { Certification } from 'src/app/@Models/certification';

@Component({
  providers: [DatePipe],
  selector: 'app-liste-candidats-for-show',
  templateUrl: './liste-candidats-for-show.component.html',
  styleUrls: ['./liste-candidats-for-show.component.css']
})
export class ListeCandidatsForShowComponent implements OnInit {

  // Remplissage des listes par défaut
  listeCandidats: Candidat[] = [];

  role: string;
  candidat: Candidat;
  entreprise: Entreprise;
  diplome: Diplome;
  ecole: Ecole;
  curriculum: Curriculum;
  visa: Visa;

  listeTechnologiesFinale: Technologie[] = [];
  valueOfListeTechnologie: any = null;
  valueOfListeTechnologieIsModified = false;

  listeOpportunitesFinale: Opportunite[] = [];
  valueOfListeOpportunite: any = null;
  valueOfListeOpportuniteIsModified = false;

  listeCertificationsFinale: Certification[] = [];
  valueOfListeCertification: any = null;
  valueOfListeCertificationIsModified = false;

  @Input() idOpportunite;
  @Input() idTechnologie;
  @Input() idCertification;
  @Input() idEntreprise;

  constructor(
    private candidatsService: CandidatsService,
    public dialog: MatDialog,
    private utilService: UtilService,
    private datePipe: DatePipe,
    private sharedService: SharedDataService
    ) {
      this.candidat = new Candidat(null);

      this.entreprise =  new Entreprise(null, null, null);
      this.candidat.entreprise = this.entreprise;

      this.diplome =  new Diplome();
      this.candidat.diplome = this.diplome;

      this.ecole = new Ecole();
      this.diplome.ecole = this.ecole;

      this.visa = new Visa();
      this.candidat.visa = this.visa;
  }

  ngOnInit() {

    // je récupère le rôle pour la restriction d'accès dans le menu
    this.role = this.utilService.getRoleUtilisateurFromToken();

    if (this.idOpportunite != null) {
      this.getAllCandidatsByOpportuniteController(this.idOpportunite);
    }

    if (this.idTechnologie != null) {
      this.getAllCandidatsByTechnologieController(this.idTechnologie);
    }

    if (this.idCertification != null) {
      this.getAllCandidatsByCertificationController(this.idCertification);
    }

    if (this.idEntreprise != null) {
      this.getAllCandidatsByEntrepriseController(this.idEntreprise);
    }

    this.sharedService.valueOfListeTechnologie.subscribe(valueOfListeTechnologie => this.valueOfListeTechnologie = valueOfListeTechnologie);
    this.sharedService.valueOfListeTechnologieIsModified.subscribe(valueOfListeTechnologieIsModified => this.valueOfListeTechnologieIsModified = valueOfListeTechnologieIsModified);


    this.sharedService.valueOfListeOpportunite.subscribe(valueOfListeOpportunite => this.valueOfListeOpportunite = valueOfListeOpportunite);
    this.sharedService.valueOfListeOpportuniteIsModified.subscribe(valueOfListeOpportuniteIsModified => this.valueOfListeOpportuniteIsModified = valueOfListeOpportuniteIsModified);

    this.sharedService.valueOfListeCertification.subscribe(valueOfListeCertification => this.valueOfListeCertification = valueOfListeCertification);
    this.sharedService.valueOfListeCertificationIsModified.subscribe(valueOfListeCertificationIsModified => this.valueOfListeCertificationIsModified = valueOfListeCertificationIsModified);
  }

  // Remplir la liste par tous les candidats : selon ID opportunité fourni
  getAllCandidatsByOpportuniteController(idOpportunite): void {
    this.candidatsService.getAllCandidatsByOpportuniteService(idOpportunite)
    .subscribe
      (
      res => { this.listeCandidats = res; }
      );
  }

  // Remplir la liste par tous les candidats : selon ID Technologie fourni
  getAllCandidatsByTechnologieController(idTechnologie): void {
      this.candidatsService.getAllCandidatsByTechnologieService(idTechnologie)
      .subscribe
        (
        res => { this.listeCandidats = res; }
        );
  }

  // Remplir la liste par tous les candidats : selon ID Certification fourni
  getAllCandidatsByCertificationController(idCertification): void {
    this.candidatsService.getAllCandidatsByCertificationService(idCertification)
    .subscribe
      (
      res => { this.listeCandidats = res; }
      );
  }

  // Remplir la liste par tous les candidats : selon ID Entreprise fourni
  getAllCandidatsByEntrepriseController(idEntreprise): void {
      this.candidatsService.getAllCandidatsByEntrepriseService(idEntreprise)
      .subscribe
        (
        res => { this.listeCandidats = res; }
        );
  }

  // Modifier le lien entre un candidat et une opportunité
  editCandidatController() {
    this.candidatsService.editCandidatService(this.candidat)
    .subscribe
      (
      res => {
        if (res != null) {
          if (this.idOpportunite != null) {
            this.getAllCandidatsByOpportuniteController(this.idOpportunite);
          }
          if (this.idTechnologie != null) {
            this.getAllCandidatsByTechnologieController(this.idTechnologie);
          }
          if (this.idCertification != null) {
            this.getAllCandidatsByCertificationController(this.idCertification);
          }
          this.utilService.openSnackBar('Candidat modifié', 'OK');
        }
      }
      );
  }

  // Supprimer le lien entre un candidat et une opportunité
  deleteLinkCandidatOpportuniteController(idCandidat) {
    this.candidatsService.deleteLinkCandidatOpportuniteService(idCandidat, this.idOpportunite)
    .subscribe
      (
      res => {
        this.getAllCandidatsByOpportuniteController(this.idOpportunite);

        this.utilService.openSnackBar('La liste des candidats liés a été modifiée', 'OK');
      }
      );
  }

  // Supprimer le lien entre un candidat et une technologie
  deleteLinkCandidatTechnologieController(idCandidat) {
    this.candidatsService.deleteLinkCandidatTechnologieService(idCandidat, this.idTechnologie)
    .subscribe
      (
      res => {
        this.getAllCandidatsByTechnologieController(this.idTechnologie);

        this.utilService.openSnackBar('La liste des candidats liés a été modifiée', 'OK');
      }
      );
  }

  // Supprimer le lien entre un candidat et une certification
  deleteLinkCandidatCertificationController(idCandidat) {
    this.candidatsService.deleteLinkCandidatCertificationService(idCandidat, this.idCertification)
    .subscribe
      (
      res => {
        this.getAllCandidatsByTechnologieController(this.idTechnologie);

        this.utilService.openSnackBar('La liste des candidats liés a été modifiée', 'OK');
      }
      );
  }

  // UPDATE le lien entre un candiat et une entreprise : met entreprise à NULL
  updateLinkCandidatEntrepriseController(idCandidat) {
    this.candidatsService.updateLinkCandidatEntrepriseService(idCandidat)
    .subscribe
      (
      res => {
        this.getAllCandidatsByEntrepriseController(this.idEntreprise);

        this.utilService.openSnackBar('La liste des candidats liés a été modifiée', 'OK');
      }
      );
  }

  // Ouvre le pop-up pour afficher un candidat
  openDialogShowCandidat(
      id,
      identite,
      telephone,
      email,
      posteOccupe,
      descriptionDetaillee,
      urlPhoto,
      etatCandidat,
      entreprise,
      salaireActuel,
      pretentionSalariale,
      situationFamiliale,
      nombreEnfants,
      adresse,
      dateDeNaissance,
      niveauEnFrancais,
      niveauEnAnglais,
      noteGlobale,
      disponibilite,
      dateDemarrageCarriere,
      dateEpuisementPasseport,

      diplome,
      visa,
      curriculum,

      listeTechnologies,
      listeOpportunites,
      listeCertifications

      ): void {
        // Objet pour configurer la modale
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.hasBackdrop = true;
        dialogConfig.closeOnNavigation = true;

        let nombreEnfantsGaranti = '';
        if (nombreEnfants != null) {
          nombreEnfantsGaranti = nombreEnfants;
        }


        if (diplome.dateObtentionDiplome != null) {
          diplome.dateObtentionDiplome = this.datePipe.transform(diplome.dateObtentionDiplome, 'yyyy-MM-dd');
        }

        if (visa.dateDebutVisa != null) {
          visa.dateDebutVisa = this.datePipe.transform(visa.dateDebutVisa, 'yyyy-MM-dd');
        }

        if (visa.dateFinVisa != null) {
          visa.dateFinVisa = this.datePipe.transform(visa.dateFinVisa, 'yyyy-MM-dd');
        }


        // Objet pour déclencher l'ouverture de la modale
        const dialogRef = this.dialog.open(ShowCandidatComponent, {
          width: '1050px',
          height: '650px',
          data: {
            id,
            identite,
            telephone,
            email,
            posteOccupe,
            descriptionDetaillee,
            urlPhoto,
            etatCandidat,
            entreprise,

            // Informations spécifiques
            salaireActuel,
            pretentionSalariale,
            situationFamiliale,
            // Pour éviter qu'il soit null
            nombreEnfants: nombreEnfantsGaranti,
            adresse,
            dateDeNaissance: this.datePipe.transform(dateDeNaissance, 'yyyy-MM-dd'),
            niveauEnFrancais,
            niveauEnAnglais,
            noteGlobale,
            disponibilite,
            dateDemarrageCarriere: this.datePipe.transform(dateDemarrageCarriere, 'yyyy-MM-dd'),
            dateEpuisementPasseport: this.datePipe.transform(dateEpuisementPasseport, 'yyyy-MM-dd'),

            // Diplôme
            diplome,

            // Visa
            visa,

            // Curriculum
            curriculum,

            // Les 3 listes
            listeTechnologies,
            listeOpportunites,
            listeCertifications
          }
        });
  }

  // Ouvre le pop-up pour modifier un candidat
  openDialogEditCandidat(
    id,
    identite,
    telephone,
    email,
    posteOccupe,
    descriptionDetaillee,
    urlPhoto,
    etatCandidat,
    entreprise,
    salaireActuel,
    pretentionSalariale,
    situationFamiliale,
    nombreEnfants,
    adresse,
    dateDeNaissance,
    niveauEnFrancais,
    niveauEnAnglais,
    noteGlobale,
    disponibilite,
    dateDemarrageCarriere,
    dateEpuisementPasseport,

    diplome,
    visa,
    curriculum,

    listeTechnologies,
    listeOpportunites,
    listeCertifications

    ): void {
      // Objet pour configurer la modale
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.hasBackdrop = true;
      dialogConfig.closeOnNavigation = true;

      let nombreEnfantsGaranti = '';
      if (nombreEnfants != null) {
        nombreEnfantsGaranti = nombreEnfants;
      }


      if (diplome.dateObtentionDiplome != null) {
        diplome.dateObtentionDiplome = this.datePipe.transform(diplome.dateObtentionDiplome, 'yyyy-MM-dd');
      }

      if (visa.dateDebutVisa != null) {
        visa.dateDebutVisa = this.datePipe.transform(visa.dateDebutVisa, 'yyyy-MM-dd');
      }

      if (visa.dateFinVisa != null) {
        visa.dateFinVisa = this.datePipe.transform(visa.dateFinVisa, 'yyyy-MM-dd');
      }


      // Objet pour déclencher l'ouverture de la modale
      const dialogRef = this.dialog.open(FormEditCandidatsComponent, {
        width: '1050px',
        height: '650px',
        data: {
          id,
          identite,
          telephone,
          email,
          posteOccupe,
          descriptionDetaillee,
          urlPhoto,
          etatCandidat,
          entreprise,

          // Informations spécifiques
          salaireActuel,
          pretentionSalariale,
          situationFamiliale,
          // Pour éviter qu'il soit null
          nombreEnfants: nombreEnfantsGaranti,
          adresse,
          dateDeNaissance: this.datePipe.transform(dateDeNaissance, 'yyyy-MM-dd'),
          niveauEnFrancais,
          niveauEnAnglais,
          noteGlobale,
          disponibilite,
          dateDemarrageCarriere: this.datePipe.transform(dateDemarrageCarriere, 'yyyy-MM-dd'),
          dateEpuisementPasseport: this.datePipe.transform(dateEpuisementPasseport, 'yyyy-MM-dd'),

          // Diplôme
          diplome,

          // Visa
          visa,

          // Curriculum
          curriculum,

          // Les 3 listes
          listeTechnologies,
          listeOpportunites,
          listeCertifications
        }
      });

      // Fonction qui s'éxècute quand je ferme la modale
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
            this.candidat.id = result.id;
            this.candidat.identite = result.identite;
            this.candidat.telephone = result.telephone;
            this.candidat.email = result.email;
            this.candidat.posteOccupe = result.posteOccupe;
            this.candidat.descriptionDetaillee = result.descriptionDetaillee;
            this.candidat.urlPhoto = result.urlPhoto;
            this.candidat.etatCandidat = result.etatCandidat;

            if (result.entreprise != null) {
              this.candidat.entreprise.idEntreprise = result.entreprise.idEntreprise;
            }

            // Informations spécifiques
            this.candidat.salaireActuel = result.salaireActuel,
            this.candidat.pretentionSalariale = result.pretentionSalariale,
            this.candidat.situationFamiliale = result.situationFamiliale,
            this.candidat.nombreEnfants = result.nombreEnfants,
            this.candidat.adresse = result.adresse,
            this.candidat.dateDeNaissance = result.dateDeNaissance,
            this.candidat.niveauEnFrancais = result.niveauEnFrancais,
            this.candidat.niveauEnAnglais = result.niveauEnAnglais,
            this.candidat.noteGlobale = result.noteGlobale,
            this.candidat.disponibilite = result.disponibilite,
            this.candidat.dateDemarrageCarriere = result.dateDemarrageCarriere,
            this.candidat.dateEpuisementPasseport = result.dateEpuisementPasseport;

            // Diplôme
            if (result.diplome != null) {
              this.candidat.diplome.typeDiplome = result.diplome.typeDiplome;
              this.candidat.diplome.ecole = result.diplome.ecole;
              this.candidat.diplome.dateObtentionDiplome  = result.diplome.dateObtentionDiplome;
            }

            // Visa
            if (result.visa != null) {
              this.candidat.visa.typeVisa = result.visa.typeVisa;
              this.candidat.visa.dateDebutVisa = result.visa.dateDebutVisa;
              this.candidat.visa.dateFinVisa = result.visa.dateFinVisa;
            }

            // listeTechnologies : J'utilise une variable partagée via le shared-data service
            // detection du changement sur la liste
            if (this.valueOfListeTechnologie != null && this.valueOfListeTechnologieIsModified === true) {
              for (const i in this.valueOfListeTechnologie.source.selectedOptions.selected) {
                const technologie = new Technologie(this.valueOfListeTechnologie.source.selectedOptions.selected[i].value.id, this.valueOfListeTechnologie.source.selectedOptions.selected[i].value.nomTechnologie, null);
                this.listeTechnologiesFinale.push(technologie);
              }
              this.candidat.listeTechnologies = this.listeTechnologiesFinale;
              this.sharedService.changeListeTechnologieIsModified(false);
            } else {
              this.candidat.listeTechnologies = result.listeTechnologies;
            }

            // Vidage du Array
            this.listeTechnologiesFinale = [];


            // listeOpportunites : J'utilise une variable partagée via le shared-data service
            // detection du changement sur la liste
            if (this.valueOfListeOpportunite != null && this.valueOfListeOpportuniteIsModified === true) {
              for (const j in this.valueOfListeOpportunite.source.selectedOptions.selected) {
                const opportunite = new Opportunite(this.valueOfListeOpportunite.source.selectedOptions.selected[j].value.id, this.valueOfListeOpportunite.source.selectedOptions.selected[j].value.titreOpportunite);
                this.listeOpportunitesFinale.push(opportunite);

              }
              this.candidat.listeOpportunites = this.listeOpportunitesFinale;
              this.sharedService.changeListeOpportuniteIsModified(false);
            } else {
              this.candidat.listeOpportunites = result.listeOpportunites;
            }

            // Vidage du Array
            this.listeOpportunitesFinale = [];

            // listeCertifications : J'utilise une variable partagée via le shared-data service
            // detection du changement sur la liste
            if (this.valueOfListeCertification != null && this.valueOfListeCertificationIsModified === true) {
              for (const k in this.valueOfListeCertification.source.selectedOptions.selected) {
                const certification = new Certification(this.valueOfListeCertification.source.selectedOptions.selected[k].value.id, this.valueOfListeCertification.source.selectedOptions.selected[k].value.nomCertification, null);
                this.listeCertificationsFinale.push(certification);

              }
              this.candidat.listeCertifications = this.listeCertificationsFinale;
              this.sharedService.changeListeCertificationIsModified(false);
            } else {
              this.candidat.listeCertifications = result.listeCertifications;
            }

            // Vidage du Array
            this.listeCertificationsFinale = [];

            // Finalement on fait l'appel au webservice
            this.editCandidatController();
            // this.ngOnInit();

            }
      });
  }

  // Ouvre le pop-up pour supprimer la liaison entre le candidat une opportunité/technologie/certification/entreprise
  openDialogDeleteLinkCandidat(id): void {
    // Objet pour configurer la modale
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.hasBackdrop = true;
    dialogConfig.closeOnNavigation = true;

    // Objet pour déclencher l'ouverture de la modale
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      width: '450px',
      height: '180px',
      data: {
        id,
        texte : 'Attention : la liaison avec ce candidat sera supprimée définitivement.'
      }
    });

    // Fonction qui s'éxècute quand je ferme la modale
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (this.idOpportunite != null) {
          this.deleteLinkCandidatOpportuniteController(result.id);
        }

        if (this.idTechnologie != null) {
          this.deleteLinkCandidatTechnologieController(result.id);
        }

        if (this.idCertification != null) {
          this.deleteLinkCandidatCertificationController(result.id);
        }

        if (this.idEntreprise != null) {
          this.updateLinkCandidatEntrepriseController(result.id);
        }
      }
    });
  }

}
