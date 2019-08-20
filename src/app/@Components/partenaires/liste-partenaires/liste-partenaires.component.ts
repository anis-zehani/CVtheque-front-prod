import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog,MatDialogConfig } from '@angular/material/dialog';

import { PartenairesService } from '../../../@Services/partenaires.service';
import { Partenaire } from '../../../@Models/partenaire';
import { DialogAddPartenairesComponent } from '../../../@Components/partenaires/dialog-add-partenaires/dialog-add-partenaires.component';


@Component({
  selector: 'app-liste-partenaires',
  templateUrl: './liste-partenaires.component.html'
})
export class ListePartenairesComponent implements OnInit {

  partenaires:Partenaire[];

  //Sert pour le Dialog : afin de fixer la valeur du Select par défaut
  @Input() partenaireId:number;

  //EventEmitter : afin d'envoyer une valeur au parent via un event
  @Output() partenaireIdEvent = new EventEmitter<Event>();

  constructor(private partenairesService: PartenairesService, public dialog: MatDialog) { }

  //Récupère l'ID partenaire à envoyer via EventEmitter au Parent : Contact
  partenaireIdEventFunction($event){
    this.partenaireIdEvent.emit($event);
  }

  //Afficher toutes les partenaires : remplissage de la liste Select
  getAllPartenairesController(): void {
    this.partenairesService.getAllPartenairesService("True")
    .subscribe(res => {
      this.partenaires = res;
    })
  }

  ngOnInit() {
    this.getAllPartenairesController();
  }

  //Ouvre le pop-up pour ajouter un partenaire
  openDialog(): void {
    //Objet pour configurer la modale
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.hasBackdrop=true;
    dialogConfig.closeOnNavigation = true;

    //Objet pour déclencher l'ouverture de la modale
    const dialogRef = this.dialog.open(DialogAddPartenairesComponent, {
      width: '700px',
      height: '600px'
    });

    //Fonction qui s'éxècute quand je ferme la modale
    dialogRef.afterClosed().subscribe(result => {
      //On refresh la liste déroulante aprés ajout d'un partenaire
      this.getAllPartenairesController();
    });
  }

}
