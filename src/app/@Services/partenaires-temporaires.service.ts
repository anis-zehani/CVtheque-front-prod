import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PartenaireTemporaire } from '../@Models/partenaire-temporaire';

@Injectable({
  providedIn: 'root'
})
export class PartenairesTemporairesService {

  private serviceUrl = environment.baseUrl + '/gateway/partenaire-temporaire-controller';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
    };

  constructor(private http: HttpClient) { }

  // Retourne un tableau de tous les Partenaires Temporaires pas encore activés : PartenaireTemporaire[]
  getAllPartenairesTemporairesService(): Observable<PartenaireTemporaire[]> {
    return this.http.get<PartenaireTemporaire[]>(this.serviceUrl);
  }

  // Retourne le partenaire Temporaire créée : Partenaire (cas ou le partenaire créé soa propre demande de création de compte via HomePage)
  addPartenaireTemporaireService(partenaireTemporaire): Observable<PartenaireTemporaire> {
    return this.http.post<any>(this.serviceUrl, JSON.stringify(partenaireTemporaire), this.httpOptions);
  }

  // Activation du Partenaire via son email
  activatePartenaireService(email, idEntreprise): Observable<boolean> {
    return this.http.put<boolean>(this.serviceUrl + '/' + email + '/' + idEntreprise, this.httpOptions);
  }
}
