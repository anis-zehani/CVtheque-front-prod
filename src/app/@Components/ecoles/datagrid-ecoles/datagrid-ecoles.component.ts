import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatTableDataSource} from '@angular/material/table';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort} from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { EcolesService } from '../../../@Services/ecoles.service';
import { Ecole } from '../../../@Models/ecole';
import { FormEditEcolesComponent } from '../../../@Components/ecoles/form-edit-ecoles/form-edit-ecoles.component';
import { DeleteConfirmationComponent } from '../../../@Components/dialogs/delete-confirmation/delete-confirmation.component';
import { UtilService } from '../../../@Util/util.service';

@Component({
  selector: 'app-datagrid-ecoles',
  templateUrl: './datagrid-ecoles.component.html'
})
export class DatagridEcolesComponent implements OnInit {

  @Input() listeEcoles = new MatTableDataSource<Ecole>();
  displayedColumns: string[] = ['nomEcole', 'more'];

  ecole : Ecole;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(
    private ecolesService: EcolesService, 
    private utilService: UtilService,
    public dialog: MatDialog
    )
   { 
    this.ecole = new Ecole();
   }

  ngOnInit() {
    this.getAllEcolesController();
    this.listeEcoles.paginator = this.paginator;
    this.listeEcoles.sort = this.sort;
  }

  //Afficher toutes les ecoles : remplissage de la table
  getAllEcolesController(): void {
    this.ecolesService.getAllEcolesService()
    .subscribe
      (
      res => { this.listeEcoles.data = res;}
      )
  }

    //Modifier une ecole
  editEcoleController() {
      this.ecolesService.editEcoleService(this.ecole)
      .subscribe
        (
        res => { if(res != null){this.getAllEcolesController();this.utilService.openSnackBar("École modifiée", "OK");}}
        )
  }

    //Supprimer une ecole
  deleteEcoleController(idEcole) {
      this.ecolesService.deleteEcoleService(idEcole)
      .subscribe
        (
        res => {this.getAllEcolesController(); this.utilService.openSnackBar("École supprimée", "OK");}
        )
  }

    //Recherche filtrée sur la table
  filtrerTable(filterValue: string) {
      this.listeEcoles.filter = filterValue.trim().toLowerCase();
  }

  //Ouvre le pop-up pour modifier une école
  openDialogEditEcole(idEcole, nomEcole): void {

      //Objet pour configurer la modale
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.hasBackdrop=true;
      dialogConfig.closeOnNavigation = true;
  
      //Objet pour déclencher l'ouverture de la modale
      const dialogRef = this.dialog.open(FormEditEcolesComponent, {
        width: '300px',
        height: '250px',
        data: {idEcole: idEcole, nomEcole: nomEcole}
      });
  
      //Fonction qui s'éxècute quand je ferme la modale
      dialogRef.afterClosed().subscribe(result => {
        if(result){
            this.ecole.idEcole=result.idEcole;
            this.ecole.nomEcole=result.nomEcole;
            this.editEcoleController();
            }
      });
    }

  //Ouvre le pop-up pour supprimer une école
  openDialogDeleteEcole(id): void {
    //Objet pour configurer la modale
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.hasBackdrop=true;
    dialogConfig.closeOnNavigation = true;

    //Objet pour déclencher l'ouverture de la modale
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      width: '450px',
      height: '180px',
      data: {
        id: id,
        texte : "Attention : cette école sera supprimée définitivement."
      }
    });

    //Fonction qui s'éxècute quand je ferme la modale
    dialogRef.afterClosed().subscribe(result => {
      if(result)
      {
          this.deleteEcoleController(result.id);
      }
    });
  }
}
