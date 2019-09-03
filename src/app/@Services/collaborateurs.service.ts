import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { UtilService } from '../@Util/util.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Collaborateur } from '../@Models/collaborateur';
import { environment } from '../../environments/environment';
import { Utilisateur } from '../@Models/utilisateur';

@Injectable({
  providedIn: 'root'
})

export class CollaborateursService {

  private serviceUrl = environment.baseUrl + '/collaborateur';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
    };

  constructor(private http: HttpClient, private utilService: UtilService) { }

  // Retourne un tableau de touts les collaborateurs : Collaborateur[]
  getAllCollaborateursService(): Observable<Collaborateur[]> {
    return this.http.get<Collaborateur[]>(this.serviceUrl);
  }

  // Retourne un seul collaborateur par son ID : Collaborateur
  getOneCollaborateurService(id): Observable<Collaborateur> {
    return this.http.get<Collaborateur>(this.serviceUrl + '/' + id, this.httpOptions);
  }

  // Retourne le collaborateur créée : Collaborateur
  addCollaborateurService(collaborateur): Observable<Collaborateur> {
    const CollaborateurToStringify = this.addUtilisateurToCollaborateur(collaborateur);
    return this.http.post<any>(this.serviceUrl, JSON.stringify(CollaborateurToStringify), this.httpOptions);
  }

  // Retourne le collaborateur modifié : Collaborateur
  editCollaborateurService(collaborateur): any {
    const CollaborateurToStringify = this.addUtilisateurToCollaborateur(collaborateur);
    return this.http.put<any>(this.serviceUrl, JSON.stringify(CollaborateurToStringify), this.httpOptions);
  }

  // Ne retourne rien
  deleteCollaborateurService(id) {
    return this.http.delete<any>(this.serviceUrl + '/' + id, this.httpOptions);
  }

  // Affecte un utilisateur à un collaborateur et retourne le nouveau collaborateur enrichi
  addUtilisateurToCollaborateur(collaborateur) {
    const utilisateur = new Utilisateur();
    utilisateur.id = this.utilService.getIdUtilisateurFromToken();
    const CollaborateurToStringify = collaborateur;
    // J'affecte l'Utilisateur au collaborateur avant de l'envoyer pour L'ajout du collaborateur par idUtilisateur
    CollaborateurToStringify.utilisateur = utilisateur;

    return CollaborateurToStringify;
  }
}
