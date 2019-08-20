import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { MatDialog,MatDialogConfig } from '@angular/material/dialog';

import { CandidatsService } from '../../../@Services/candidats.service';
import { Candidat } from '../../../@Models/candidat';

@Component({
  selector: 'app-liste-candidats-for-add',
  templateUrl: './liste-candidats-for-add.component.html',
  styleUrls: ['./liste-candidats-for-add.component.css']
})
export class ListeCandidatsForAddComponent implements OnInit {

  //Envoi l'event pour mettre à jour la table
  @Output() listeCandidatsEvent = new EventEmitter<Event>();

  //Remplissage de la liste par défaut
  listeCandidats: Candidat[]=[];

  constructor(
    private candidatsService: CandidatsService,    
    public dialog: MatDialog) { }

  ngOnInit() {
    this.getAllCandidatsController();
  }


  //Remplir la liste par toutes les candidats
  getAllCandidatsController(): void {
    this.candidatsService.getAllCandidatsService("True")
    .subscribe
      (
      res => { this.listeCandidats = res;}
      )
  }

  //On emet un Event au parent à chaque changement de la liste (ajout et suppression)
  onListeCandidatChange($event){
    this.listeCandidatsEvent.emit($event);
  }
}
