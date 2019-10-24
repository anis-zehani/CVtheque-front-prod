import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/@Util/util.service';
import { Notification } from 'src/app/@Models/notification';
import { NotificationsService } from 'src/app/@Services/notifications.service';

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

  constructor(private utilService: UtilService, private notificationsService: NotificationsService) {}

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

}
