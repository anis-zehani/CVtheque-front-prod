import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class Level1GuardService {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    // Administrateur SEULEMENT peut accéder aux composants ayant le canActivate Level1GuardService
    if (jwt_decode(sessionStorage.getItem('token')).role === 'Administrateur') {
      return true;
    }

    return false;
  }
}
