import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';

import { CollaborateursService } from '../../../@Services/collaborateurs.service';
import { Collaborateur } from '../../../@Models/collaborateur';
import { UtilService } from '../../../@Util/util.service';

@Component({
  selector: 'app-form-add-collaborateurs',
  templateUrl: './form-add-collaborateurs.component.html',
  styleUrls: ['./form-add-collaborateurs.component.css']
})
export class FormAddCollaborateursComponent implements OnInit {

  //Envoi l'event pour mettre à jour la table
  @Output() refreshTableEvent = new EventEmitter<Event>();

  collaborateur : Collaborateur;

  constructor(
    private collaborateursService: CollaborateursService,
    private utilService: UtilService
    ) 
    {
        this.collaborateur =  new Collaborateur;
    }

  ngOnInit() {
  }

  //Quand on ajoute un collaborateur : un EVENT est envoyé au Parent pour rafraichir la table
  refreshTableFunction($event){
      this.refreshTableEvent.emit($event);
  }

  //Ajouter une collaborateur + refresh de la table
  addCollaborateurController(collaborateurForm: NgForm) {
    this.collaborateursService.addCollaborateurService(this.collaborateur)
    .subscribe
      (
      res => 
      { 
        if(res != null)
        {
            this.refreshTableFunction(true);
            this.utilService.openSnackBar("Collaborateur ajouté", "OK");
        }
      }
      )
      collaborateurForm.resetForm();     
  }

}
