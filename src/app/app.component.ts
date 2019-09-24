import { OnInit, Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthentificationService } from './@Services/authentification.service';
import { UtilService } from './@Util/util.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {

  title = 'Odix : le sourcing rendu facile';
  signInOdix: string;

  constructor(public authentificationService: AuthentificationService,
              private utilService: UtilService,
              private router: Router) {}

  ngOnInit() {

    // je récupère tout le signInOdix du Local Storage : pour afficher / cacher le formulaire d'authentification
    // this.signInOdix = this.utilService.getTheWholeTokenFromLocalStorage();

    /* Si le signInOdix existe, ça veut que l'utilisateur est authentifié, alors pas la peine de passer
    * par le forlumaire d'authentification
    */
    /*if (this.signInOdix !== null) {
      this.router.navigate(['/accueil']);
    }*/
  }
}
