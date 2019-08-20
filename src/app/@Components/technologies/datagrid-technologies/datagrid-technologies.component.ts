import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatTableDataSource} from '@angular/material/table';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort} from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { TechnologiesService } from '../../../@Services/technologies.service';
import { Technologie } from '../../../@Models/technologie';
import { FormEditTechnologiesComponent } from '../../../@Components/technologies/form-edit-technologies/form-edit-technologies.component';
import { ShowTechnologieComponent } from '../../../@Components/technologies/show-technologie/show-technologie.component';
import { DeleteConfirmationComponent } from '../../../@Components/dialogs/delete-confirmation/delete-confirmation.component';
import { UtilService } from '../../../@Util/util.service';

import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-datagrid-technologies',
  templateUrl: './datagrid-technologies.component.html'
})
export class DatagridTechnologiesComponent implements OnInit {

  @Input() listeTechnologies = new MatTableDataSource<Technologie>();
  
  displayedColumns: string[] = ['nomTechnologie', 'more'];

  technologie : Technologie;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(
    private technologiesService: TechnologiesService, 
    private utilService: UtilService,
    public dialog: MatDialog
    )
   { 
    this.technologie = new Technologie(null,null,null);
   }

  ngOnInit() {
    this.getAllTechnologiesController();
    this.listeTechnologies.paginator = this.paginator;
    this.listeTechnologies.sort = this.sort;
  }

  //Afficher toutes les technologies : remplissage de la table
  getAllTechnologiesController(): void {
    this.technologiesService.getAllTechnologiesService()
    .subscribe
      (
      res => 
      { this.listeTechnologies.data = res; }
      )
  }

  //Modifier une technologie
  editTechnologieController() {
      this.technologiesService.editTechnologieService(this.technologie)
      .subscribe
        (
        res => 
        { if(res != null)
          {
            this.getAllTechnologiesController();
            this.utilService.openSnackBar("Technologie modifiée", "OK");
          }
        }
        )
  }

  //Supprimer une technologie
  deleteTechnologieController(id) {
      this.technologiesService.deleteTechnologieService(id)
      .subscribe
        (
        result => 
        {
          if(result === true)
          {
            this.getAllTechnologiesController(); 
            this.utilService.openSnackBar("Technologie supprimée", "OK");
          }
          else
          {
            this.utilService.openSnackBarErreur("Cette technologie est affectée à des opportunités (et/ou) des candidats. Il faut d'abord supprimer la liaison.", "OK");  
          }
        }
        )
  }

  //Recherche filtrée sur la table
  filtrerTable(filterValue: string) {
      this.listeTechnologies.filter = filterValue.trim().toLowerCase();
  }

  //Ouvre le pop-up pour modifier une technologie
  openDialogEditTechnologie(id, nomTechnologie, descriptionDetaillee): void {

      //Objet pour configurer la modale
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.hasBackdrop=true;
      dialogConfig.closeOnNavigation = true;
  
      //Objet pour déclencher l'ouverture de la modale
      const dialogRef = this.dialog.open(FormEditTechnologiesComponent, {
        width: '400px',
        height: '500px',
        data: {id: id, nomTechnologie: nomTechnologie, descriptionDetaillee: descriptionDetaillee} 
      });
  
      //Fonction qui s'éxècute quand je ferme la modale
      dialogRef.afterClosed().subscribe(result => {
        if(result){
            this.technologie.id=result.id;
            this.technologie.nomTechnologie=result.nomTechnologie;
            this.technologie.descriptionDetaillee=result.descriptionDetaillee;
            this.editTechnologieController();
            }
      });
  }

  //Ouvre le pop-up pour afficher une technologie
  openDialogShowTechnologie(id, nomTechnologie, descriptionDetaillee): void {

  //Objet pour configurer la modale
  const dialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = false;
  dialogConfig.hasBackdrop=true;
  dialogConfig.closeOnNavigation = true;
  
  //Objet pour déclencher l'ouverture de la modale
  const dialogRef = this.dialog.open(ShowTechnologieComponent, {
      width: '700px',
      height: '500px',
      data: {id: id, nomTechnologie: nomTechnologie, descriptionDetaillee: descriptionDetaillee} 
  });
  }

  //Ouvre le pop-up pour supprimer une technologie
  openDialogDeleteTechnologie(id): void {
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
        texte : "Attention : cette technologie sera supprimée définitivement."
      }
    });

    //Fonction qui s'éxècute quand je ferme la modale
    dialogRef.afterClosed().subscribe(result => {
      if(result)
      {
          this.deleteTechnologieController(result.id);
      }
    });
  }

}
