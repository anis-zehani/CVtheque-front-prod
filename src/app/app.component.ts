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
  urlIsNotLoginPage = true;

  constructor(public authentificationService: AuthentificationService) {}


  ngOnInit(): void {
  }
}
