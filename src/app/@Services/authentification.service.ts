import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

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

    // return this.http.get<Utilisateur>(this.serviceUrl + '/authenticate', {headers}).pipe(
    return this.http.post<any>(this.serviceUrl + '/authenticate', JSON.stringify(this.utilisateur), this.httpOptions).pipe(
     map(
       data => {
        sessionStorage.setItem('username', username);
        const tokenValue = 'Bearer ' + data.token;
        sessionStorage.setItem('token', tokenValue);
        return data;
       }
     )
    );
  }

  // Vérifie si le client est logged In
  isUserLoggedIn() {
    const user = sessionStorage.getItem('username');
    return !(user === null);
  }

  // Supprime la variable username de la session
  logOut() {
    sessionStorage.removeItem('username');
  }
}
