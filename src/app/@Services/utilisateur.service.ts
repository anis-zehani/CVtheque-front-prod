import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

import { UtilService } from '../@Util/util.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Candidat } from '../@Models/candidat';
import { Opportunite } from '../@Models/opportunite';

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

  constructor(private http: HttpClient, private utilService: UtilService) { }

  // Retourne tous les candidats favoris d'un utilisateur : Candidat[]
  getAllCandidatsFavorisForUtilisateurService(idUtilisateur): Observable<Candidat[]> {
    return this.http.get<Candidat[]>(this.serviceUrl + '/getAllCandidatsFavorisForUtilisateur/' +
    idUtilisateur, this.httpOptions);
  }

  // Ajoute un candidat favoris pour un utilisateur
  addCandidatToFavorisUtilisateurService(idUtilisateur, idCandidat): Observable<any> {
    return this.http.post<any>(this.serviceUrl + '/addCandidatToFavorisUtilisateur/' + idUtilisateur +
    '/' + idCandidat, this.httpOptions);
  }

  // Supprimer le lien entre un candidat et un utilisateur
  deleteCandidatFromFavorisUtilisateurService(idUtilisateur, idCandidat) {
      return this.http.delete<any>(this.serviceUrl + '/deleteCandidatFromFavorisUtilisateur/' + idUtilisateur +
      '/' + idCandidat, this.httpOptions);
  }

  // Ajoute une opportunité favorie pour un utilisateur
  addOpportuniteToFavorisUtilisateurService(idUtilisateur, idOpportunite): Observable<any> {
    return this.http.post<any>(this.serviceUrl + '/addOpportuniteToFavorisUtilisateur/' + idUtilisateur +
    '/' + idOpportunite, this.httpOptions);
  }

  // Supprimer le lien entre une opportunité et un utilisateur
  deleteOpportuniteFromFavorisUtilisateurService(idUtilisateur, idOpportunite) {
      return this.http.delete<any>(this.serviceUrl + '/deleteOpportuniteFromFavorisUtilisateur/' + idUtilisateur +
      '/' + idOpportunite, this.httpOptions);
  }
}
