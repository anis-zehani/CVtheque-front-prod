import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { Utilisateur } from '../@Models/utilisateur';


@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  private serviceUrl = environment.baseUrl + '/utilisateur';

  utilisateur: Utilisateur;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
    };

  constructor(private http: HttpClient) { }

  // Responsable de l'authentification
  authenticate(username, password) {

    this.utilisateur = new Utilisateur();
    this.utilisateur.username =  username;
    this.utilisateur.password =  password;

    return this.http.post<any>(this.serviceUrl + '/authenticate', JSON.stringify(this.utilisateur), this.httpOptions).pipe(
     map(
       data => {
        const tokenValue = 'Bearer ' + data.token;
        sessionStorage.setItem('token', tokenValue);
        return data;
       }
     )
    );
  }

  /* Vérifie si le client est logged In
    en vérifiant si y a une variable 'token'
    dans la session
  */
  isUserLoggedIn() {
    const user = sessionStorage.getItem('token');
    return !(user === null);
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
    return this.http.post<any>(this.serviceUrl + '/redirect-linkedin/' + code + '/' + state, this.httpOptions);
  }

}
