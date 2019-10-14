import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource} from '@angular/material/table';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort} from '@angular/material/sort';
import { environment } from '../../../../environments/environment';

import { Fichier } from 'src/app/@Models/fichier';
import { UtilService } from '../../../@Util/util.service';
import { FichiersService } from 'src/app/@Services/fichiers.service';
import { DeleteConfirmationComponent } from '../../dialogs/delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-datagrid-fichiers',
  templateUrl: './datagrid-fichiers.component.html',
  styleUrls: ['./datagrid-fichiers.component.css']
})
export class DatagridFichiersComponent implements OnInit {

  @Input() listeFichiers = new MatTableDataSource<Fichier>();

  displayedColumns: string[];

  fichier: Fichier;
  role: string;

  // URL du serveur de stockage
  storageUrl = environment.storageUrl;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(private utilService: UtilService,
              private fichiersService: FichiersService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.getAllFichiersController();
    this.displayedColumns = ['nomFichier', 'dateCreationFichier', 'tailleFichier', 'more'];

    // je récupère le rôle pour la restriction d'accès dans le menu
    this.role = this.utilService.getRoleUtilisateurFromToken();
  }

  // Afficher toutes les technologies : remplissage de la table
  getAllFichiersController(): void {
    this.fichiersService.getAllFichiersService()
    .subscribe
      (
      res => {
        this.listeFichiers.data = res;
        this.listeFichiers.paginator = this.paginator;
        this.listeFichiers.sort = this.sort;
      }
      );
  }

  // Recherche filtrée sur la table
  filtrerTable(filterValue: string) {
      this.listeFichiers.filter = filterValue.trim().toLowerCase();
  }

  // Ouvre le pop-up pour supprimer un fichier
  openDialogDeleteFichier(nomFichier): void {
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
        nomFichier,
        texte : 'Attention : ce fichier sera supprimé définitivement.'
      }
    });

    // Fonction qui s'éxècute quand je ferme la modale
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
          this.deleteFichierController(result.nomFichier);
      }
    });
  }

  // Supprimer un candidat
  deleteFichierController(nomFichier) {
    this.fichiersService.deleteFichierService(nomFichier)
    .subscribe
      (
      res => {
        this.getAllFichiersController();
        this.utilService.openSnackBar('Fichier supprimé', 'OK');
      }
      );
}

}
