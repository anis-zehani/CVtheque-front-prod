import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Entreprise } from '../@Models/entreprise';

@Injectable({
  providedIn: 'root'
})

export class EntreprisesService {

  private serviceUrl = environment.baseUrl+'/entreprise';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
    };

  constructor(private http: HttpClient) { } 

  //Retourne un tableau de toutes les Entreprises : Entreprise[]
  getAllEntreprisesService() : Observable<Entreprise[]> {
    return this.http.get<Entreprise[]>(this.serviceUrl);
  }

  //Retourne l'Entreprise créée : Entreprise
  addEntrepriseService(Entreprise) : Observable<Entreprise> {
    return this.http.post<any>(this.serviceUrl, JSON.stringify(Entreprise), this.httpOptions);
  }

  //Retourne l'Entreprise modifiée : Entreprise
  editEntrepriseService(Entreprise) : any {
    return this.http.put<any>(this.serviceUrl, JSON.stringify(Entreprise), this.httpOptions);
  }

  //Retourne true si la suppression est faite, false si y a erreur
  deleteEntrepriseService(id) : any {
    return this.http.delete<any>(this.serviceUrl + '/'+id, this.httpOptions);
  }
}
