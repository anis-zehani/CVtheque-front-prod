import { Component, OnInit } from '@angular/core';
import { UtilService } from 'src/app/@Util/util.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  role: string;

  constructor(private utilService: UtilService) { }

  ngOnInit() {
    // je récupère le rôle pour la restriction d'accès dans le menu
    this.role = this.utilService.getRoleUtilisateurFromToken();
  }

}
