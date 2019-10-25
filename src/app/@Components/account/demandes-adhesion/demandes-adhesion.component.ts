import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort} from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PartenaireTemporaire } from 'src/app/@Models/partenaire-temporaire';
import { PartenairesTemporairesService } from 'src/app/@Services/partenaires-temporaires.service';
import { ActivationConfirmationComponent } from '../../dialogs/activation-confirmation/activation-confirmation.component';
import { UtilService } from 'src/app/@Util/util.service';
import { ValidationEntrepriseComponent } from '../../dialogs/validation-entreprise/validation-entreprise.component';
import { MatSpinnerComponent } from '../../dialogs/mat-spinner/mat-spinner.component';

@Component({
  selector: 'app-demandes-adhesion',
  templateUrl: './demandes-adhesion.component.html',
  styleUrls: ['./demandes-adhesion.component.css']
})
export class DemandesAdhesionComponent implements OnInit {

  @Input() listePartenairesTemporaires = new MatTableDataSource<PartenaireTemporaire>();

  displayedColumns: string[];

  idEntreprise = 0;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(private partenairesTemporairesService: PartenairesTemporairesService,
              private dialog: MatDialog,
              private utilService: UtilService) { }

  ngOnInit() {
    this.getAllPartenairesTemporairesController();
    this.displayedColumns = ['dateAjout', 'parametres', 'contacts', 'details', 'more'];
  }

    // Afficher toutes les technologies : remplissage de la table
  getAllPartenairesTemporairesController(): void {
    this.partenairesTemporairesService.getAllPartenairesTemporairesService()
    .subscribe
      (
      res => {
        this.listePartenairesTemporaires.data = res;
        this.listePartenairesTemporaires.paginator = this.paginator;
        this.listePartenairesTemporaires.sort = this.sort;
      }
      );
  }

  // Activer le nouveau Partenaire : appel au Service
  activatePartenaireController(email, idEntreprise) {
    this.openDialogSpinner();
    this.partenairesTemporairesService.activatePartenaireService(email, idEntreprise)
    .subscribe
      (
      result => {
        if (result) {
          this.getAllPartenairesTemporairesController();
          this.closeDialogSpinner();
          this.utilService.openSnackBar('Partenaire activé avec succès', 'OK');
        } else {
          this.closeDialogSpinner();
          this.utilService.openSnackBar('Une erreur a eu lieu durant l\activation', 'Erreur');
        }
      }
      );
  }

  // Ouvre le pop-up pour valider l'Entreprise entrée par le Partenaire Temporaire
  openDialogValidationEntreprise(email, entreprise, idEntreprise): void {
    // Objet pour configurer la modale
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.hasBackdrop = true;
    dialogConfig.closeOnNavigation = true;

    // Objet pour déclencher l'ouverture de la modale
    const dialogRef = this.dialog.open(ValidationEntrepriseComponent, {
      width: '750px',
      height: '300px',
      data: {
        email,
        entreprise,
        idEntreprise
      }
    });

    // Fonction qui s'éxècute quand je ferme la modale
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
          // On traite le cas ou y a pas d'entreprise validée, et là on met idEntriprise à 0
          // Puis en BackEnd on teste s'il est (!= null et != 0)
          if (result.idEntreprise == null) {
            this.idEntreprise = 0;
          } else {
            this.idEntreprise = result.idEntreprise;
          }
          this.openDialogActivationPartenaires(result.email);
      }
    });
  }

  // Ouvre le pop-up pour activer un nouveau Partenaire
  openDialogActivationPartenaires(email): void {
    // Objet pour configurer la modale
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.hasBackdrop = true;
    dialogConfig.closeOnNavigation = true;

    // Objet pour déclencher l'ouverture de la modale
    const dialogRef = this.dialog.open(ActivationConfirmationComponent, {
      width: '450px',
      height: '180px',
      data: {
        email,
        texte : 'Vous allez valider l\'activation d\'un nouveau Partenaire :'
      }
    });

    // Fonction qui s'éxècute quand je ferme la modale
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
          this.activatePartenaireController(result.email, this.idEntreprise);
      }
    });
  }

  // Recherche filtrée sur la table
  filtrerTable(filterValue: string) {
      this.listePartenairesTemporaires.filter = filterValue.trim().toLowerCase();
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