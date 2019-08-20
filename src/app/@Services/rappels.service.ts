import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Rappel } from '../@Models/rappel';

@Injectable({
  providedIn: 'root'
})

export class RappelsService {

  private serviceUrl = environment.baseUrl+'/rappel';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
    };

  constructor(private http: HttpClient) { } 

  //Retourne un tableau de tous les Rappels : Rappel[] + Inbox
  getAllRappelsService() : Observable<Rappel[]> {
    return this.http.get<Rappel[]>(this.serviceUrl);
  }

  //Retourne un tableau de tous les Rappels de Today
  getAllRappelsByTodayService() : Observable<Rappel[]> {
    return this.http.get<Rappel[]>(this.serviceUrl+'/allRappelsByToday');
  }

  //Retourne un tableau de tous les Rappels des Next 7 Days
  getAllRappelsByNext7DaysService() : Observable<Rappel[]> {
    return this.http.get<Rappel[]>(this.serviceUrl+'/allRappelsByNext7Days');
  }

  //Retourne un tableau de tous les Rappels : Rappel[]
  getAllRappelsByProjetService(idProjet) : Observable<Rappel[]> {
    return this.http.get<Rappel[]>(this.serviceUrl + '/allRappelsByProjet/'+idProjet, this.httpOptions);
  }

  //Retourne un tableau de tous les Rappels selon la priorité
  getAllRappelsByPrioriteService(valeurPriorite) : Observable<Rappel[]> {
    return this.http.get<Rappel[]>(this.serviceUrl + '/allRappelsByPriorite/'+valeurPriorite, this.httpOptions);
  }

  //Retourne le Rappel créé : Rappel
  addRappelService(Rappel) : Observable<Rappel> {
    return this.http.post<any>(this.serviceUrl, JSON.stringify(Rappel), this.httpOptions);
  }

  //Retourne le Rappel modifié : Rappel
  editRappelService(Rappel) : any {
    return this.http.put<any>(this.serviceUrl, JSON.stringify(Rappel), this.httpOptions);
  }

  //Ne retourne rien
  deleteRappelService(id) {
    return this.http.delete<any>(this.serviceUrl + '/'+id, this.httpOptions);
  }
}
