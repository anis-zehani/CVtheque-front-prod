import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as jwt_decode from 'jwt-decode';
import { UtilService } from '../@Util/util.service';
import { Projet } from '../@Models/projet';
import { Utilisateur } from '../@Models/utilisateur';

@Injectable({
  providedIn: 'root'
})

export class ProjetsService {

  private serviceUrl = environment.baseUrl + '/projet';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
    };

  constructor(private http: HttpClient, private utilService: UtilService) { }

  // Retourne un tableau de tous les Projets : Projet[]
  getAllProjetsService(): Observable<Projet[]> {
    return this.http.get<Projet[]>(this.serviceUrl + '/allProjetsByIdUtilisateur/' + this.utilService.getIdUtilisateurFromToken());
  }

  // Retourne le Projet créé : Projet
  addProjetService(projet): Observable<Projet> {
    // Je récupère l'idUtilisateur du Token pour l'envoyer dans les requêtes REST
    const utilisateur = new Utilisateur();
    utilisateur.id = jwt_decode(sessionStorage.getItem('token')).id;
    const ProjetToStringify = projet;
    // J'affecte l'Utilisateur au Projet avant de l'envoyer pour L'ajout du projet par idUtilisateur
    ProjetToStringify.utilisateur = utilisateur;

    return this.http.post<any>(this.serviceUrl, JSON.stringify(ProjetToStringify), this.httpOptions);
  }

  // Retourne le Projet modifié : Projet
  editProjetService(projet): any {
    // Je récupère l'idUtilisateur du Token pour l'envoyer dans les requêtes REST
    const utilisateur = new Utilisateur();
    utilisateur.id = jwt_decode(sessionStorage.getItem('token')).id;
    const ProjetToStringify = projet;
    // J'affecte l'Utilisateur au Projet avant de l'envoyer pour La modification du projet par idUtilisateur
    ProjetToStringify.utilisateur = utilisateur;

    return this.http.put<any>(this.serviceUrl, JSON.stringify(ProjetToStringify), this.httpOptions);
  }

  // Ne retourne rien
  deleteProjetService(id) {
    return this.http.delete<any>(this.serviceUrl + '/' + id, this.httpOptions);
  }
}
