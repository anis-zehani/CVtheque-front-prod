import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as jwt_decode from 'jwt-decode';

import { Utilisateur } from '../@Models/utilisateur';


@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  private serviceUrl = environment.baseUrl + '/gateway/utilisateur';
  // Authentification via login / via Reset du Password
  private serviceUrlAuthenticationController = environment.baseUrl + '/gateway/authentication-controller';

  utilisateur: Utilisateur;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
    };

  constructor(private http: HttpClient) { }

  // Permet de faire l'authentification via le formulaire de login
  authenticate(username, password) {

    this.utilisateur = new Utilisateur();
    this.utilisateur.username =  username;
    this.utilisateur.password =  password;

    return this.http.post<any>(this.serviceUrlAuthenticationController + '/authenticate', JSON.stringify(this.utilisateur), this.httpOptions).pipe(
     map(
       data => {
        const tokenValue = 'Bearer ' + data.token;
        sessionStorage.setItem('token', tokenValue);
        return data;
       }
     )
    );
  }

  // Permet de faire l'authentification via un Reset Password
  authenticateByResetPassword(username, password) {

    this.utilisateur = new Utilisateur();
    this.utilisateur.username =  username;
    this.utilisateur.password =  password;

    return this.http.post<any>(this.serviceUrlAuthenticationController + '/authenticateByResetPassword', JSON.stringify(this.utilisateur), this.httpOptions).pipe(
     map(
       data => {
        const tokenValue = 'Bearer ' + data.token;
        sessionStorage.setItem('token', tokenValue);
        return data;
       }
     )
    );
  }

  // Permet de faire l'authentification d'un nouveau USER venant d'être crée
  authenticateNewCreatedUser(username) {

    this.utilisateur = new Utilisateur();
    this.utilisateur.username =  username;

    return this.http.post<any>(this.serviceUrlAuthenticationController + '/authenticateNewCreatedUser', JSON.stringify(this.utilisateur), this.httpOptions).pipe(
     map(
       data => {
        const tokenValue = 'Bearer ' + data.token;
        sessionStorage.setItem('token', tokenValue);
        return data;
       }
     )
    );
  }

  // Récupére Rôle Utilisateur à partir du Token stocké dans le Local Storage
  getRolesUserFromToken() {
    return jwt_decode(sessionStorage.getItem('token')).roles;
  }

  isUserAdmin() {
    const role = jwt_decode(sessionStorage.getItem('token')).roles;
    return !(role === 'ROLE_ADMINISTRATEUR');
  }

  /* Vérifie si le client est logged In
    en vérifiant si y a une variable 'token'
    dans la session
  */
  isUserLoggedIn() {
    return (sessionStorage.getItem('token') !== null);
  }

    /* Vérifie si l'utilisateur est reconnu
    en vérifiant que signInOdix existe dans le local Storage
  */
 isUserExistsInsessionStorage() {
  const signInOdix = sessionStorage.getItem('sign-in-odix');
  return !(signInOdix === null);
}

  /* Supprime la variable token de la session
  du coup l'utilisateur doit OBLIGATOIREMENT entrer ses paramètres
  de nouveau à la prochaine connexion
  */
  logOut() {
    sessionStorage.removeItem('token');
  }

  // Uitile pour rediriger vers Authentification LinkedIn OAuth2
  authenticateWithLinkedInService(): Observable<any> {
    return this.http.get<any>(this.serviceUrl + '/code-linkedin', this.httpOptions);
  }

  // LinkedIn OAuth2 : envoi Authorization Code au Serveur
  sendAuthorizationCodeService(code, state): Observable<any> {
    return this.http.post<any>(this.serviceUrl + '/redirect-linkedin/' + code + '/' + state, this.httpOptions).pipe(
      map(
        data => {
         const tokenValue = 'Bearer ' + data.token;
         sessionStorage.setItem('token', tokenValue);
         return data;
        }
      )
     );
  }
}
