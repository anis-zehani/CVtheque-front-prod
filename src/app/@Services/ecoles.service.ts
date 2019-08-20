import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Ecole } from '../@Models/ecole';

@Injectable({
  providedIn: 'root'
})

export class EcolesService {

  private serviceUrl = environment.baseUrl+'/ecole';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
    };

  constructor(private http: HttpClient) { } 

  //Retourne un tableau de toutes les Ecoles : Ecole[]
  getAllEcolesService() : Observable<Ecole[]> {
    return this.http.get<Ecole[]>(this.serviceUrl);
  }

  //Retourn l'Ecole créée : Ecole
  addEcoleService(Ecole) : Observable<Ecole> {
    return this.http.post<any>(this.serviceUrl, JSON.stringify(Ecole), this.httpOptions);
  }

  //Retourne l'Ecole modifiée : Ecole
  editEcoleService(Ecole) : any {
    return this.http.put<any>(this.serviceUrl, JSON.stringify(Ecole), this.httpOptions);
  }

  //Ne retourne rien
  deleteEcoleService(id) {
    return this.http.delete<any>(this.serviceUrl + '/'+id, this.httpOptions);
  }
}
