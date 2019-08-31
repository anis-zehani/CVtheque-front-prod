import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { ReadTokenService } from 'src/app/@Services/read-token.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate {

  constructor(private router: Router, private readTokenService: ReadTokenService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    // Administrateur SEULEMENT peut accéder aux composants ayant le canActivate AdminGuardService
    if (this.readTokenService.getRole() === 'Administrateur') {
      return true;
    }

    return false;
  }
}
