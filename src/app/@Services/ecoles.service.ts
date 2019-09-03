import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

import { UtilService } from '../@Util/util.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Ecole } from '../@Models/ecole';
import { Utilisateur } from '../@Models/utilisateur';

@Injectable({
  providedIn: 'root'
})

export class EcolesService {

  private serviceUrl = environment.baseUrl + '/ecole';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
    };

  constructor(private http: HttpClient, private utilService: UtilService) { }

  // Retourne un tableau de toutes les Ecoles : Ecole[]
  getAllEcolesService(): Observable<Ecole[]> {
    return this.http.get<Ecole[]>(this.serviceUrl);
  }

  // Retourn l'Ecole créée : Ecole
  addEcoleService(ecole): Observable<Ecole> {
    const EcoleToStringify = this.addUtilisateurToEcole(ecole);
    return this.http.post<any>(this.serviceUrl, JSON.stringify(EcoleToStringify), this.httpOptions);
  }

  // Retourne l'Ecole modifiée : Ecole
  editEcoleService(ecole): any {
    const EcoleToStringify = this.addUtilisateurToEcole(ecole);
    return this.http.put<any>(this.serviceUrl, JSON.stringify(EcoleToStringify), this.httpOptions);
  }

  // Ne retourne rien
  deleteEcoleService(id) {
    return this.http.delete<any>(this.serviceUrl + '/' + id, this.httpOptions);
  }

  // Affecte un utilisateur à une école et retourne la nouvelle école enrichie
  addUtilisateurToEcole(ecole) {
    const utilisateur = new Utilisateur();
    utilisateur.id = this.utilService.getIdUtilisateurFromToken();
    const EcoleToStringify = ecole;
    // J'affecte l'Utilisateur à l'école avant de l'envoyer pour L'ajout de l'école par idUtilisateur
    EcoleToStringify.utilisateur = utilisateur;

    return EcoleToStringify;
  }
}
