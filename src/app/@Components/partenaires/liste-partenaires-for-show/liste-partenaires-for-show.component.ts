import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DeleteConfirmationComponent } from '../../dialogs/delete-confirmation/delete-confirmation.component';

import { FormEditPartenairesComponent } from '../../../@Components/partenaires/form-edit-partenaires/form-edit-partenaires.component';
import { ShowPartenaireComponent } from '../../../@Components/partenaires/show-partenaire/show-partenaire.component';
import { UtilService } from '../../../@Util/util.service';
import { PartenairesService } from '../../../@Services/partenaires.service';
import { Partenaire } from '../../../@Models/partenaire';
import { Entreprise } from 'src/app/@Models/entreprise';


@Component({
  selector: 'app-liste-partenaires-for-show',
  templateUrl: './liste-partenaires-for-show.component.html',
  styleUrls: ['./liste-partenaires-for-show.component.css']
})
export class ListePartenairesForShowComponent implements OnInit {

  //Remplissage des listes par défaut
  listePartenaires: Partenaire[]=[];

  partenaire : Partenaire;
  entreprise: Entreprise;
  etatPartenaire : string = "True";

  @Input() idEntreprise;

  constructor(
    private partenairesService: PartenairesService, 
    private utilService: UtilService,
    public dialog: MatDialog
    )
    { 
    this.partenaire = new Partenaire();
    this.entreprise =  new Entreprise(null, null, null);
    this.partenaire.entreprise = this.entreprise;
    }

  ngOnInit() {

    if(this.idEntreprise != null)
    {
      this.getAllPartenairesByEntrepriseController(this.idEntreprise);
    }
  }

  //Afficher tous les partenaires par entreprise
  getAllPartenairesByEntrepriseController(idEntreprise): void {
    this.partenairesService.getAllPartenairesByEntrepriseService(idEntreprise)
    .subscribe
      (
      res => {this.listePartenaires = res;}
      )
  }

  //UPDATE le lien entre un partenaire et une entreprise : met entreprise à NULL
  updateLinkPartenaireEntrepriseController(idPartenaire): void {
    this.partenairesService.updateLinkPartenaireEntrepriseService(idPartenaire)
    .subscribe
      (
      res => 
      {
        this.getAllPartenairesByEntrepriseController(this.idEntreprise);

        this.utilService.openSnackBar("La liste des partenaires liés a été modifiée", "OK");
      }
      )
  }

  //Modifier un partenaire
  editPartenaireController() {
    this.partenairesService.editPartenaireService(this.partenaire)
      .subscribe
        (
        res => 
        { 
          if(res != null)
          {
            this.getAllPartenairesByEntrepriseController(this.idEntreprise);
            this.utilService.openSnackBar("Partenaire modifié", "OK");
          }
        }
        )
  }

  //Ouvre le pop-up pour afficher un partenaire
  openDialogShowPartenaire(id, identite, telephone, email, posteOccupe, descriptionDetaillee, urlPhoto, username, password, etatPartenaire, entreprise): void {
      //Objet pour configurer la modale
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.hasBackdrop=true;
      dialogConfig.closeOnNavigation = true;
  
      //Objet pour déclencher l'ouverture de la modale
      const dialogRef = this.dialog.open(ShowPartenaireComponent, {
        width: '850px',
        height: '650px',
        data: {
          id: id, 
          identite: identite,
          telephone : telephone,
          email : email,
          posteOccupe : posteOccupe,
          descriptionDetaillee : descriptionDetaillee,
          urlPhoto : urlPhoto,
          username : username,
          password : password,
          etatPartenaire : etatPartenaire,
          entreprise : entreprise
        }
      });
  }

  //Ouvre le pop-up pour modifier un partenaire
  openDialogEditPartenaire(id, identite, telephone, email, posteOccupe, descriptionDetaillee, urlPhoto, username, password, etatPartenaire, entreprise): void {
      //Objet pour configurer la modale
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.hasBackdrop=true;
      dialogConfig.closeOnNavigation = true;
  
      //Objet pour déclencher l'ouverture de la modale
      const dialogRef = this.dialog.open(FormEditPartenairesComponent, {
        width: '650px',
        height: '650px',
        data: {
          id: id, 
          identite: identite,
          telephone : telephone,
          email : email,
          posteOccupe : posteOccupe,
          descriptionDetaillee : descriptionDetaillee,
          urlPhoto : urlPhoto,
          username : username,
          password : password,
          etatPartenaire : etatPartenaire,
          entreprise : entreprise
        }
      });
  
      //Fonction qui s'éxècute quand je ferme la modale
      dialogRef.afterClosed().subscribe(result => {
        if(result){
            this.partenaire.id=result.id;
            this.partenaire.identite=result.identite;
            this.partenaire.telephone=result.telephone;
            this.partenaire.email=result.email;
            this.partenaire.posteOccupe=result.posteOccupe;
            this.partenaire.descriptionDetaillee=result.descriptionDetaillee;
            this.partenaire.urlPhoto=result.urlPhoto;
            this.partenaire.username=result.username;
            this.partenaire.password=result.password;
            this.partenaire.etatPartenaire=result.etatPartenaire;
            if(result.entreprise != null)
            {
              this.partenaire.entreprise.idEntreprise=result.entreprise.idEntreprise;
            }

            this.editPartenaireController();
            }
      });
  }

  //Ouvre le pop-up pour supprimer la liaison entre le partenaire et une entreprise
  openDialogDeleteLinkPartenaire(id): void {
    //Objet pour configurer la modale
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.hasBackdrop=true;
    dialogConfig.closeOnNavigation = true;

    //Objet pour déclencher l'ouverture de la modale
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      width: '450px',
      height: '180px',
      data: {
        id: id,
        texte : "Attention : la liaison avec ce partenaire sera supprimée définitivement."
      }
    });

    //Fonction qui s'éxècute quand je ferme la modale
    dialogRef.afterClosed().subscribe(result => {
      if(result)
      {

        if(this.idEntreprise != null)
        {
          this.updateLinkPartenaireEntrepriseController(result.id);
        }
      }
    });
  }
}
