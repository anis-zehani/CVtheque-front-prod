import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

import { UtilService } from '../@Util/util.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Contact } from '../@Models/contact';
import { Utilisateur } from '../@Models/utilisateur';

@Injectable({
  providedIn: 'root'
})

export class ContactsService {

  private serviceUrl = environment.baseUrl + '/gateway/contact';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
    };

  constructor(private http: HttpClient, private utilService: UtilService) { }

  // Retourne un tableau de touts les contacts : Contact[]
  getAllContactsService(): Observable<Contact[]> {
    const idUtilisateur = this.utilService.getIdUtilisateurFromToken();
    return this.http.get<Contact[]>(this.serviceUrl + '/allContactsByIdUtilisateur/' + idUtilisateur);
  }

  // Retourne un seul contact par son ID : Contact
  getOneContactService(id): Observable<Contact> {
    return this.http.get<Contact>(this.serviceUrl + '/' + id, this.httpOptions);
  }

  // Retourne le contact créée : Contact
  addContactService(contact): Observable<Contact> {
    const ContactToStringify = this.addUtilisateurToContact(contact);
    return this.http.post<any>(this.serviceUrl, JSON.stringify(ContactToStringify), this.httpOptions);
  }

  // Retourne le contact modifié : Contact
  editContactService(contact): any {
    const ContactToStringify = this.addUtilisateurToContact(contact);
    return this.http.put<any>(this.serviceUrl, JSON.stringify(ContactToStringify), this.httpOptions);
  }

  // Ne retourne rien
  deleteContactService(id) {
    return this.http.delete<any>(this.serviceUrl + '/' + id, this.httpOptions);
  }

  // Affecte un utilisateur à un contact et retourne le nouveau contact enrichi
  addUtilisateurToContact(contact) {
    const utilisateur = new Utilisateur();
    utilisateur.id = this.utilService.getIdUtilisateurFromToken();
    const ContactToStringify = contact;
    // J'affecte l'Utilisateur au Contact avant de l'envoyer pour L'ajout du contact par idUtilisateur
    ContactToStringify.utilisateur = utilisateur;

    return ContactToStringify;
  }

}
