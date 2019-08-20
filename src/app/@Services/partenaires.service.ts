import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Partenaire } from '../@Models/partenaire';

@Injectable({
  providedIn: 'root'
})

export class PartenairesService {

  private serviceUrl = environment.baseUrl+'/partenaire';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
    };

  constructor(private http: HttpClient) { } 


  //Retourne un tableau de touts les partenaires : Partenaire[]
  getAllPartenairesService(etatPartenaire) : Observable<Partenaire[]> {
    return this.http.get<Partenaire[]>(this.serviceUrl + '/all/'+ etatPartenaire, this.httpOptions);
  }

  //Retourne un seul partenaire par son ID : Partenaire
  getOnePartenaireService(id) : Observable<Partenaire> {
    return this.http.get<Partenaire>(this.serviceUrl + '/'+id, this.httpOptions);
  }

  getAllPartenairesByEntrepriseService(idEntreprise) : Observable<Partenaire[]> {
    return this.http.get<Partenaire[]>(this.serviceUrl + '/allPartenairesByEntreprise/'+ idEntreprise, this.httpOptions);
  }

  //Retourne le partenaire créée : Partenaire
  addPartenaireService(partenaire) : Observable<Partenaire> {
    return this.http.post<any>(this.serviceUrl, JSON.stringify(partenaire), this.httpOptions);
  }

  //Retourne le partenaire modifié : Partenaire
  editPartenaireService(partenaire) : any {
    return this.http.put<any>(this.serviceUrl, JSON.stringify(partenaire), this.httpOptions);
  }

  //Retourne le partenaire modifié : Partenaire
  editEtatPartenaireService(partenaire) : any {
    return this.http.put<any>(this.serviceUrl+ '/editEtat', JSON.stringify(partenaire), this.httpOptions);
  }

  //UPDATE le lien entre un partenaire et une entreprise : met entreprise à NULL
  updateLinkPartenaireEntrepriseService(idPartenaire): any {
    return this.http.put<any>(this.serviceUrl+ '/updateLinkPartenaireEntreprise/'+idPartenaire,  this.httpOptions);
  }

  //Ne retourne rien
  deletePartenaireService(id) {
    return this.http.delete<any>(this.serviceUrl + '/'+id, this.httpOptions);
  }

}
