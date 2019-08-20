import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Projet } from '../@Models/projet';

@Injectable({
  providedIn: 'root'
})

export class ProjetsService {

  private serviceUrl = environment.baseUrl+'/projet';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
    };

  constructor(private http: HttpClient) { } 

  //Retourne un tableau de tous les Projets : Projet[]
  getAllProjetsService() : Observable<Projet[]> {
    return this.http.get<Projet[]>(this.serviceUrl);
  }

  //Retourne le Projet créé : Projet
  addProjetService(Projet) : Observable<Projet> {
    return this.http.post<any>(this.serviceUrl, JSON.stringify(Projet), this.httpOptions);
  }

  //Retourne le Projet modifié : Projet
  editProjetService(Projet) : any {
    return this.http.put<any>(this.serviceUrl, JSON.stringify(Projet), this.httpOptions);
  }

  //Ne retourne rien
  deleteProjetService(id) {
    return this.http.delete<any>(this.serviceUrl + '/'+id, this.httpOptions);
  }
}
