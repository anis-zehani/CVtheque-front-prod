import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { UtilService } from '../@Util/util.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Technologie } from '../@Models/technologie';
import { environment } from '../../environments/environment';
import { Utilisateur } from '../@Models/utilisateur';

@Injectable({
  providedIn: 'root'
})

export class TechnologiesService {

  private serviceUrl = environment.baseUrl + '/technologie';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
    };

  constructor(private http: HttpClient, private utilService: UtilService) { }

  // Retourne un tableau de toutes les technologies : Technologie[]
  getAllTechnologiesService(): Observable<Technologie[]> {
    return this.http.get<Technologie[]>(this.serviceUrl);
  }

  // Retourne la liste des 5 premières technologies ORDER BY le nombre des candidats qu'il y a pour elle
  getCandidatsByTechnologiesService(): Observable<Technologie[]> {
    return this.http.get<Technologie[]>(this.serviceUrl + '/candidatsByTechnologie');
  }

  // Retourne la liste des 5 premières technologies ORDER BY le nombre des opportunités qu'il y a pour elle
  getOpportunitesByTechnologiesService(): Observable<Technologie[]> {
    return this.http.get<Technologie[]>(this.serviceUrl + '/opportunitesByTechnologie');
  }

  // Retourne la technologie créée : Technologie
  addTechnologieService(technologie): Observable<Technologie> {
    const TechnologieToStringify = this.addUtilisateurToTechnologie(technologie);
    return this.http.post<any>(this.serviceUrl, JSON.stringify(TechnologieToStringify), this.httpOptions);
  }

  // Retourne la technologie modifiée : Technologie
  editTechnologieService(technologie): any {
    const TechnologieToStringify = this.addUtilisateurToTechnologie(technologie);
    return this.http.put<any>(this.serviceUrl, JSON.stringify(TechnologieToStringify), this.httpOptions);
  }

  // Retourne true si la suppression est faite, false si y a erreur
  deleteTechnologieService(id): any {
    return this.http.delete<any>(this.serviceUrl + '/' + id, this.httpOptions);
  }

  // Affecte un utilisateur à une technologie et retourne la nouvelle technologie enrichie
  addUtilisateurToTechnologie(technologie) {
    const utilisateur = new Utilisateur();
    utilisateur.id = this.utilService.getIdUtilisateurFromToken();
    const TechnologieToStringify = technologie;
    // J'affecte l'Utilisateur à la technologie  avant de l'envoyer pour L'ajout de la technologie par idUtilisateur
    TechnologieToStringify.utilisateur = utilisateur;

    return TechnologieToStringify;
  }
}
