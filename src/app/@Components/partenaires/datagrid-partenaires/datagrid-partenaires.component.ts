import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatTableDataSource} from '@angular/material/table';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort} from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { environment } from '../../../../environments/environment';
import { PartenairesService } from '../../../@Services/partenaires.service';
import { Partenaire } from '../../../@Models/partenaire';
import { FormEditPartenairesComponent } from '../../../@Components/partenaires/form-edit-partenaires/form-edit-partenaires.component';
import { DeleteConfirmationComponent } from '../../../@Components/dialogs/delete-confirmation/delete-confirmation.component';
import { ShowPartenaireComponent } from '../../../@Components/partenaires/show-partenaire/show-partenaire.component';
import { UtilService } from '../../../@Util/util.service';
import { Entreprise } from '../../../@Models/entreprise';
import { Etat } from '../../../@Models/enums';

@Component({
  selector: 'app-datagrid-partenaires',
  templateUrl: './datagrid-partenaires.component.html',
  styleUrls: ['./datagrid-partenaires.component.css']
})
export class DatagridPartenairesComponent implements OnInit {


  // URL du serveur de stockage
  storageUrl = environment.storageUrl;

  @Input() listePartenaires = new MatTableDataSource<Partenaire>();

  displayedColumns: string[] = ['urlPhoto', 'partenaire', 'details', 'etat', 'more'];

  partenaire: Partenaire;
  entreprise: Entreprise;
  etatPartenaire = 'True';

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(
    private partenairesService: PartenairesService,
    private utilService: UtilService,
    public dialog: MatDialog
    ) {
    this.partenaire = new Partenaire();
    this.entreprise =  new Entreprise(null, null, null);
    this.partenaire.entreprise = this.entreprise;
   }

  ngOnInit() {
    this.getAllPartenairesController('True');
  }

  // Afficher tous les partenaires : remplissage de la table
  getAllPartenairesController(etat): void {
    this.partenairesService.getAllPartenairesService(etat)
    .subscribe
      (
      res => {
        this.listePartenaires.data = res;
        this.listePartenaires.paginator = this.paginator;
        this.listePartenaires.sort = this.sort;
      }
      );
  }

  // Modifier un partenaire
  editPartenaireController() {
      this.partenairesService.editPartenaireService(this.partenaire)
      .subscribe
        (
        res => {
          if (res != null) {
            this.getAllPartenairesController(this.partenaire.etatPartenaire);
            this.utilService.openSnackBar('Partenaire modifié', 'OK');
          } else {
            this.utilService.openSnackBar('Une erreur est survenue durant la modification du partenaire', 'Erreur');
          }
        }
        );
  }

  // Fonction qui gére le Slide Toggle
  editEtatPartenaire(id, etat) {

    this.partenaire.id = id;

    if (etat === 'True') {
      this.partenaire.etatPartenaire = Etat.False;
      this.partenairesService.editEtatPartenaireService(this.partenaire)
      .subscribe
        (
          res => {
            this.getAllPartenairesController('True');
            this.utilService.openSnackBar('Partenaire désactivé', 'OK');
          }
        );
    } else {
      this.partenaire.etatPartenaire = Etat.True;
      this.partenairesService.editEtatPartenaireService(this.partenaire)
      .subscribe
        (
          res => {
            this.getAllPartenairesController('False');
            this.utilService.openSnackBar('Partenaire activé', 'OK');
          }
        );
    }
  }

  // Supprimer un partenaire
  deletePartenaireController(id) {
      this.partenairesService.deletePartenaireService(id)
      .subscribe
        (
        res => {
          this.getAllPartenairesController(this.etatPartenaire);
          this.utilService.openSnackBar('Partenaire supprimé', 'OK');
        }
        );
  }

  // Filtrer par état du Partenaire : Actif / Inactif
  filtrerParEtat(valeurEtat) {

    this.getAllPartenairesController(valeurEtat.value);

    if (valeurEtat.value === 'True' && this.etatPartenaire === 'True' || valeurEtat.value === 'False' && this.etatPartenaire === 'True') {
      this.etatPartenaire = 'True';
    } else if (valeurEtat.value === 'True' && this.etatPartenaire === 'False' || valeurEtat.value === 'False' && this.etatPartenaire === 'False') {
      this.etatPartenaire = 'False';
    }
  }

  // Recherche filtrée sur la table
  filtrerTable(filterValue: string) {
      this.listePartenaires.filter = filterValue.trim().toLowerCase();
  }

  // Ouvre le pop-up pour modifier un partenaire
  openDialogEditPartenaire(id, identite, telephone, email, posteOccupe, descriptionDetaillee, urlPhoto, username, password, etatPartenaire, entreprise): void {
      // Objet pour configurer la modale
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.hasBackdrop = true;
      dialogConfig.closeOnNavigation = true;

      // Objet pour déclencher l'ouverture de la modale
      const dialogRef = this.dialog.open(FormEditPartenairesComponent, {
        width: '1000px',
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

      // Fonction qui s'éxècute quand je ferme la modale
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
            this.partenaire.id = result.id;
            this.partenaire.identite = result.identite;
            this.partenaire.telephone = result.telephone;
            this.partenaire.email = result.email;
            this.partenaire.posteOccupe = result.posteOccupe;
            this.partenaire.descriptionDetaillee = result.descriptionDetaillee;
            this.partenaire.urlPhoto = result.urlPhoto;
            this.partenaire.username = result.username;
            this.partenaire.password = result.password;
            this.partenaire.etatPartenaire = result.etatPartenaire;
            if (result.entreprise != null) {
              this.partenaire.entreprise.idEntreprise = result.entreprise.idEntreprise;
            }

            this.editPartenaireController();
            }
      });
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
      width: '1000px',
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

  // Ouvre le pop-up pour supprimer un partenaire
  openDialogDeletePartenaire(id): void {
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
        texte : 'Attention : ce partenaire sera supprimé définitivement.'
      }
    });

    // Fonction qui s'éxècute quand je ferme la modale
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
          this.deletePartenaireController(result.id);
      }
    });
  }
}
