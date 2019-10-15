import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

import { UtilService } from '../@Util/util.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Utilisateur } from '../@Models/utilisateur';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  private serviceUrl = environment.baseUrl + '/utilisateur';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
    };

  constructor(private http: HttpClient) { }

  // Retourne un Utilisateur par son email : Utilisateur
  getOneUtilisateurService(email): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(this.serviceUrl + '/password-forgotten/' + email, this.httpOptions);
  }

  envoiEmailResetPasswordService(email): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(this.serviceUrl + '/password-send-email-reset/' + email, this.httpOptions);
  }

  resetPasswordUtilisateurService(email, password): Observable<Utilisateur> {
    return this.http.put<Utilisateur>(this.serviceUrl + '/password-reset/' + email + '/' + password, this.httpOptions);
  }
}
