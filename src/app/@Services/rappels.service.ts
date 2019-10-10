import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { UtilService } from '../@Util/util.service';
import { Rappel } from '../@Models/rappel';
import { Utilisateur } from '../@Models/utilisateur';

@Injectable({
  providedIn: 'root'
})

export class RappelsService {

  private serviceUrl = environment.baseUrl + '/rappel';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
    };

  constructor(private http: HttpClient, private utilService: UtilService) { }

  // Retourne un tableau de tous les Rappels : Rappel[] + Inbox
  async getAllRappelsService() {
    const idUtilisateur = this.utilService.getIdUtilisateurFromToken();
    return this.http.get<Rappel[]>(this.serviceUrl + '/allRappelsByIdUtilisateur/' + idUtilisateur).toPromise();
  }

  // Retourne un tableau de tous les Rappels de Today
  getAllRappelsByTodayService(): Observable<Rappel[]> {
    const idUtilisateur = this.utilService.getIdUtilisateurFromToken();
    return this.http.get<Rappel[]>(this.serviceUrl + '/allRappelsByToday/' + idUtilisateur);
  }

  // Retourne un tableau de tous les Rappels des Next 7 Days
  getAllRappelsByNext7DaysService(): Observable<Rappel[]> {
    const idUtilisateur = this.utilService.getIdUtilisateurFromToken();
    return this.http.get<Rappel[]>(this.serviceUrl + '/allRappelsByNext7Days/' + idUtilisateur);
  }

  // Retourne un tableau de tous les Rappels : Rappel[]
  getAllRappelsByProjetService(idProjet): Observable<Rappel[]> {
    const idUtilisateur = this.utilService.getIdUtilisateurFromToken();
    return this.http.get<Rappel[]>(this.serviceUrl + '/allRappelsByProjet/' + idProjet + '/' + idUtilisateur, this.httpOptions);
  }

  // Retourne un tableau de tous les Rappels selon la priorité
  getAllRappelsByPrioriteService(valeurPriorite): Observable<Rappel[]> {
    const idUtilisateur = this.utilService.getIdUtilisateurFromToken();
    return this.http.get<Rappel[]>(this.serviceUrl + '/allRappelsByPriorite/' + valeurPriorite + '/' + idUtilisateur, this.httpOptions);
  }

  // Retourne le Rappel créé : Rappel
  addRappelService(rappel): Observable<Rappel> {
    const RappelToStringify = this.addUtilisateurToRappel(rappel);
    return this.http.post<any>(this.serviceUrl, JSON.stringify(RappelToStringify), this.httpOptions);
  }

  // Retourne le Rappel modifié : Rappel
  editRappelService(rappel): any {
    const RappelToStringify = this.addUtilisateurToRappel(rappel);
    return this.http.put<any>(this.serviceUrl, JSON.stringify(RappelToStringify), this.httpOptions);
  }

  // Ne retourne rien
  deleteRappelService(id) {
    return this.http.delete<any>(this.serviceUrl + '/' + id, this.httpOptions);
  }

  // Affecte un utilisateur à un rappel et retourne le nouveau rappel enrichi
  addUtilisateurToRappel(rappel) {
    const utilisateur = new Utilisateur();
    utilisateur.id = this.utilService.getIdUtilisateurFromToken();
    const RappelToStringify = rappel;
    // J'affecte l'Utilisateur au Rappel avant de l'envoyer pour L'ajout du rappel par idUtilisateur
    RappelToStringify.utilisateur = utilisateur;

    return RappelToStringify;
  }
}
