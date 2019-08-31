import { Component, OnInit } from '@angular/core';
import { ReadTokenService } from 'src/app/@Services/read-token.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  id: string;
  identite: string;
  role: string;

  constructor(private readTokenService: ReadTokenService) {}

  ngOnInit() {

    // Je récupère les claims à partir du service qui lit et décode le token : id, identite, role
    this.id = this.readTokenService.getId();
    this.identite = this.readTokenService.getIdentite();
    this.role = this.readTokenService.getRole();
  }

}
