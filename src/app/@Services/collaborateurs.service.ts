import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Collaborateur } from '../@Models/collaborateur';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class CollaborateursService {

  private serviceUrl = environment.baseUrl + '/collaborateur';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
    };

  constructor(private http: HttpClient) { }

  // Retourne un tableau de touts les collaborateurs : Collaborateur[]
  getAllCollaborateursService(): Observable<Collaborateur[]> {
    return this.http.get<Collaborateur[]>(this.serviceUrl);
  }

  // Retourne un seul collaborateur par son ID : Collaborateur
  getOneCollaborateurService(id): Observable<Collaborateur> {
    return this.http.get<Collaborateur>(this.serviceUrl + '/' + id, this.httpOptions);
  }

  // Retourne le collaborateur créée : Collaborateur
  addCollaborateurService(collaborateur): Observable<Collaborateur> {
    return this.http.post<any>(this.serviceUrl, JSON.stringify(collaborateur), this.httpOptions);
  }

  // Retourne le collaborateur modifié : Collaborateur
  editCollaborateurService(collaborateur): any {
    return this.http.put<any>(this.serviceUrl, JSON.stringify(collaborateur), this.httpOptions);
  }

  // Ne retourne rien
  deleteCollaborateurService(id) {
    return this.http.delete<any>(this.serviceUrl + '/' + id, this.httpOptions);
  }
}
