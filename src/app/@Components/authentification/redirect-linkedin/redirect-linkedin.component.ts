import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthentificationService } from 'src/app/@Services/authentification.service';
import { UtilService } from 'src/app/@Util/util.service';

@Component({
  selector: 'app-redirect-linkedin',
  templateUrl: './redirect-linkedin.component.html',
  styleUrls: ['./redirect-linkedin.component.css']
})
export class RedirectLinkedinComponent implements OnInit {

  error: string;
  errorDescription: string;
  code: string;
  state: string;

  idLinkedin: string;
  identite: string;
  email: string;
  urlPhoto: string;


  constructor(private router: Router, private authentificationService: AuthentificationService, private utilService: UtilService) { }

  ngOnInit() {
    this.managerLinkedInRedirection();
    if (this.code !== '') {
      this.sendAuthorizationCodeController();
    }
  }

  managerLinkedInRedirection() {
    const url = this.router.url;
    const urlWithoutPath = url.substring(url.indexOf('?') + 1, url.length);
    const urlSplitted = urlWithoutPath.split('&');

    urlSplitted.forEach((value) => {
      const left  = value.substring(0, value.indexOf('='));
      const right = value.substring(value.indexOf('=') + 1 , value.length);

      if (left === 'error') {
          this.error = right;
      }
      if (left === 'error_description') {
        this.errorDescription = right;
      }
      if (left === 'code') {
        this.code = right;
      }
      if (left === 'state') {
        this.state = right;
      }
    });
  }

  sendAuthorizationCodeController() {
    this.authentificationService.sendAuthorizationCodeService(this.code, this.state)
    .subscribe
      (
        data => {
            if (data.token !== '') {
              // Candidat bien authentifié via Linkedin -> on le redirige Donc vers l'accueil
              this.router.navigate(['/accueil']);
            } else {
              // Rediriger vers Login et Afficher Message d'erreur
              this.utilService.openSnackBar('Une panne au niveau de l\'API Linkedin a eu lieu, veuillez ressayer plus tard ou bien essayer une autre méthode d\'authentification. ', 'Erreur');
              this.router.navigate(['/login']);
            }
        },
        error => {
              // Rediriger vers Login et Afficher Message d'erreur
              this.router.navigate(['/erreur']);
              console.log('Erreur = ' + error.error.message);
              this.utilService.openSnackBar('Une panne au niveau de l\'API Linkedin a eu lieu, veuillez ressayer plus tard ou bien essayer une autre méthode d\'authentification. ', 'Erreur');
        }
      );
  }

}
