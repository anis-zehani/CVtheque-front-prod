import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  // Retourne un tableau de tous les Projets par idUtilisateur : Projet[]
  async getAllProjetsService() {
    const idUtilisateur = this.utilService.getIdUtilisateurFromToken();
    return this.http.get<Projet[]>(this.serviceUrl + '/allProjetsByIdUtilisateur/' + idUtilisateur).toPromise();
  }

  // Retourne le Projet créé pour un utilisateur : Projet
  addProjetService(projet): Observable<Projet> {
    const ProjetToStringify = this.addUtilisateurToProjet(projet);
    return this.http.post<any>(this.serviceUrl, JSON.stringify(ProjetToStringify), this.httpOptions);
  }

  // Retourne le Projet modifié pour un utilisateur : Projet
  editProjetService(projet): any {
    const ProjetToStringify = this.addUtilisateurToProjet(projet);
    return this.http.put<any>(this.serviceUrl, JSON.stringify(ProjetToStringify), this.httpOptions);
  }

  // Ne retourne rien
  deleteProjetService(id) {
    return this.http.delete<any>(this.serviceUrl + '/' + id, this.httpOptions);
  }

  // Affecte un utilisateur à un projet et retourne le nouveau projet enrichi
  addUtilisateurToProjet(projet) {
    const utilisateur = new Utilisateur();
    utilisateur.id = this.utilService.getIdUtilisateurFromToken();
    const ProjetToStringify = projet;
    // J'affecte l'Utilisateur au Projet avant de l'envoyer pour L'ajout du projet par idUtilisateur
    ProjetToStringify.utilisateur = utilisateur;

    return ProjetToStringify;
  }
}
