import { Component, OnInit , ViewChild} from '@angular/core';
import { DatagridContactsComponent } from '../../@Components/contacts/datagrid-contacts/datagrid-contacts.component';


@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
})

export class ContactsComponent implements OnInit {

  // Afin d'appeler la fonction de Refrech Table chez le fils
  @ViewChild(DatagridContactsComponent, {static: false}) Datagrid: DatagridContactsComponent;

  constructor() {}

  ngOnInit() {}

  // Afin de rafraichir la table quand on ajoute une technologie
  onRefreshTableEvent($event) {
    this.Datagrid.getAllContactsController();
  }

}

