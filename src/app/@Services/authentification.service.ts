import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import * as jwt_decode from 'jwt-decode';

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

    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });
    this.utilisateur = new Utilisateur();
    this.utilisateur.username =  username;
    this.utilisateur.password =  password;

    return this.http.post<any>(this.serviceUrl + '/authenticate', JSON.stringify(this.utilisateur), this.httpOptions).pipe(
     map(
       data => {
        const tokenValue = 'Bearer ' + data.token;
        sessionStorage.setItem('token', tokenValue);

        const decodedToken = jwt_decode(data.token);

        sessionStorage.setItem('id', decodedToken.id);
        sessionStorage.setItem('identite', decodedToken.identite);
        sessionStorage.setItem('role', decodedToken.role);

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
  du coup l'utilisateur doit entrer ses paramètres
  de nouveau à la prochaine connexion
  */
  logOut() {
    sessionStorage.removeItem('token');

    sessionStorage.removeItem('id');
    sessionStorage.removeItem('identite');
    sessionStorage.removeItem('role');
  }
}
