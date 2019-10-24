import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Notification } from 'src/app/@Models/notification';

@Component({
  selector: 'app-show-notification',
  templateUrl: './show-notification.component.html',
  styleUrls: ['./show-notification.component.css']
})
export class ShowNotificationComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: Notification) { }

  ngOnInit() {
  }

}
