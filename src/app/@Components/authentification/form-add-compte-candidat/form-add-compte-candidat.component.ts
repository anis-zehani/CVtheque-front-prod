import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UtilisateurService } from 'src/app/@Services/utilisateur.service';
import { UtilService } from 'src/app/@Util/util.service';
import { CandidatsTemporairesService } from 'src/app/@Services/candidats-temporaires.service';
import { CandidatTemporaire } from 'src/app/@Models/candidat-temporaire';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-form-add-compte-candidat',
  templateUrl: './form-add-compte-candidat.component.html',
  styleUrls: ['./form-add-compte-candidat.component.css']
})
export class FormAddCompteCandidatComponent implements OnInit {

  // Mon Reactive Form
  formAddCandidatHomePage = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', Validators.required),
    identite: new FormControl('', Validators.required)
  });

  candidatTemporaire: CandidatTemporaire;

  invalidate = false;

  constructor(private utilisateurService: UtilisateurService,
              private utilService: UtilService,
              private candidatsTemporairesService: CandidatsTemporairesService,
              public matDialogReference: MatDialogRef<FormAddCompteCandidatComponent>) {
               }

  ngOnInit() {
  }

  // Vérifie si l'adresse email introduite appartient dèja à un autre utilisateur
  checkIfUserEmailExists() {
    const email = this.formAddCandidatHomePage.get('email').value;
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

  addCandidatTemporaire() {
    const email = this.formAddCandidatHomePage.get('email').value;
    const username = email;
    const password = this.formAddCandidatHomePage.get('password').value;
    const identite = this.formAddCandidatHomePage.get('identite').value;
    this.candidatTemporaire = new CandidatTemporaire(null, identite, username, password, email);

    this.candidatsTemporairesService.addCandidatTemporaireService(this.candidatTemporaire)
    .subscribe
      (
        res => {
            if (res != null) {
              // Fermer le Dialog
              this.matDialogReference.close([]);
              this.utilService.openSnackBar('Un lien d\'activation du compte vous sera envoyé dans quelques instants', 'OK');
              // On envoi le mail via Back avec lien d'activation du compte
              this.candidatsTemporairesService.envoiEmailActivationCompteCandidatService(email)
              .subscribe
                (
                  result => {
                      if (result) {
                        // On affiche un message de confirmation
                        this.utilService.openSnackBar('Le lien d\'activation a été envoyé par email, merci de le consulter.', 'OK');
                      } else {
                        // On affiche un message d'erreur'
                        this.utilService.openSnackBar('Une erreur dans l\'envoi du mail d\'activation du compte.', 'Erreur');
                      }
                  }
                );
            } else {
               this.utilService.openSnackBar('Une erreur s\'est produite durant l\'activation du compte.', 'Erreur');
            }
        }
      );
  }
}
