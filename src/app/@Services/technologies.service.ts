import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Technologie } from '../@Models/technologie';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class TechnologiesService {

  private serviceUrl = environment.baseUrl+'/technologie';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
    };

  constructor(private http: HttpClient) { } 

  //Retourne un tableau de toutes les technologies : Technologie[]
  getAllTechnologiesService() : Observable<Technologie[]> {
    return this.http.get<Technologie[]>(this.serviceUrl);
  }

  //Retourne la technologie créée : Technologie
  addTechnologieService(technologie) : Observable<Technologie> {
    return this.http.post<any>(this.serviceUrl, JSON.stringify(technologie), this.httpOptions);
  }

  //Retourne la technologie modifiée : Technologie
  editTechnologieService(technologie) : any {
    return this.http.put<any>(this.serviceUrl, JSON.stringify(technologie), this.httpOptions);
  }

  //Retourne true si la suppression est faite, false si y a erreur
  deleteTechnologieService(id) : any {
    return this.http.delete<any>(this.serviceUrl + '/'+id, this.httpOptions);
  }
}
