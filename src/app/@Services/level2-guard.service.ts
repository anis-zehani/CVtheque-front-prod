import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UtilService } from '../@Util/util.service';

@Injectable({
  providedIn: 'root'
})
export class Level2GuardService implements CanActivate {

  constructor(private router: Router, private utilService: UtilService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    // Administrateur OU Partenaire SEULEMENT peuvent accéder aux composants ayant le canActivate Level2GuardService
    const role = this.utilService.getRoleUtilisateurFromToken();
    if (role === 'ROLE_ADMINISTRATEUR' || role === 'ROLE_PARTENAIRE') {
      return true;
    }

    return false;
  }
}
