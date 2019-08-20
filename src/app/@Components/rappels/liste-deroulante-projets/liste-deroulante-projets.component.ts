import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog,MatDialogConfig } from '@angular/material/dialog';

import { FormAddProjetsComponent } from '../form-add-projets/form-add-projets.component';
import { ProjetsService } from '../../../@Services/projets.service';
import { Projet } from '../../../@Models/projet';

@Component({
  selector: 'app-liste-deroulante-projets',
  templateUrl: './liste-deroulante-projets.component.html'
})
export class ListeDeroulanteProjetsComponent implements OnInit {

  projets:Projet[];

  //Sert pour le Dialog : afin de fixer la valeur du Select par défaut
  @Input() projetId:number;

  //EventEmitter : afin d'envoyer une valeur au parent via un event
  @Output() projetIdEvent = new EventEmitter<Event>();

  constructor(
    private projetsService: ProjetsService,  
    public dialog: MatDialog) { }

  //Récupère l'ID projet à envoyer via EventEmitter au Parent : Contact
  projetIdEventFunction($event){
    this.projetIdEvent.emit($event);
  }

  //Afficher toutes les projets : remplissage de la liste Select
  getAllProjetsController(): void {
    this.projetsService.getAllProjetsService()
    .subscribe(res => {
      this.projets = res;
    })
  }

  ngOnInit() {
    this.getAllProjetsController();
  }

  //Ouvre le pop-up pour ajouter une projet
  openDialog(): void {
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
        //On refresh la liste déroulante scroll aprés ajout de projet
        this.getAllProjetsController();
    });
  }

}
