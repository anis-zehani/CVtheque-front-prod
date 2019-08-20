import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { DialogAddEntreprisesComponent } from '../../../@Components/entreprises/dialog-add-entreprises/dialog-add-entreprises.component';
import { EntreprisesService } from '../../../@Services/entreprises.service';
import { Entreprise } from '../../../@Models/entreprise';

@Component({
  selector: 'app-liste-entreprises',
  templateUrl: './liste-entreprises.component.html'
})
export class ListeEntreprisesComponent implements OnInit {

  entreprises:Entreprise[];

  //Sert pour le Dialog : afin de fixer la valeur du Select par défaut
  @Input() entrepriseId:number;

  //EventEmitter : afin d'envoyer une valeur au parent via un event
  @Output() entrepriseIdEvent = new EventEmitter<Event>();

  constructor(
    private entreprisesService: EntreprisesService,  
    public dialog: MatDialog) { }

  //Récupère l'ID entreprise à envoyer via EventEmitter au Parent : Contact
  entrepriseIdEventFunction($event){
    this.entrepriseIdEvent.emit($event);
  }

  //Afficher toutes les entreprises : remplissage de la liste Select
  getAllEntreprisesController(): void {
    this.entreprisesService.getAllEntreprisesService()
    .subscribe(res => {
      this.entreprises = res;
    })
  }

  ngOnInit() {
    this.getAllEntreprisesController();
  }

  //Ouvre le pop-up pour ajouter une entreprise
  openDialog(): void {
    //Objet pour configurer la modale
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.hasBackdrop=true;
    dialogConfig.closeOnNavigation = true;

    //Objet pour déclencher l'ouverture de la modale
    const dialogRef = this.dialog.open(DialogAddEntreprisesComponent, {
      width: '400px',
      height: '500px'
    });

    //Fonction qui s'éxècute quand je ferme la modale
    dialogRef.afterClosed().subscribe(result => {
      //On refresh la liste déroulante aprés ajout de l'entreprise
      this.getAllEntreprisesController();
    });
  }

}
