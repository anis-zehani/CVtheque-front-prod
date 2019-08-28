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

  constructor(private http: HttpClient) { }

  // Responsable de l'authentification
  authenticate(username, password) {

    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });

    return this.http.get<Utilisateur>(this.serviceUrl + '/authenticate', {headers}).pipe(
     map(
       userData => {
        sessionStorage.setItem('username', username);
        const authString = 'Basic ' + btoa(username + ':' + password);
        sessionStorage.setItem('basicAuth', authString);
        return userData;
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
