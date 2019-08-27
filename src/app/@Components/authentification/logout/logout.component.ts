import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from '../../../@Services/authentification.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private router: Router, private authentificationService: AuthentificationService) { }

  ngOnInit() {
  }

  logout() {
    this.authentificationService.logOut();
    this.router.navigate(['']);
  }

}
