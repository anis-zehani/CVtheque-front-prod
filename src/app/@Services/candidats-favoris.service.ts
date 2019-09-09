import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CandidatsFavoris } from '../@Models/candidats-favoris';

@Injectable({
  providedIn: 'root'
})
export class CandidatsFavorisService {

  private serviceUrl = environment.baseUrl + '/candidatsfavoris';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
    };

  constructor(private http: HttpClient) { }

  // Retourne tous les CandidatsFavoris d'un utilisateur : CandidatsFavoris[]
  getAllCandidatsFavorisForUtilisateurService(idUtilisateur): Observable<CandidatsFavoris[]> {
    return this.http.get<CandidatsFavoris[]>(this.serviceUrl + '/getAllCandidatsFavorisForUtilisateur/' +
    idUtilisateur, this.httpOptions);
  }

  // Ajoute un candidat favoris pour un utilisateur
  addCandidatToFavorisToUtilisateurService(candidatFavori): Observable<any> {
    return this.http.post<any>(this.serviceUrl + '/addCandidatToFavorisToUtilisateur' , JSON.stringify(candidatFavori), this.httpOptions);
  }

  // Supprimer le lien entre un candidat et un utilisateur
  deleteCandidatFromFavorisToUtilisateurService(idUtilisateur, idCandidat) {
      return this.http.delete<any>(this.serviceUrl + '/deleteCandidatFromFavorisToUtilisateur/' + idUtilisateur +
      '/' + idCandidat, this.httpOptions);
  }
}
