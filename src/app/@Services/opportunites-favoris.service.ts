import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OpportunitesFavoris } from '../@Models/opportunites-favoris';

@Injectable({
  providedIn: 'root'
})
export class OpportunitesFavorisService {

  private serviceUrl = environment.baseUrl + '/opportunitesfavoris';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
    };

  constructor(private http: HttpClient) { }

  // Retourne toutes les opportunités favories d'un utilisateur : Opportunite[]
  getAllOpportunitesFavorisForUtilisateurService(idUtilisateur): Observable<OpportunitesFavoris[]> {
    return this.http.get<OpportunitesFavoris[]>(this.serviceUrl + '/getAllOpportunitesFavorisForUtilisateur/' +
    idUtilisateur, this.httpOptions);
  }

  // Ajoute une opportunité favorie pour un utilisateur
  addOpportuniteToFavorisToUtilisateurService(opportunitesFavoris): Observable<any> {
    return this.http.post<any>(this.serviceUrl + '/addOpportuniteToFavorisToUtilisateur', JSON.stringify(opportunitesFavoris), this.httpOptions);
  }

  // Supprimer le lien entre une opportunité et un utilisateur
  deleteOpportuniteFromFavorisToUtilisateurService(idUtilisateur, idOpportunite) {
      return this.http.delete<any>(this.serviceUrl + '/deleteOpportuniteFromFavorisToUtilisateur/' + idUtilisateur +
      '/' + idOpportunite, this.httpOptions);
  }
}
