import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Contact } from '../@Models/contact';

@Injectable({
  providedIn: 'root'
})

export class ContactsService {

  private serviceUrl = environment.baseUrl + '/contact';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
    };

  constructor(private http: HttpClient) { }

  // Retourne un tableau de touts les contacts : Contact[]
  getAllContactsService(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.serviceUrl);
  }

  // Retourne un seul contact par son ID : Contact
  getOneContactService(id): Observable<Contact> {
    return this.http.get<Contact>(this.serviceUrl + '/' + id, this.httpOptions);
  }

  // Retourne le contact créée : Contact
  addContactService(contact): Observable<Contact> {
    return this.http.post<any>(this.serviceUrl, JSON.stringify(contact), this.httpOptions);
  }

  // Retourne le contact modifié : Contact
  editContactService(contact): any {
    return this.http.put<any>(this.serviceUrl, JSON.stringify(contact), this.httpOptions);
  }

  // Ne retourne rien
  deleteContactService(id) {
    return this.http.delete<any>(this.serviceUrl + '/' + id, this.httpOptions);
  }

}
