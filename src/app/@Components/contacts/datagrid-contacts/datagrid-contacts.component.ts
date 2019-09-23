import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatTableDataSource} from '@angular/material/table';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort} from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { environment } from '../../../../environments/environment';
import { ContactsService } from '../../../@Services/contacts.service';
import { Contact } from '../../../@Models/contact';
import { FormEditContactsComponent } from '../../../@Components/contacts/form-edit-contacts/form-edit-contacts.component';
import { ShowContactComponent } from '../../../@Components/contacts/show-contact/show-contact.component';
import { DeleteConfirmationComponent } from '../../../@Components/dialogs/delete-confirmation/delete-confirmation.component';
import { UtilService } from '../../../@Util/util.service';
import { Entreprise } from 'src/app/@Models/entreprise';

@Component({
  selector: 'app-datagrid-contacts',
  templateUrl: './datagrid-contacts.component.html',
  styleUrls: ['./datagrid-contacts.component.css']
})
export class DatagridContactsComponent implements OnInit {

  @Input() listeContacts = new MatTableDataSource<Contact>();

  displayedColumns: string[] = ['urlPhoto', 'contact', 'details', 'more'];

  contact: Contact;
  entreprise: Entreprise;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  // URL du serveur de stockage
  storageUrl = environment.storageUrl;

  constructor(
    private contactsService: ContactsService,
    private utilService: UtilService,
    public dialog: MatDialog
    ) {
    this.contact = new Contact();
    this.entreprise =  new Entreprise(null, null, null);
    this.contact.entreprise = this.entreprise;
   }

  ngOnInit() {
    this.getAllContactsController();
  }

  // Afficher tous les contacts : remplissage de la table
  getAllContactsController(): void {
    this.contactsService.getAllContactsService()
    .subscribe
      (
      res => {
        this.listeContacts.data = res;
        this.listeContacts.paginator = this.paginator;
        this.listeContacts.sort = this.sort;
      }
      );
  }

  // Modifier un contact
  editContactController() {
      this.contactsService.editContactService(this.contact)
      .subscribe
        (
        res => {
          if (res != null) {
            this.getAllContactsController();
            this.utilService.openSnackBar('Contact modifié', 'OK');
          } else {
            this.utilService.openSnackBar('Une erreur est survenue durant la modification du contact', 'Erreur');
          }
        }
        );
  }

  // Supprimer un contact
  deleteContactController(id) {
      this.contactsService.deleteContactService(id)
      .subscribe
        (
        res => {
          this.getAllContactsController();
          this.utilService.openSnackBar('Contact supprimé', 'OK');
        }
        );
  }

  // Recherche filtrée sur la table
  filtrerTable(filterValue: string) {
      this.listeContacts.filter = filterValue.trim().toLowerCase();
  }

  // Ouvre le pop-up pour modifier un contact
  openDialogEditContact(id, identite, telephone, email, posteOccupe, descriptionDetaillee, urlPhoto, entreprise): void {
      // Objet pour configurer la modale
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.hasBackdrop = true;
      dialogConfig.closeOnNavigation = true;

      // Objet pour déclencher l'ouverture de la modale
      const dialogRef = this.dialog.open(FormEditContactsComponent, {
        width: '750px',
        height: '600px',
        data: {
          id,
          identite,
          telephone,
          email,
          posteOccupe,
          descriptionDetaillee,
          urlPhoto,
          entreprise
        }
      });

      // Fonction qui s'éxècute quand je ferme la modale
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
            this.contact.id = result.id;
            this.contact.identite = result.identite;
            this.contact.telephone = result.telephone;
            this.contact.email = result.email;
            this.contact.posteOccupe = result.posteOccupe;
            this.contact.descriptionDetaillee = result.descriptionDetaillee;
            this.contact.urlPhoto = result.urlPhoto;
            if (result.entreprise != null) {
              this.contact.entreprise.idEntreprise = result.entreprise.idEntreprise;
            }

            this.editContactController();
        }
      });
    }

  // Ouvre le pop-up pour afficher un contact
  openDialogShowContact(id, identite, telephone, email, posteOccupe, descriptionDetaillee, urlPhoto, entreprise): void {
    // Objet pour configurer la modale
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.hasBackdrop = true;
    dialogConfig.closeOnNavigation = true;

    // Objet pour déclencher l'ouverture de la modale
    const dialogRef = this.dialog.open(ShowContactComponent, {
      width: '750px',
      height: '600px',
      data: {
        id,
        identite,
        telephone,
        email,
        posteOccupe,
        descriptionDetaillee,
        urlPhoto,
        entreprise
      }
    });
  }

  // Ouvre le pop-up pour supprimer un contact
  openDialogDeleteContact(id): void {
    // Objet pour configurer la modale
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.hasBackdrop = true;
    dialogConfig.closeOnNavigation = true;

    // Objet pour déclencher l'ouverture de la modale
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      width: '450px',
      height: '180px',
      data: {
        id,
        texte : 'Attention : ce contact sera supprimé définitivement.'
      }
    });

    // Fonction qui s'éxècute quand je ferme la modale
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
          this.deleteContactController(result.id);
      }
    });
  }

}
