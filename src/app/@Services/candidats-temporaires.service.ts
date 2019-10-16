import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CandidatTemporaire } from '../@Models/candidat-temporaire';

@Injectable({
  providedIn: 'root'
})
export class CandidatsTemporairesService {

  private serviceUrl = environment.baseUrl + '/candidat-temporaire-controller';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
    };

  constructor(private http: HttpClient) { }

  // Retourne le candidat Temporaire créée : Candidat (cas ou le candidat créé son propre compte via HomePage)
  addCandidatTemporaireService(candidatTemporaire): Observable<CandidatTemporaire> {
    return this.http.post<any>(this.serviceUrl, JSON.stringify(candidatTemporaire), this.httpOptions);
  }
}
