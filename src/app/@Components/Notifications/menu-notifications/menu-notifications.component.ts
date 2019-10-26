import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/@Util/util.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { Notification } from 'src/app/@Models/notification';
import { NotificationsService } from 'src/app/@Services/notifications.service';
import { ShowNotificationComponent } from '../show-notification/show-notification.component';

@Component({
  selector: 'app-menu-notifications',
  templateUrl: './menu-notifications.component.html',
  styleUrls: ['./menu-notifications.component.css']
})
export class MenuNotificationsComponent implements OnInit {

  idDestinataire: number;
  matBadgeValue: number;
  etatNotification = 'True';
  listeNotifications: Notification[] = [];

  constructor(private utilService: UtilService,
              private notificationsService: NotificationsService,
              public dialog: MatDialog) {}

  ngOnInit() {
    // je récupère le rôle pour la restriction d'accès dans le menu
    this.idDestinataire = this.utilService.getIdUtilisateurFromToken();
    this.getAllNotificationsByIdAndEtatController(this.idDestinataire, 'True');
  }

  getAllNotificationsByIdAndEtatController(idDestinataire, etatNotification) {
    this.notificationsService.getAllNotificationsByIdAndEtatService(idDestinataire, etatNotification)
    .subscribe
      (res => {
        if (res != null) {
            this.listeNotifications = res;
            this.matBadgeValue = res.length;
        }
      }
      );
  }

  deactivateNotificationController(idNotification) {
    this.notificationsService.deactivateNotificationService(idNotification)
    .subscribe
      (res => {
        if (res) {
          this.ngOnInit();
        } else {
          this.utilService.openSnackBar('Une erreur est survenue lors de la désactivation de cette notification', 'Erreur');
        }
      }
      );
  }

  // Ouvre le pop-up pour afficher une Notification
  openDialogShowNotification(id, generateurNotification, objetNotification, corpstNotification, dateAjout, etatNotification, candidatNotification, partenaireTemporaireNotification, opportuniteNotification): void {
    // Objet pour configurer la modale
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.hasBackdrop = true;
    dialogConfig.closeOnNavigation = true;

    // Objet pour déclencher l'ouverture de la modale
    const dialogRef = this.dialog.open(ShowNotificationComponent, {
        width: '500px',
        height: '330px',
        data:
        {
          id,
          generateurNotification,
          objetNotification,
          corpstNotification,
          dateAjout,
          etatNotification,
          candidatNotification,
          partenaireTemporaireNotification,
          opportuniteNotification
        }
    });
    }

}
