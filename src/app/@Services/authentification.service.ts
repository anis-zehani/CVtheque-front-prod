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


  authenticate(username, password) {

    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa(username + ':' + password) });

    return this.http.get<Utilisateur>(this.serviceUrl + '/validateLogin', {headers}).pipe(
     map(
       userData => {
        sessionStorage.setItem('username', username);
        const authString = 'Basic ' + btoa(username + ':' + password);
        sessionStorage.setItem('basicauth', authString);
        return userData;
       }
     )
    );
  }

  isUserLoggedIn() {
    const user = sessionStorage.getItem('username');
    return !(user === null);
  }

  logOut() {
    sessionStorage.removeItem('username');
  }
}
