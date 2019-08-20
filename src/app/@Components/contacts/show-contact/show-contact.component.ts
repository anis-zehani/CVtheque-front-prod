import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { environment } from '../../../../environments/environment';

import { Contact } from '../../../@Models/contact';

@Component({
  selector: 'app-show-contact',
  templateUrl: './show-contact.component.html',
  styleUrls: ['./show-contact.component.css'],
})
export class ShowContactComponent implements OnInit {

  //URL du serveur de stockage
  storageUrl = environment.storageUrl;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Contact) { }

  ngOnInit() {
  }

}
