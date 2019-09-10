import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatTableDataSource} from '@angular/material/table';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort} from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material';

import { CertificationsService } from '../../../@Services/certifications.service';
import { Certification } from '../../../@Models/certification';
import { FormEditCertificationsComponent } from '../../../@Components/certifications/form-edit-certifications/form-edit-certifications.component';
import { ShowCertificationComponent } from '../../../@Components/certifications/show-certification/show-certification.component';
import { DeleteConfirmationComponent } from '../../../@Components/dialogs/delete-confirmation/delete-confirmation.component';
import { UtilService } from '../../../@Util/util.service';

@Component({
  selector: 'app-datagrid-certifications',
  templateUrl: './datagrid-certifications.component.html'
})
export class DatagridCertificationsComponent implements OnInit {

  @Input() listeCertifications = new MatTableDataSource<Certification>();
  displayedColumns: string[];

  certification: Certification;
  role: string;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(
    private certificationsService: CertificationsService,
    private utilService: UtilService,
    public dialog: MatDialog
    ) {
    this.certification = new Certification(null, null, null);
   }

  ngOnInit() {
    this.getAllCertificationsController();
    this.listeCertifications.paginator = this.paginator;
    this.listeCertifications.sort = this.sort;
    // je récupère le rôle pour la restriction d'accès dans le menu
    this.role = this.utilService.getRoleUtilisateurFromToken();

    // Displayed columns s'affiche selon le profil : Priviléges
    if (this.role === 'Administrateur') {
      this.displayedColumns = ['nomCertification', 'more'];
    } else {
      this.displayedColumns = ['nomCertification'];
    }
  }

  // Afficher toutes les certifications : remplissage de la table
  getAllCertificationsController(): void {
    this.certificationsService.getAllCertificationsService()
    .subscribe
      (
      res => {
        this.listeCertifications.data = res;
      }
      );
  }

    // Modifier une certification
  editCertificationController() {
      this.certificationsService.editCertificationService(this.certification)
      .subscribe
      (
        res => {
          if (res != null) {
            this.getAllCertificationsController();
            this.utilService.openSnackBar('Certification modifiée', 'OK');
          }
        }
      );
  }

    // Supprimer une certification
  deleteCertificationController(id) {
      this.certificationsService.deleteCertificationService(id)
      .subscribe
        (
        result => {
          if (result === true) {
            this.getAllCertificationsController();
            this.utilService.openSnackBar('Certification supprimée', 'OK');
          } else {
            this.utilService.openSnackBarErreur('Cette certification est affectée à des opportunités (et/ou) des candidats. Il faut d\'abord supprimer la liaison.', 'OK');
          }
        }
        );
  }

    // Recherche filtrée sur la table
  filtrerTable(filterValue: string) {
      this.listeCertifications.filter = filterValue.trim().toLowerCase();
  }

  // Ouvre le pop-up pour modifier une certification
  openDialogEditCertification(id, nomCertification, descriptionDetaillee): void {

      // Objet pour configurer la modale
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.hasBackdrop = true;
      dialogConfig.closeOnNavigation = true;

      // Objet pour déclencher l'ouverture de la modale
      const dialogRef = this.dialog.open(FormEditCertificationsComponent, {
        width: '400px',
        height: '500px',
        data: {id, nomCertification, descriptionDetaillee}
      });

      // Fonction qui s'éxècute quand je ferme la modale
      dialogRef.afterClosed().subscribe(result => {

        if (result) {
            this.certification.id = result.id;
            this.certification.nomCertification = result.nomCertification;
            this.certification.descriptionDetaillee = result.descriptionDetaillee;
            this.editCertificationController();
            }
      });
  }

  // Ouvre le pop-up pour afficher une certification
  openDialogShowCertification(id, nomCertification, descriptionDetaillee): void {

  // Objet pour configurer la modale
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = false;
  dialogConfig.hasBackdrop = true;
  dialogConfig.closeOnNavigation = true;

  // Objet pour déclencher l'ouverture de la modale
  const dialogRef = this.dialog.open(ShowCertificationComponent, {
    width: '1000px',
    height: '550px',
    data: {id, nomCertification, descriptionDetaillee}
  });
  }

  // Ouvre le pop-up pour supprimer une certification
  openDialogDeleteCertification(id): void {
    // Objet pour configurer la modale
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.hasBackdrop = true;
    dialogConfig.closeOnNavigation = true;

    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      width: '450px',
      height: '180px',
      data: {
        id,
        texte : 'Attention : cette certification sera supprimée définitivement.'
      }
    });

    // Fonction qui s'éxècute quand je ferme la modale
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
          this.deleteCertificationController(result.id);
      }
    });
  }
}
