import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatTableDataSource} from '@angular/material/table';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort} from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';

import { environment } from '../../../../environments/environment';
import { OpportunitesService } from '../../../@Services/opportunites.service';
import { Opportunite } from '../../../@Models/opportunite';
import { FormEditOpportunitesComponent } from '../../../@Components/opportunites/form-edit-opportunites/form-edit-opportunites.component';
import { DeleteConfirmationComponent } from '../../../@Components/dialogs/delete-confirmation/delete-confirmation.component';
import { ShowOpportuniteComponent } from '../../../@Components/opportunites/show-opportunite/show-opportunite.component';
import { SharedDataService } from '../../../@Services/shared-data.service';
import { ShowPartenaireComponent } from '../../../@Components/partenaires/show-partenaire/show-partenaire.component';
import { CandidatsService } from '../../../@Services/candidats.service';

import { UtilService } from '../../../@Util/util.service';
import { Partenaire } from '../../../@Models/partenaire';
import { Etat } from 'src/app/@Models/enums';
import { Technologie } from 'src/app/@Models/technologie';
import { Candidat } from 'src/app/@Models/candidat';
import { Certification } from 'src/app/@Models/certification';

@Component({
  providers: [DatePipe],
  selector: 'app-datagrid-opportunites',
  templateUrl: './datagrid-opportunites.component.html',
  styleUrls: ['./datagrid-opportunites.component.css']
})
export class DatagridOpportunitesComponent implements OnInit {

  // URL du serveur de stockage
  storageUrl = environment.storageUrl;

  @Input() listeOpportunites = new MatTableDataSource<Opportunite>();

  displayedColumns: string[];

  opportunite: Opportunite;
  role: string;
  idUtilisateur: number;
  responsableOpportunite: Partenaire;
  etatOpportunite = 'True';

  listeTechnologiesFinale: Technologie[] = [];
  valueOfListeTechnologie: any = null;
  valueOfListeTechnologieIsModified = false;

  listeCertificationsFinale: Certification[] = [];
  valueOfListeCertification: any = null;
  valueOfListeCertificationIsModified = false;

  listeCandidatsFinale: Candidat[] = [];
  valueOfListeCandidat: any = null;
  valueOfListeCandidatIsModified = false;

  listeCandidats: Candidat[] = [];

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(
    private opportunitesService: OpportunitesService,
    private utilService: UtilService,
    public dialog: MatDialog,
    private datePipe: DatePipe,
    private sharedService: SharedDataService,
    private candidatsService: CandidatsService
    ) {
    this.opportunite = new Opportunite(null, null);
    this.responsableOpportunite =  new Partenaire();
    this.opportunite.responsableOpportunite = this.responsableOpportunite;
   }

  ngOnInit() {
    // je récupère le rôle pour la restriction d'accès dans le menu
    this.role = this.utilService.getRoleUtilisateurFromToken();
    this.idUtilisateur = this.utilService.getIdUtilisateurFromToken();
    this.getAllOpportunitesController('True');


    // Displayed columns s'affiche selon le profil : Priviléges
    /*if (this.role === 'ROLE_ADMINISTRATEUR') {
      this.displayedColumns = ['responsableOpportunite', 'details', 'dateAjout', 'dateDemarrageSouhaitee', 'visibiliteOpportunite', 'etat', 'more'];
    } else {
      this.displayedColumns = ['responsableOpportunite', 'details', 'dateAjout', 'dateDemarrageSouhaitee', 'visibiliteOpportunite'];
    }*/

    this.displayedColumns = ['responsableOpportunite', 'details', 'dateAjout', 'dateDemarrageSouhaitee', 'visibiliteOpportunite', 'etat', 'more'];

    this.sharedService.valueOfListeTechnologie.subscribe(valueOfListeTechnologieOpportunite => this.valueOfListeTechnologie = valueOfListeTechnologieOpportunite);
    this.sharedService.valueOfListeTechnologieIsModified.subscribe(valueOfListeTechnologieOpportuniteIsModified => this.valueOfListeTechnologieIsModified = valueOfListeTechnologieOpportuniteIsModified);

    this.sharedService.valueOfListeCertification.subscribe(valueOfListeCertificationOpportunite => this.valueOfListeCertification = valueOfListeCertificationOpportunite);
    this.sharedService.valueOfListeCertificationIsModified.subscribe(valueOfListeCertificationOpportuniteIsModified => this.valueOfListeCertificationIsModified = valueOfListeCertificationOpportuniteIsModified);

    this.sharedService.valueOfListeCandidat.subscribe(valueOfListeCandidatOpportunite => this.valueOfListeCandidat = valueOfListeCandidatOpportunite);
    this.sharedService.valueOfListeCandidatIsModified.subscribe(valueOfListeCandidatOpportuniteIsModified => this.valueOfListeCandidatIsModified = valueOfListeCandidatOpportuniteIsModified);
  }

  // Afficher tous les opportunites : remplissage de la table
  getAllOpportunitesController(etat): void {
    if (this.role === 'ROLE_ADMINISTRATEUR') {
      this.opportunitesService.getAllOpportunitesService(etat)
      .subscribe
        (
        res => {
          this.listeOpportunites.data = res;
          this.listeOpportunites.paginator = this.paginator;
          this.listeOpportunites.sort = this.sort;
        }
        );
    } else if (this.role === 'ROLE_PARTENAIRE') {
      this.opportunitesService.getAllOpportunitesPublicAndPrivateByPartenaire(etat, this.idUtilisateur)
      .subscribe
        (
        res => {
          this.listeOpportunites.data = res;
          this.listeOpportunites.paginator = this.paginator;
          this.listeOpportunites.sort = this.sort;
        }
        );
    }
  }

  // La liste des opportunites qui ont une Technologie au moins dans la liste fournie
  getAllOpportunitesByListTechnologiesController(listeTechnologies): void {
    this.opportunitesService.getAllOpportunitesByListTechnologiesService(listeTechnologies)
    .subscribe
      (
      res => {
        this.listeOpportunites.data = res;
        this.listeOpportunites.paginator = this.paginator;
        this.listeOpportunites.sort = this.sort;
      }
      );
  }

  // Affecter les candidats à l'opportunité
  addCandidatsToOpportuniteController(idOpportunite, listeCandidats): void {
    this.candidatsService.addCandidatsToOpportuniteService(idOpportunite, listeCandidats, true)
    .subscribe
      (
      res => {}
      );
  }

  // Modifier une opportunité
  editOpportuniteController() {
      this.opportunitesService.editOpportuniteService(this.opportunite)
      .subscribe
        (
        res => {
          if (res != null) {
            this.getAllOpportunitesController(this.opportunite.etatOpportunite);
            this.utilService.openSnackBar('Opportunité modifiée', 'OK');
          }
        }
        );
  }

  // Fonction qui gére le Slide Toggle
  editEtatOpportunite(id, etat) {

    this.opportunite.id = id;

    if (etat === 'True') {
      this.opportunite.etatOpportunite = Etat.False;
      this.opportunitesService.editEtatOpportuniteService(this.opportunite)
      .subscribe
        (
          res => {
            this.getAllOpportunitesController('True');
            this.utilService.openSnackBar('Opportunité désactivée', 'OK');
          }
        );
    } else {
      this.opportunite.etatOpportunite = Etat.True;
      this.opportunitesService.editEtatOpportuniteService(this.opportunite)
      .subscribe
        (
          res => {
            this.getAllOpportunitesController('False');
            this.utilService.openSnackBar('Opportunité activée', 'OK');
          }
        );
    }
  }

  // Supprimer une opportunité
  deleteOpportuniteController(id) {
      this.opportunitesService.deleteOpportuniteService(id)
      .subscribe
        (
        res => {
          this.getAllOpportunitesController(this.etatOpportunite);
          this.utilService.openSnackBar('Opportunité supprimée', 'OK');
        }
        );
  }

  // Filtrer par état de l'opportunite : Actif / Inactif
  filtrerParEtat(valeurEtat) {

    this.getAllOpportunitesController(valeurEtat.value);

    if (valeurEtat.value === 'True' && this.etatOpportunite === 'True' || valeurEtat.value === 'False' && this.etatOpportunite === 'True') {
      this.etatOpportunite = 'True';
    } else if (valeurEtat.value === 'True' && this.etatOpportunite === 'False' || valeurEtat.value === 'False' && this.etatOpportunite === 'False') {
      this.etatOpportunite = 'False';
    }
  }

  // Recherche filtrée sur la table
  filtrerTable(filterValue: string) {
      this.listeOpportunites.filter = filterValue.trim().toLowerCase();
  }

  // Ouvre le pop-up pour afficher un partenaire
  openDialogShowPartenaire(id, identite, telephone, email, posteOccupe, descriptionDetaillee, urlPhoto, username, password, etatPartenaire, entreprise): void {
      // Objet pour configurer la modale
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.hasBackdrop = true;
      dialogConfig.closeOnNavigation = true;

      // Objet pour déclencher l'ouverture de la modale
      const dialogRef = this.dialog.open(ShowPartenaireComponent, {
        width: '850px',
        height: '650px',
        data: {
          id,
          identite,
          telephone,
          email,
          posteOccupe,
          descriptionDetaillee,
          urlPhoto,
          username,
          password,
          etatPartenaire,
          entreprise
        }
      });
  }

  // Ouvre le pop-up pour modifier une opportunité
  openDialogEditOpportunite(id, titreOpportunite, descriptionOpportunite, dateAjout, dateDemarrageSouhaitee, tjmOpportunite, etatOpportunite, visibiliteOpportunite, responsableOpportunite, listeTechnologies, listeCertifications): void {

      // Objet pour configurer la modale
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.hasBackdrop = true;
      dialogConfig.closeOnNavigation = true;

      // Objet pour déclencher l'ouverture de la modale
      const dialogRef = this.dialog.open(FormEditOpportunitesComponent, {
        width: '900px',
        height: '500px',
        data: {
          id,
          titreOpportunite,
          descriptionOpportunite,
          dateAjout,
          dateDemarrageSouhaitee : this.datePipe.transform(dateDemarrageSouhaitee, 'yyyy-MM-dd'),
          tjmOpportunite,
          etatOpportunite,
          visibiliteOpportunite,
          responsableOpportunite,
          listeTechnologies,
          listeCertifications
        }
      });
      // console.log(visibiliteOpportunite);
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
            this.opportunite.visibiliteOpportunite = result.visibiliteOpportunite;

            if (result.responsableOpportunite != null) {
              this.opportunite.responsableOpportunite.id = result.responsableOpportunite.id;
            }

            // listeTechnologies : J'utilise une variable partagée via le shared-data service : detection du changement sur la liste
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


            // listeCertifications : J'utilise une variable partagée via le shared-data service : detection du changement sur la liste
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


            // listeCandidats : J'utilise une variable partagée via le shared-data service : detection du changement sur la liste
            if (this.valueOfListeCandidat != null && this.valueOfListeCandidatIsModified === true) {
              for (const i in this.valueOfListeCandidat.source.selectedOptions.selected) {
                const candidat = new Candidat(this.valueOfListeCandidat.source.selectedOptions.selected[i].value.id);
                this.listeCandidatsFinale.push(candidat);
              }
              this.listeCandidats = this.listeCandidatsFinale;
              this.sharedService.changeListeCandidatIsModified(false);
            }

            // Vidage du Array
            this.listeCandidatsFinale = [];

            // Fonction qui Modifie l'opportunité
            this.editOpportuniteController();

            // Fonction qui fait la mise à jour pour lier les candidats à l'opportunité
            this.addCandidatsToOpportuniteController(result.id, this.listeCandidats);
            }
      });
  }

  // Ouvre le pop-up pour afficher une opportunité
  openDialogShowOpportunite(id, titreOpportunite, descriptionOpportunite, dateAjout, dateDemarrageSouhaitee, tjmOpportunite, etatOpportunite, visibiliteOpportunite, responsableOpportunite, listeTechnologies, listeCertifications): void {
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
          visibiliteOpportunite,
          responsableOpportunite,
          listeTechnologies,
          listeCertifications
        }
      });
  }

  // Ouvre le pop-up pour supprimer une opportunité
  openDialogDeleteOpportunite(id): void {
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
        texte : 'Attention : cette opportunité sera supprimée définitivement.'
      }
    });

    // Fonction qui s'éxècute quand je ferme la modale
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
          this.deleteOpportuniteController(result.id);
      }
    });
  }
}
