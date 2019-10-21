import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { UtilService } from '../../../@Util/util.service';
import { FileUploadService } from '../../../@Services/file-upload.service';
import { MatSpinnerComponent } from '../../dialogs/mat-spinner/mat-spinner.component';

import { environment } from '../../../../environments/environment';
import { PartenairesService } from 'src/app/@Services/partenaires.service';
import { Partenaire } from 'src/app/@Models/partenaire';

@Component({
  selector: 'app-account-partenaire',
  templateUrl: './account-partenaire.component.html',
  styleUrls: ['./account-partenaire.component.css']
})
export class AccountPartenaireComponent implements OnInit {

  // URL du serveur de stockage
  storageUrl = environment.storageUrl;

  id: number;
  partenaire: Partenaire;
  partenaireToSend: Partenaire;

  // FileUpload : Photo AutoFill
  selectedFilesPhotoAutoFill: FileList;
  currentFileUploadPhotoAutoFill: File;
  namePhoto: string;

  constructor(private partenairesService: PartenairesService,
              private utilService: UtilService,
              private uploadService: FileUploadService,
              public dialog: MatDialog) { }

  ngOnInit() {
    // je récupère le id
    this.id = this.utilService.getIdUtilisateurFromToken();
    this.getOnePartenaireController(this.id);
  }


  // Afficher le Partenaire
  getOnePartenaireController(id): void {
    this.partenairesService.getOnePartenaireService(this.id)
    .subscribe
      (
      data => {
        this.partenaire = data;
      }
      );
  }

  // Click sur le bouton Modifier mes informations
  editPartenaireAutoFill(
    id,
    identite,
    telephone,
    email,
    emailPartenaireAutoFill,
    telephonePartenaireAutoFill,
    entrepriseActuellePartenaireAutoFill,
    posteOccupePartenaireAutoFill,
    telephoneEntreprisePartenaireAutoFill,
    effectifEntreprisePartenaireAutoFill,
    siteInternetEntreprisePartenaireAutoFill,
    adresseEntreprisePartenaireAutoFill,
    descriptionDetailleePartenaireAutoFill
  ) {
    // On ouvre la modale Spinner
    this.openDialogSpinner();

    this.partenaireToSend = new Partenaire();

    this.partenaireToSend.id = id;
    this.partenaireToSend.identite = identite;
    this.partenaireToSend.telephone = telephone;
    this.partenaireToSend.email = email;
    this.partenaireToSend.emailPartenaireAutoFill = emailPartenaireAutoFill;
    this.partenaireToSend.telephonePartenaireAutoFill = telephonePartenaireAutoFill;
    this.partenaireToSend.entrepriseActuellePartenaireAutoFill = entrepriseActuellePartenaireAutoFill;
    this.partenaireToSend.posteOccupePartenaireAutoFill = posteOccupePartenaireAutoFill;
    this.partenaireToSend.telephoneEntreprisePartenaireAutoFill = telephoneEntreprisePartenaireAutoFill;
    this.partenaireToSend.effectifEntreprisePartenaireAutoFill = effectifEntreprisePartenaireAutoFill;
    this.partenaireToSend.siteInternetEntreprisePartenaireAutoFill = siteInternetEntreprisePartenaireAutoFill;
    this.partenaireToSend.adresseEntreprisePartenaireAutoFill = adresseEntreprisePartenaireAutoFill;
    this.partenaireToSend.descriptionDetailleePartenaireAutoFill = descriptionDetailleePartenaireAutoFill;


    this.partenairesService.editPartenaireAutoFillService(this.partenaireToSend)
    .subscribe({
      next: (res) => {
        // Ici on fait appel à EditPhoto qui contient l'appel Async de EditCvOriginal
        this.editPhotoProfilAutoFill(id);
        // On ferme la modale Spinner
        this.closeDialogSpinner();
        // Refresh de la UI
        this.ngOnInit();
        this.utilService.openSnackBar('Votre profil a été mis à jour', 'OK');
      },
      error: () => {
        // On ferme la modale Spinner
        this.closeDialogSpinner();
        this.utilService.openSnackBar('Une erreur est survenue durant la mise à jour du profil', 'Erreur');
      }
    });
  }

  // FileUpload
  selectPhotoProfilPartenaireAutoFill($event, idPartenaire) {
    this.selectedFilesPhotoAutoFill = $event.target.files;
    this.namePhoto = this.selectedFilesPhotoAutoFill.item(0).name;
    this.editPhotoProfilAutoFill(idPartenaire);
  }

  // Upload Photo de Profil AutoFill
  async editPhotoProfilAutoFill(id) {
    if (this.selectedFilesPhotoAutoFill !=  null) {
        this.currentFileUploadPhotoAutoFill = this.selectedFilesPhotoAutoFill.item(0);
        const result = await this.uploadService.addPhotoPartenaireAutoFill(this.currentFileUploadPhotoAutoFill, id);
        this.selectedFilesPhotoAutoFill = undefined;
    }
  }

  openDialogSpinner(): void {
    // Objet pour configurer la modale Spinner : le temps de l'upload
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.closeOnNavigation = false;
    const dialogRef = this.dialog.open(MatSpinnerComponent, {
      width: '450px',
      height: '200px',
      data: {
          // texte : "Afficher Message."
        }
      });
  }

  closeDialogSpinner(): void {
    // Ferme toutes les modales Spinner : upload is out
    this.dialog.closeAll();
  }

}
