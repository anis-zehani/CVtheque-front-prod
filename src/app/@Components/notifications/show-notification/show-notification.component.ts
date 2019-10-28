import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Notification } from 'src/app/@Models/notification';
import { UtilService } from 'src/app/@Util/util.service';
import { NotificationsService } from 'src/app/@Services/notifications.service';

@Component({
  selector: 'app-show-notification',
  templateUrl: './show-notification.component.html',
  styleUrls: ['./show-notification.component.css']
})
export class ShowNotificationComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Notification,
              private utilService: UtilService,
              private dialog: MatDialog,
              private notificationsService: NotificationsService) { }

  ngOnInit() {
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
    this.dialog.closeAll();
  }

}
