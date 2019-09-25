import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UtilService } from '../@Util/util.service';

@Injectable({
  providedIn: 'root'
})
export class Level1GuardService implements CanActivate {

  constructor(private router: Router, private utilService: UtilService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    // Administrateur SEULEMENT peut accéder aux composants ayant le canActivate Level1GuardService
    const role = this.utilService.getRoleUtilisateurFromToken();
    if (role === 'ROLE_ADMINISTRATEUR') {
      return true;
    }

    return false;
  }
}
