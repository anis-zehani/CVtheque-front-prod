import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UtilisateurService } from 'src/app/@Services/utilisateur.service';
import { UtilService } from 'src/app/@Util/util.service';
import { PartenairesTemporairesService } from 'src/app/@Services/partenaires-temporaires.service';
import { PartenaireTemporaire } from 'src/app/@Models/partenaire-temporaire';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-form-add-compte-partenaire',
  templateUrl: './form-add-compte-partenaire.component.html',
  styleUrls: ['./form-add-compte-partenaire.component.css']
})
export class FormAddComptePartenaireComponent implements OnInit {

  // Mon Reactive Form
  formAddPartenaireHomePage = new FormGroup({
    identite: new FormControl('', Validators.required),
    telephone: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', Validators.required),
    entreprise: new FormControl('', Validators.required),
    posteOccupe: new FormControl('', Validators.required),
    descriptionDetaillee: new FormControl('', Validators.nullValidator)
  });

  partenaireTemporaire: PartenaireTemporaire;

  invalidate = false;

  constructor(private utilisateurService: UtilisateurService,
              private utilService: UtilService,
              private partenairesTemporairesService: PartenairesTemporairesService,
              public matDialogReference: MatDialogRef<FormAddComptePartenaireComponent>) {
               }

  ngOnInit() {
  }

  // Vérifie si l'adresse email introduite appartient dèja à un autre utilisateur
  checkIfUserPartenaireEmailExists() {
    const email = this.formAddPartenaireHomePage.get('email').value;
    this.utilisateurService.getOneUtilisateurService(email)
    .subscribe
      (
        res => {
            if (res != null) {
              // Cas ou le mail n'est pas libre (dèja utilisé)
              this.invalidate = true;
              this.utilService.openSnackBar('Cette adresse email existe dèja, veuillez vous connecter.', 'Attention');
            } else {
              this.invalidate = false;
            }
        }
      );
  }

  addPartenaireTemporaire() {
    const identite = this.formAddPartenaireHomePage.get('identite').value;
    const telephone = this.formAddPartenaireHomePage.get('telephone').value;
    const email = this.formAddPartenaireHomePage.get('email').value;
    const username = email;
    const password = this.formAddPartenaireHomePage.get('password').value;
    const entreprise = this.formAddPartenaireHomePage.get('entreprise').value;
    const posteOccupe = this.formAddPartenaireHomePage.get('posteOccupe').value;
    const descriptionDetaillee = this.formAddPartenaireHomePage.get('descriptionDetaillee').value;

    this.partenaireTemporaire = new PartenaireTemporaire(null, identite, telephone, email, username, password,  entreprise, posteOccupe, descriptionDetaillee);

    this.partenairesTemporairesService.addPartenaireTemporaireService(this.partenaireTemporaire)
    .subscribe
      (
        res => {
            if (res != null) {
              // Fermer le Dialog
              this.matDialogReference.close([]);
              this.utilService.openSnackBar('Votre demande est envoyée au service commercial, votre compte sera activé rapidement', 'OK');
            } else {
              this.utilService.openSnackBar('Une erreur s\'est produite durant l\'activation du compte.', 'Erreur');
            }
        }
      );
  }
}
