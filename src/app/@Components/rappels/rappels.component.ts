import { Component, OnInit, ViewChild } from '@angular/core';

import { DatagridRappelsComponent } from '../../@Components/rappels/datagrid-rappels/datagrid-rappels.component';
import { ListeScrollInboxComponent } from '../../@Components/rappels/liste-scroll-inbox/liste-scroll-inbox.component';
import { ListeScrollProjetsComponent } from '../../@Components/rappels/liste-scroll-projets/liste-scroll-projets.component';


@Component({
  selector: 'app-rappels',
  templateUrl: './rappels.component.html'
})
export class RappelsComponent implements OnInit {

  //Afin d'appeler la fonction de Refrech Table chez le fils
  @ViewChild(DatagridRappelsComponent, {static: false}) Datagrid: DatagridRappelsComponent;

  //Afin d'appeler la fonction de Refrech de la liste Scroll Inbox
  @ViewChild(ListeScrollInboxComponent, {static: false}) listeScrollInbox: ListeScrollInboxComponent;

  //Afin d'appeler la fonction de Refrech de la liste Scroll Projets
  @ViewChild(ListeScrollProjetsComponent, {static: false}) listeScrollProjets: ListeScrollProjetsComponent;

  constructor() { }

  ngOnInit() {
  }

  //Afin de rafraichir la table quand je supprime un projet
  onRefreshTableByProjetDeleteEvent() 
  {

    this.Datagrid.getAllRappelsController();
    this.listeScrollInbox.ngOnInit();
    this.listeScrollProjets.ngOnInit();
  }

  //Afin de rafraichir les viewchilds : listes scroll inbox/projet
  onRefreshListeScrollEvent($event) 
  {
    //ici je ne refresh le Datagrid que lorsqu'un rappel est ajouté pour éviter une boucle infinie
    if($event === 'addRappel')
    {
      //Refresh du Datagrid pour afficher la nouvelle ligne via appel ViewChild
      this.Datagrid.getAllRappelsController();
    }
    
    this.listeScrollInbox.ngOnInit();
    this.listeScrollProjets.ngOnInit();
  }

    //Afin de rafraichir les viewchilds : listes scroll inbox/projet
    onRefreshDatagridEvent($event) 
    {
      //ici je ne refresh le Datagrid que lorsqu'un rappel est ajouté pour éviter une boucle infinie
      if($event === 'addRappel')
      {
        //Refresh du Datagrid pour afficher la nouvelle ligne via appel ViewChild
        this.Datagrid.getAllRappelsController();
      }
      
      this.listeScrollInbox.ngOnInit();
      this.listeScrollProjets.ngOnInit();
    }

  //Afin de rafraichir la table selon le projet cliqué
  onRefreshTableByProjetEvent($event) 
  {
    //Récupére l'idProjet et le nomProjet à partir de l'event envoyé de liste Scroll Projets
    let idProjet = $event.substring(0, $event.indexOf("#"));
    let nomProjet = $event.substring($event.indexOf("#")+1, $event.length);
    this.Datagrid.getAllRappelsByProjetController(idProjet, nomProjet);
  }

  //Afin de rafraichir la table selon l'inbox cliqué : inbox / today / next 7 days
  onRefreshTableByInboxEvent($event) 
  {
    if($event === 'inbox')
    {
      this.Datagrid.getAllRappelsController();
    }

    if($event === 'today')
    {
      this.Datagrid.getAllRappelsByTodayController();
    }

    if($event === 'next7days')
    {
      this.Datagrid.getAllRappelsByNext7DaysController();
    }
  }

}
