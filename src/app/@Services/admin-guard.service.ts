import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    // je récupère le token à partir de la session : le token contient les claims
    // les claims contiennent : id, identite, role
    const decodedToken = jwt_decode(sessionStorage.getItem('token'));

    // seul Administrateur peut accéder aux composants ayant le canActivate AdminGuardService
    if (decodedToken.role === 'Administrateur') {
      return true;
    }

    return false;
  }
}
