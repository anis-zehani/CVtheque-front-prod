import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog,MatDialogConfig } from '@angular/material/dialog';

import { FormAddProjetsComponent } from '../form-add-projets/form-add-projets.component';
import { DialogEditProjetsComponent } from '../dialog-edit-projets/dialog-edit-projets.component';
import { DeleteConfirmationComponent } from '../../../@Components/dialogs/delete-confirmation/delete-confirmation.component';
import { ProjetsService } from '../../../@Services/projets.service';
import { UtilService } from '../../../@Util/util.service';
import { Projet } from '../../../@Models/projet';

@Component({
  selector: 'app-liste-scroll-projets',
  templateUrl: './liste-scroll-projets.component.html'
})
export class ListeScrollProjetsComponent implements OnInit {

  projets:Projet[];

  projet:Projet;

  //Envoi l'event pour mettre à jour la table selon le projet choisi
  @Output() refreshTableByProjetEvent = new EventEmitter<Event>();

  @Output() refreshTableByProjetDeleteEvent = new EventEmitter<Event>();

  constructor(
    private projetsService: ProjetsService,
    private utilService: UtilService, 
    public dialog: MatDialog) 
    { 
      this.projet = new Projet();
    }

  ngOnInit() {
    this.getAllProjetsController();
  }

  //Quand on clique sur un projet: un EVENT est envoyé au Parent pour rafraichir la table selon les rappels de ce projet
  filtrerDatagridByProjet($event){
    this.refreshTableByProjetEvent.emit($event);
  }

  //Afficher toutes les projets : remplissage de la liste Scroll
  getAllProjetsController(): void {
      this.projetsService.getAllProjetsService()
      .subscribe(res => {
        this.projets = res;
      })
  }

  //Modifier un projet
  editProjetController() {
    this.projetsService.editProjetService(this.projet)
    .subscribe
      (
      res => 
      { if(res != null)
        {
          this.getAllProjetsController();
          this.refreshTableByProjetDeleteEvent.emit(null);
          this.utilService.openSnackBar("Projet modifié", "OK");
        }
      }
      )
  }

  //Supprimer un projet
  deleteProjetController(id) {
      
    this.projetsService.deleteProjetService(id)
      .subscribe
        (
        res => 
        {
          this.getAllProjetsController(); 
          this.refreshTableByProjetDeleteEvent.emit(null);
          this.utilService.openSnackBar("Projet supprimé", "OK");
        }
        )
  }

  //Ouvre le pop-up pour ajouter un projet
  openDialogAddProjet(): void {
    //Objet pour configurer la modale
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.hasBackdrop=true;
    dialogConfig.closeOnNavigation = true;
  
    //Objet pour déclencher l'ouverture de la modale
    const dialogRef = this.dialog.open(FormAddProjetsComponent, {
        width: '400px',
        height: '400px'
    });

    //Fonction qui s'éxècute quand je ferme la modale
    dialogRef.afterClosed().subscribe(result => {
    //On refresh la liste déroulante aprés ajout de projet
    this.getAllProjetsController();
  });
  }

  //Ouvre le pop-up pour ajouter un projet
  openDialogEditProjet(id, nomProjet, detailsProjet): void {
    //Objet pour configurer la modale
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.hasBackdrop=true;
    dialogConfig.closeOnNavigation = true;
  
    //Objet pour déclencher l'ouverture de la modale
    const dialogRef = this.dialog.open(DialogEditProjetsComponent, {
        width: '400px',
        height: '400px',
        data: {id: id, nomProjet: nomProjet, detailsProjet: detailsProjet}
    });

    //Fonction qui s'éxècute quand je ferme la modale
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.projet.id=result.id;
        this.projet.nomProjet=result.nomProjet;
        this.projet.detailsProjet=result.detailsProjet;
        this.editProjetController();
        }
    //On refresh la liste déroulante aprés modification du projet
    this.getAllProjetsController();
  });
  }

  //Ouvre le pop-up pour supprimer un projet
  openDialogDeleteProjet(id): void {

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
        texte : "Attention : tous les Rappels liés à ce projet seront perdu définitivement."
      }
    });
    
    //Fonction qui s'éxècute quand je ferme la modale
    dialogRef.afterClosed().subscribe(result => {
      if(result)
      {
          this.deleteProjetController(result.id);
      }
    });
  }
}
