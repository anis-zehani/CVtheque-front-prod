import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class Level2GuardService {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    // Administrateur OU Partenaire SEULEMENT peuvent accéder aux composants ayant le canActivate Level2GuardService
    if (jwt_decode(sessionStorage.getItem('token')).role === 'Administrateur' || jwt_decode(sessionStorage.getItem('token')).role === 'Partenaire') {
      return true;
    }

    return false;
  }
}
