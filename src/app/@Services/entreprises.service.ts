import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

import { UtilService } from '../@Util/util.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Entreprise } from '../@Models/entreprise';
import { Utilisateur } from '../@Models/utilisateur';

@Injectable({
  providedIn: 'root'
})

export class EntreprisesService {

  private serviceUrl = environment.baseUrl + '/entreprise';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
    };

  constructor(private http: HttpClient, private utilService: UtilService) { }

  // Retourne un tableau de toutes les Entreprises : Entreprise[]
  getAllEntreprisesService(): Observable<Entreprise[]> {
    return this.http.get<Entreprise[]>(this.serviceUrl);
  }

  // Retourne l'Entreprise créée : Entreprise
  addEntrepriseService(entreprise): Observable<Entreprise> {
    const EntrepriseToStringify = this.addUtilisateurToEntreprise(entreprise);
    return this.http.post<any>(this.serviceUrl, JSON.stringify(EntrepriseToStringify), this.httpOptions);
  }

  // Retourne l'Entreprise modifiée : Entreprise
  editEntrepriseService(entreprise): any {
    const EntrepriseToStringify = this.addUtilisateurToEntreprise(entreprise);
    return this.http.put<any>(this.serviceUrl, JSON.stringify(EntrepriseToStringify), this.httpOptions);
  }

  // Retourne true si la suppression est faite, false si y a erreur
  deleteEntrepriseService(id): any {
    return this.http.delete<any>(this.serviceUrl + '/' + id, this.httpOptions);
  }

  // Affecte un utilisateur à une entreprise et retourne la nouvelle entreprise enrichie
  addUtilisateurToEntreprise(entreprise) {
    const utilisateur = new Utilisateur();
    utilisateur.id = this.utilService.getIdUtilisateurFromToken();
    const EntrepriseToStringify = entreprise;
    // J'affecte l'Utilisateur à l'entreprise avant de l'envoyer pour L'ajout de l'entreprise par idUtilisateur
    EntrepriseToStringify.utilisateur = utilisateur;

    return EntrepriseToStringify;
  }
}
