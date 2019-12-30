import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StatistiquesService {

private serviceUrl = environment.baseUrl + '/statistiques';

private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
    };

constructor(private http: HttpClient) { }

// //Retourne les 6 chiffres clés de base
getAllStatistiquesService(): Observable<Map<string, number>> {
  return this.http.get<Map<string, number>>(this.serviceUrl + '/all', this.httpOptions);
}
}
