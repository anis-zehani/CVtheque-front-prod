import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';

import { UtilService } from '../../../@Util/util.service';
import { SharedDataService } from '../../../@Services/shared-data.service';
import { FormEditOpportunitesComponent } from '../../../@Components/opportunites/form-edit-opportunites/form-edit-opportunites.component';
import { DeleteConfirmationComponent } from '../../../@Components/dialogs/delete-confirmation/delete-confirmation.component';
import { ShowOpportuniteComponent } from '../../../@Components/opportunites/show-opportunite/show-opportunite.component';
import { Opportunite } from 'src/app/@Models/opportunite';
import { OpportunitesService } from '../../../@Services/opportunites.service';
import { Partenaire } from '../../../@Models/partenaire';
import { Technologie } from 'src/app/@Models/technologie';
import { Certification } from 'src/app/@Models/certification';

@Component({
  providers: [DatePipe],
  selector: 'app-liste-opportunites-for-show',
  templateUrl: './liste-opportunites-for-show.component.html',
  styleUrls: ['./liste-opportunites-for-show.component.css']
})
export class ListeOpportunitesForShowComponent implements OnInit {

  @Input() listeOpportunites: Opportunite[] = [];

  @Input() idTechnologie;
  @Input() idCertification;
  @Input() idPartenaire;

  role: string;
  opportunite: Opportunite;
  responsableOpportunite: Partenaire;
  etatOpportunite = 'True';

  listeTechnologiesFinale: Technologie[] = [];
  valueOfListeTechnologie: any = null;
  valueOfListeTechnologieIsModified = false;

  listeCertificationsFinale: Certification[] = [];
  valueOfListeCertification: any = null;
  valueOfListeCertificationIsModified = false;

  constructor(
    private opportunitesService: OpportunitesService,
    private utilService: UtilService,
    public dialog: MatDialog,
    private datePipe: DatePipe,
    private sharedService: SharedDataService
  ) {
    this.opportunite = new Opportunite(null, null);
    this.responsableOpportunite =  new Partenaire();
    this.opportunite.responsableOpportunite = this.responsableOpportunite;
  }

  ngOnInit() {

    // je récupère le rôle pour la restriction d'accès dans le menu
    this.role = this.utilService.getRoleUtilisateurFromToken();

    if (this.idTechnologie != null) {
      this.getAllOpportunitesByTechnologieController(this.idTechnologie);
    }
    if (this.idCertification != null) {
      this. getAllOpportunitesByCertificationController(this.idCertification);
    }
    if (this.idPartenaire != null) {
      this.getAllOpportunitesByPartenaireController(this.idPartenaire);
    }

    // Afin de pouvoir récupérer la liste des technologies modifiées
    this.sharedService.valueOfListeTechnologie.subscribe(valueOfListeTechnologieOpportunite => this.valueOfListeTechnologie = valueOfListeTechnologieOpportunite);
    this.sharedService.valueOfListeTechnologieIsModified.subscribe(valueOfListeTechnologieOpportuniteIsModified => this.valueOfListeTechnologieIsModified = valueOfListeTechnologieOpportuniteIsModified);

    // Afin de pouvoir récupérer la liste des certifications modifiées
    this.sharedService.valueOfListeCertification.subscribe(valueOfListeCertificationOpportunite => this.valueOfListeCertification = valueOfListeCertificationOpportunite);
    this.sharedService.valueOfListeCertificationIsModified.subscribe(valueOfListeCertificationOpportuniteIsModified => this.valueOfListeCertificationIsModified = valueOfListeCertificationOpportuniteIsModified);
  }

  // Lister toutes les opportunités par Technologie
  getAllOpportunitesByTechnologieController(idTechnologie): void {
    this.opportunitesService.getAllOpportunitesByTechnologieService(idTechnologie)
      .subscribe
        (
        res => {this.listeOpportunites = res; }
        );
  }

  // Lister toutes les opportunités par Certification
  getAllOpportunitesByCertificationController(idCertification): void {
    this.opportunitesService.getAllOpportunitesByCertificationService(idCertification)
      .subscribe
        (
        res => {this.listeOpportunites = res; }
        );
  }

  // Lister toutes les opportunités par Partenaire
  getAllOpportunitesByPartenaireController(idPartenaire): void {
    this.opportunitesService.getAllOpportunitesByPartenaireService(idPartenaire)
      .subscribe
        (
        res => {this.listeOpportunites = res; }
        );
  }

  // Modifier une opportunité
  editOpportuniteController() {
    this.opportunitesService.editOpportuniteService(this.opportunite)
      .subscribe
      (
        res => {
          if (res != null) {
            if (this.idTechnologie != null) {
              this.getAllOpportunitesByTechnologieController(this.idTechnologie);
            }
            if (this.idCertification != null) {
              this. getAllOpportunitesByCertificationController(this.idCertification);
            }
            if (this.idPartenaire != null) {
              this.getAllOpportunitesByPartenaireController(this.idPartenaire);
            }
            this.utilService.openSnackBar('Opportunité modifiée', 'OK');
          }
        }
      );
  }

  // Supprimer le lien avec une technologie
  deleteLinkOpportuniteTechnologieController(idOpportunite) {
    this.opportunitesService.deleteLinkOpportuniteTechnologieService(idOpportunite, this.idTechnologie)
    .subscribe
      (
      res => {
        this.getAllOpportunitesByTechnologieController(this.idTechnologie);

        this.utilService.openSnackBar('La liste des opportunités liées a été modifiée', 'OK');
      }
      );
  }

  // Supprimer le lien avec une certification
  deleteLinkOpportuniteCertificationController(idOpportunite) {
    this.opportunitesService.deleteLinkOpportuniteCertificationService(idOpportunite, this.idCertification)
    .subscribe
      (
      res => {
        this.getAllOpportunitesByCertificationController(this.idCertification);

        this.utilService.openSnackBar('La liste des opportunités liées a été modifiée', 'OK');
      }
      );
  }

  // Update le lien avec un partenaire
  updateLinkOpportunitePartenaireController(idOpportunite) {
      this.opportunitesService.updateLinkOpportunitePartenaireService(idOpportunite)
      .subscribe
        (
        res => {
          this.getAllOpportunitesByPartenaireController(this.idPartenaire);

          this.utilService.openSnackBar('La liste des opportunités liées a été modifiée', 'OK');
        }
        );
  }

  // Ouvre le pop-up pour modifier une opportunité
  openDialogEditOpportunite(id, titreOpportunite, descriptionOpportunite, dateAjout, dateDemarrageSouhaitee, tjmOpportunite, etatOpportunite, responsableOpportunite, listeTechnologies, listeCertifications): void {
      // Objet pour configurer la modale
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.hasBackdrop = true;
      dialogConfig.closeOnNavigation = true;

      // Objet pour déclencher l'ouverture de la modale
      const dialogRef = this.dialog.open(FormEditOpportunitesComponent, {
        width: '1000px',
        height: '550px',
        data: {
          id,
          titreOpportunite,
          descriptionOpportunite,
          dateAjout,
          dateDemarrageSouhaitee : this.datePipe.transform(dateDemarrageSouhaitee, 'yyyy-MM-dd'),
          tjmOpportunite,
          etatOpportunite,
          responsableOpportunite,
          listeTechnologies,
          listeCertifications
        }
      });

      // Fonction qui s'éxècute quand je ferme la modale
      dialogRef.afterClosed().subscribe(result => {

        if (result) {
            this.opportunite.id = result.id;
            this.opportunite.titreOpportunite = result.titreOpportunite;
            this.opportunite.descriptionOpportunite = result.descriptionOpportunite;
            this.opportunite.dateDemarrageSouhaitee = result.dateDemarrageSouhaitee;
            this.opportunite.dateAjout = result.dateAjout;
            this.opportunite.tjmOpportunite = result.tjmOpportunite;
            this.opportunite.etatOpportunite = result.etatOpportunite;

            // Responsable opportunité
            if (result.responsableOpportunite != null) {
              this.opportunite.responsableOpportunite.id = result.responsableOpportunite.id;
            }

            // listeTechnologies : J'utilise une variable partagée via le shared-data service
            // detection du changement sur la liste
            if (this.valueOfListeTechnologie != null && this.valueOfListeTechnologieIsModified === true) {
              for (const i in this.valueOfListeTechnologie.source.selectedOptions.selected) {
                const technologie = new Technologie(this.valueOfListeTechnologie.source.selectedOptions.selected[i].value.id, this.valueOfListeTechnologie.source.selectedOptions.selected[i].value.nomTechnologie, null);
                this.listeTechnologiesFinale.push(technologie);
              }
              this.opportunite.listeTechnologies = this.listeTechnologiesFinale;
              this.sharedService.changeListeTechnologieIsModified(false);
            } else {
              this.opportunite.listeTechnologies = result.listeTechnologies;
            }

            // Vidage du Array
            this.listeTechnologiesFinale = [];


            // listeCertifications : J'utilise une variable partagée via le shared-data service
            // detection du changement sur la liste
            if (this.valueOfListeCertification != null && this.valueOfListeCertificationIsModified === true) {
              for (const i in this.valueOfListeCertification.source.selectedOptions.selected) {
                const certification = new Certification(this.valueOfListeCertification.source.selectedOptions.selected[i].value.id, this.valueOfListeCertification.source.selectedOptions.selected[i].value.nomCertification, null);
                this.listeCertificationsFinale.push(certification);
              }
              this.opportunite.listeCertifications = this.listeCertificationsFinale;
              this.sharedService.changeListeCertificationIsModified(false);
            } else {
              this.opportunite.listeCertifications = result.listeCertifications;
            }

            // Vidage du Array
            this.listeCertificationsFinale = [];

            this.editOpportuniteController();
            }
      });
  }

  // Ouvre le pop-up pour afficher une opportunité
  openDialogShowOpportunite(id, titreOpportunite, descriptionOpportunite, dateAjout, dateDemarrageSouhaitee, tjmOpportunite, etatOpportunite, responsableOpportunite, listeTechnologies, listeCertifications): void {
      // Objet pour configurer la modale
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.hasBackdrop = true;
      dialogConfig.closeOnNavigation = true;

      // Objet pour déclencher l'ouverture de la modale
      const dialogRef = this.dialog.open(ShowOpportuniteComponent, {
        width: '1000px',
        height: '550px',
        data: {
          id,
          titreOpportunite,
          descriptionOpportunite,
          dateAjout,
          dateDemarrageSouhaitee : this.datePipe.transform(dateDemarrageSouhaitee, 'yyyy-MM-dd'),
          tjmOpportunite,
          etatOpportunite,
          responsableOpportunite,
          listeTechnologies,
          listeCertifications
        }
      });
  }

  // Ouvre le pop-up pour Modifier le lien entre une opportunité et un partenaire
  openDialogUpdateLinkAvecOpportunite(id): void {
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
        texte : 'Attention : la liaison avec cette opportunité sera supprimée définitivement.'
      }
    });

    // Fonction qui s'éxècute quand je ferme la modale
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (this.idTechnologie != null) {
          this.deleteLinkOpportuniteTechnologieController(result.id);
        }
        if (this.idCertification != null) {
          this. deleteLinkOpportuniteCertificationController(result.id);
        }
        if (this.idPartenaire != null) {
          // met responsableOpportunite à NULL
          this.updateLinkOpportunitePartenaireController(result.id);
        }
      }
    });
  }

}
