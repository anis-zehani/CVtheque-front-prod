import { Component, OnInit, ViewChild, Input, Inject } from '@angular/core';
import { MatTableDataSource} from '@angular/material/table';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort} from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { CollaborateursService } from '../../../@Services/collaborateurs.service';
import { Collaborateur } from '../../../@Models/collaborateur';
import { UtilService } from '../../../@Util/util.service';
import { FormEditCollaborateursComponent } from './../form-edit-collaborateurs/form-edit-collaborateurs.component';
import { DeleteConfirmationComponent } from '../../../@Components/dialogs/delete-confirmation/delete-confirmation.component';


@Component({
  selector: 'app-datagrid-collaborateurs',
  templateUrl: './datagrid-collaborateurs.component.html',
  styleUrls: ['./datagrid-collaborateurs.component.css']
})
export class DatagridCollaborateursComponent implements OnInit {

// Initialisations concernant la MatTable
dataSource = new MatTableDataSource<Collaborateur>();
displayedColumns: string[] = ['identite', 'email', 'username', 'more'];

@ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
@ViewChild(MatSort, {static: false}) sort: MatSort;

@Input() collaborateur: Collaborateur;
@Input() collaborateurToUpdate: Collaborateur;

constructor(
  private collaborateursService: CollaborateursService,
  private utilService: UtilService,
  public dialog: MatDialog) {
      this.collaborateur =  new Collaborateur();
      this.collaborateurToUpdate =  new Collaborateur();
  }

ngOnInit() {
    this.getAllCollaborateursController();
}

// Afficher tous les collaborateurs : remplissage de la table
getAllCollaborateursController(): void {
  this.collaborateursService.getAllCollaborateursService()
  .subscribe(res => {
    this.dataSource.data = res;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  });
}

// Modifier une collaborateur
editCollaborateurController() {
  this.collaborateursService.editCollaborateurService(this.collaborateurToUpdate)
  .subscribe
    (
    res => {
      if (res != null) {
        this.getAllCollaborateursController();
        this.utilService.openSnackBar('Collaborateur modifié', 'OK');
      } else {
        this.utilService.openSnackBar('Veuillez vérifier vos paramètres', 'Erreur');
      }
    });
}

// Supprimer une collaborateur
deleteCollaborateurController(id) {
  this.collaborateursService.deleteCollaborateurService(id)
  .subscribe
    (
    res => {
      this.getAllCollaborateursController();
      this.utilService.openSnackBar('Collaborateur supprimé', 'OK');
    });
}


// Recherche filtrée sur la table
filtrerTable(filterValue: string) {
  this.dataSource.filter = filterValue.trim().toLowerCase();
}


// Ouvre le pop-up pour modifier un collaborateur
openDialogEditCollaborateur(id, identite, email, username, password): void {

  // Objet pour configurer la modale
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = false;
  dialogConfig.hasBackdrop = true;
  dialogConfig.closeOnNavigation = true;

  // Objet pour déclencher l'ouverture de la modale
  const dialogRef = this.dialog.open(FormEditCollaborateursComponent, {
    width: '400px',
    height: '500px',
    data: {id, identite, email, username, password}
  });


  // Fonction qui s'éxècute quand je ferme la modale
  dialogRef.afterClosed().subscribe(result => {
    if (result) {
        this.collaborateurToUpdate.id = result.split('#')[0];
        this.collaborateurToUpdate.identite = result.split('#')[1];
        this.collaborateurToUpdate.email = result.split('#')[2];
        this.collaborateurToUpdate.username = result.split('#')[3];
        this.collaborateurToUpdate.password = result.split('#')[4];
        this.editCollaborateurController();
        }
  });
}

// Ouvre le pop-up pour supprimer un collaborateur
openDialogDeleteCollaborateur(id): void {
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
      texte : 'Attention : ce collaborateur sera supprimé définitivement.'
    }
  });

  // Fonction qui s'éxècute quand je ferme la modale
  dialogRef.afterClosed().subscribe(result => {
    if (result) {
        this.deleteCollaborateurController(result.id);
    }
  });
}

}
