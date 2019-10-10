import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { FormAddRappelsComponent } from '../form-add-rappels/form-add-rappels.component';
import { RappelsService } from '../../../@Services/rappels.service';

@Component({
  selector: 'app-liste-scroll-inbox',
  templateUrl: './liste-scroll-inbox.component.html'
})
export class ListeScrollInboxComponent implements OnInit {

  // Envoi l'event pour mettre à jour la table selon le projet choisi
  @Output() refreshTableByInboxEvent = new EventEmitter<Event>();

  // Envoi l'event pour mettre les listes scroll : inbox/projet : selon le paramètre passé
  @Output() refreshListeScrollEvent = new EventEmitter<Event>();

  nbreInbox = 0;
  nbreToday = 0;
  nbreNext7Days = 0;

  constructor(
    private rappelsService: RappelsService,
    public dialog: MatDialog
    ) { }

  ngOnInit() {
    this.getAllRappelsInboxController();
    this.getAllRappelsByTodayController();
    this.getAllRappelsByNext7DaysController();
  }

  // Pour récupérer le nombre des rappels de Inbox
  async getAllRappelsInboxController() {
    const res1 = await this.rappelsService.getAllRappelsService();
    this.nbreInbox = res1.length;
  }

  // Pour récupérer le nombre des rappels de Today
  getAllRappelsByTodayController(): void {
    this.rappelsService.getAllRappelsByTodayService()
    .subscribe
      (
      res2 => {
        this.nbreToday = res2.length;
      }
      );
  }

  // Pour récupérer le nombre des rappels des Next 7 Days
  getAllRappelsByNext7DaysController(): void {
    this.rappelsService.getAllRappelsByNext7DaysService()
    .subscribe
      (
      res3 => {
        this.nbreNext7Days = res3.length;
      }
      );
  }

  // Ouvre le pop-up pour ajouter un rappel
  openDialogAddRappel(): void {
    // Objet pour configurer la modale
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.hasBackdrop = true;
    dialogConfig.closeOnNavigation = true;

    // Objet pour déclencher l'ouverture de la modale
    const dialogRef = this.dialog.open(FormAddRappelsComponent, {
      width: '700px',
      height: '450px'
    });

    // Fonction qui s'éxècute quand je ferme la modale
    dialogRef.afterClosed().toPromise().then(result => {
      // On refresh le datagrid aprés ajout de rappel : ça va faire appel à la méthode
      // onRefreshListeScrollEvent du Parent qui fera le job
      this.getAllRappelsInboxController();
      this.refreshListeScrollFunction('addRappel');
    });
  }

  // Quand je met à jour ou j'ajoute un Rappel, un event est envoyé au parent pour rafraichir ses viewchilds : listes scroll
  refreshListeScrollFunction($event) {
      this.refreshListeScrollEvent.emit($event);
  }

  // Quand on clique sur un Inbox: un EVENT est envoyé au Parent pour rafraichir la table selon l'inbox choisi parmi les 3
  filtrerDatagridByInbox($event) {
    this.refreshTableByInboxEvent.emit($event);
  }

}
