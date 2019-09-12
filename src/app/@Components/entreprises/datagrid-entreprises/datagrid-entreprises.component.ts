import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatTableDataSource} from '@angular/material/table';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort} from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { EntreprisesService } from '../../../@Services/entreprises.service';
import { Entreprise } from '../../../@Models/entreprise';
import { FormEditEntreprisesComponent } from '../../../@Components/entreprises/form-edit-entreprises/form-edit-entreprises.component';
import { ShowEntrepriseComponent } from '../../../@Components/entreprises/show-entreprise/show-entreprise.component';
import { DeleteConfirmationComponent } from '../../../@Components/dialogs/delete-confirmation/delete-confirmation.component';
import { UtilService } from '../../../@Util/util.service';

@Component({
  selector: 'app-datagrid-entreprises',
  templateUrl: './datagrid-entreprises.component.html'
})
export class DatagridEntreprisesComponent implements OnInit {

  @Input() listeEntreprises = new MatTableDataSource<Entreprise>();
  displayedColumns: string[];

  entreprise: Entreprise;
  role: string;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(
    private entreprisesService: EntreprisesService,
    private utilService: UtilService,
    public dialog: MatDialog
    ) {
    this.entreprise = new Entreprise(null, null, null);
   }

  ngOnInit() {
    this.getAllEntreprisesController();
    // je récupère le rôle pour la restriction d'accès dans le menu
    this.role = this.utilService.getRoleUtilisateurFromToken();

    // Displayed columns s'affiche selon le profil : Priviléges
    if (this.role === 'Administrateur') {
      this.displayedColumns = ['nomEntreprise', 'more'];
    } else {
      this.displayedColumns = ['nomEntreprise'];
    }
  }

  // Afficher toutes les entreprises : remplissage de la table
  getAllEntreprisesController(): void {
    this.entreprisesService.getAllEntreprisesService()
    .subscribe
      (
      res => {
        this.listeEntreprises.data = res;
        this.listeEntreprises.paginator = this.paginator;
        this.listeEntreprises.sort = this.sort;
      }
      );
  }

    // Modifier une entreprise
  editEntrepriseController() {
      this.entreprisesService.editEntrepriseService(this.entreprise)
      .subscribe
        (
        res => {
          if (res != null) {
          this.getAllEntreprisesController();
          this.utilService.openSnackBar('Entreprise modifiée', 'OK'); }}
        );
  }

  // Supprimer une entreprise
  deleteEntrepriseController(idEntreprise) {
    this.entreprisesService.deleteEntrepriseService(idEntreprise)
    .subscribe
      (
      result => {
        if (result === true) {
          this.getAllEntreprisesController();
          this.utilService.openSnackBar('Entreprise supprimée', 'OK');
        } else {
          this.utilService.openSnackBarErreur('Cette entreprise est affectée à des candidats (et/ou) des partenaires. Il faut d\'abord supprimer la liaison.', 'OK');
        }
      }
      );
  }

    // Recherche filtrée sur la table
  filtrerTable(filterValue: string) {
      this.listeEntreprises.filter = filterValue.trim().toLowerCase();
  }

  // Ouvre le pop-up pour modifier une entreprise
  openDialogEditEntreprise(idEntreprise, nomEntreprise, descriptionDetaillee): void {

      // Objet pour configurer la modale
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.hasBackdrop = true;
      dialogConfig.closeOnNavigation = true;

      // Objet pour déclencher l'ouverture de la modale
      const dialogRef = this.dialog.open(FormEditEntreprisesComponent, {
        width: '400px',
        height: '500px',
        data: {idEntreprise, nomEntreprise, descriptionDetaillee}
      });

      // Fonction qui s'éxècute quand je ferme la modale
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
            this.entreprise.idEntreprise = result.idEntreprise;
            this.entreprise.nomEntreprise = result.nomEntreprise;
            this.entreprise.descriptionDetaillee = result.descriptionDetaillee;
            this.editEntrepriseController();
            }
      });
  }

  // Ouvre le pop-up pour afficher une entreprise
  openDialogShowEntreprise(idEntreprise, nomEntreprise, descriptionDetaillee): void {

  // Objet pour configurer la modale
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = false;
  dialogConfig.hasBackdrop = true;
  dialogConfig.closeOnNavigation = true;

  // Objet pour déclencher l'ouverture de la modale
  const dialogRef = this.dialog.open(ShowEntrepriseComponent, {
    width: '1000px',
    height: '550px',
    data: {idEntreprise, nomEntreprise, descriptionDetaillee}
  });
  }

  // Ouvre le pop-up pour supprimer une entreprise
  openDialogDeleteEntreprise(id): void {
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
        texte : 'Attention : cette entreprise sera supprimée définitivement.'
      }
    });

    // Fonction qui s'éxècute quand je ferme la modale
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
          this.deleteEntrepriseController(result.id);
      }
    });
  }
}
