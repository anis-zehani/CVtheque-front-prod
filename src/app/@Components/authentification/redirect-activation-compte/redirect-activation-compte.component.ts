import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UtilisateurService } from 'src/app/@Services/utilisateur.service';
import { UtilService } from 'src/app/@Util/util.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthentificationService } from 'src/app/@Services/authentification.service';
import { CandidatsTemporairesService } from 'src/app/@Services/candidats-temporaires.service';

@Component({
  selector: 'app-redirect-activation-compte',
  templateUrl: './redirect-activation-compte.component.html',
  styleUrls: ['./redirect-activation-compte.component.css']
})
export class RedirectActivationCompteComponent implements OnInit {

  email: string;

  constructor(private authentificationService: AuthentificationService,
              private candidatsTemporairesService: CandidatsTemporairesService,
              private utilService: UtilService,
              private route: ActivatedRoute,
              private router: Router) {
      this.route.queryParams.subscribe(params => {
          this.email =  params.email;
    });
     }

  ngOnInit() {
    this.activationCompteCandidatController(this.email);
  }

  activationCompteCandidatController(email) {
    this.candidatsTemporairesService.activationCompteCandidatTemporaireService(email)
    .subscribe
      (
        res => {
            if (res) {
              // Cas ou le mail n'est pas libre (dèja utilisé)
              this.authentificationService.authenticateNewCreatedUser(email)
              .subscribe
              (
                result => {
                    if (result) {
                      // On affiche un message de confirmation
                      this.utilService.openSnackBar('Vous allez être redirigé vers votre compte dans quelques instants.', 'OK');
                      this.router.navigate(['accueil']);
                    } else {
                      // On affiche un message d'erreur'
                      this.utilService.openSnackBar('Une erreur de redirection a eu lieu', 'Erreur');
                    }
                }
              );
            } else {
              this.utilService.openSnackBar('Une erreur d\authentification s\est produite', 'Erreur');
            }
        }
      );
  }
}
