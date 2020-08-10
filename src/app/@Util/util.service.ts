import { Injectable } from '@angular/core';
import { MatSnackBar} from '@angular/material/snack-bar';
import * as jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private snackBar: MatSnackBar) { }

  // Affiche une Notification SnackBar en bas de l'écran
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
      panelClass: ['snackbar']
    });
  }

  // Affiche une Notification d'erreur en bas de l'écran
  openSnackBarErreur(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 8000,
      panelClass: ['snackbarErreur']
    });
  }

  // Récupére Id Utilisateur à partir du Token stocké dans la session
  getIdUtilisateurFromToken() {
    // Je récupère l'idUtilisateur du Token pour l'envoyer dans les requêtes REST
    const idUtilisateur = jwt_decode(sessionStorage.getItem('token')).id;

    return idUtilisateur;
  }

  // Récupére Identité Utilisateur à partir du Token stocké dans la session
  getIdentiteUtilisateurFromToken() {
    // Je récupère Identité Utilisateur pour les affichages
    const identiteUtilisateur = jwt_decode(sessionStorage.getItem('token')).identite;

    return identiteUtilisateur;
  }

  // Récupére Rôle Utilisateur à partir du Token stocké dans la session
  getRoleUtilisateurFromToken() {
    // je récupère le rôle pour la restriction d'accès dans le menu
    const roleUtilisateur = jwt_decode(sessionStorage.getItem('token')).role;

    return roleUtilisateur;
  }

    // Récupére tout le Token sans décodage à partir de la session Storage
    getTheWholeTokenFromsessionStorage() {
      // Je récupère tout le Token sans décodage
      const token = sessionStorage.getItem('token');

      return token;
    }

  //on retourne true si le token is Expired
  tokenIsExpired() {
    //Par défaut on considère que le token is Expired
    var expired = true;
    var token = sessionStorage.getItem('token');
    if(token != null){
      expired = (Math.floor((new Date).getTime() / 1000)) >= (JSON.parse(atob(token.split('.')[1]))).exp;
    }
    return expired;
  }
}
