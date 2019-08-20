import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { DialogAddEcolesComponent } from '../../../@Components/ecoles/dialog-add-ecoles/dialog-add-ecoles.component';
import { EcolesService } from '../../../@Services/ecoles.service';
import { Ecole } from '../../../@Models/ecole';

@Component({
  selector: 'app-liste-ecoles',
  templateUrl: './liste-ecoles.component.html',
})
export class ListeEcolesComponent implements OnInit {

  ecoles:Ecole[];

  //Sert pour le Dialog : afin de fixer la valeur du Select par défaut
  @Input() ecoleId:number;

  //EventEmitter : afin d'envoyer une valeur au parent via un event
  @Output() ecoleIdEvent = new EventEmitter<Event>();

  constructor(
    private ecolesService: EcolesService,  
    public dialog: MatDialog) { }

  //Récupère l'ID ecole à envoyer via EventEmitter au Parent : Contact
  ecoleIdEventFunction($event){
    this.ecoleIdEvent.emit($event);
  }

  //Afficher toutes les ecoles : remplissage de la liste Select
  getAllEcolesController(): void {
    this.ecolesService.getAllEcolesService()
    .subscribe(res => {
      this.ecoles = res;
    })
  }

  ngOnInit() {
    this.getAllEcolesController();
  }

  //Ouvre le pop-up pour ajouter une ecole
  openDialog(): void {
    //Objet pour configurer la modale
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.hasBackdrop=true;
    dialogConfig.closeOnNavigation = true;

    //Objet pour déclencher l'ouverture de la modale
    const dialogRef = this.dialog.open(DialogAddEcolesComponent, {
      width: '300px',
      height: '250px'
    });

    //Fonction qui s'éxècute quand je ferme la modale
    dialogRef.afterClosed().subscribe(result => {
      //On refresh la liste déroulante aprés ajout de l'école
      this.getAllEcolesController();
    });
  }

}
