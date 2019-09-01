import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    // Administrateur SEULEMENT peut accéder aux composants ayant le canActivate AdminGuardService
    if (jwt_decode(sessionStorage.getItem('token')).role === 'Administrateur') {
      return true;
    }

    return false;
  }
}
