import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

import { UtilService } from '../@Util/util.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Opportunite } from '../@Models/opportunite';
import { Utilisateur } from '../@Models/utilisateur';

@Injectable({
  providedIn: 'root'
})

export class OpportunitesService {

  private serviceUrl = environment.baseUrl + '/opportunite';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
    };

  constructor(private http: HttpClient, private utilService: UtilService) { }

  // Retourne un tableau de touts les opportunites : Opportunite[]
  getAllOpportunitesService(etatOpportunite): Observable<Opportunite[]> {
    return this.http.get<Opportunite[]>(this.serviceUrl + '/all/' + etatOpportunite, this.httpOptions);
  }

  // Retourne un tableau de toutes les opportunites pour un Partenaire: Opportunite[]
  getAllOpportunitesByPartenaireService(idPartenaire): Observable<Opportunite[]> {
    return this.http.get<Opportunite[]>(this.serviceUrl + '/allOpportunitesByPartenaire/' + idPartenaire, this.httpOptions);
  }

  // Retourne un tableau de toutes les opportunites pour une Technologie: Opportunite[]
  getAllOpportunitesByTechnologieService(idTechnologie): Observable<Opportunite[]> {
    return this.http.get<Opportunite[]>(this.serviceUrl + '/allOpportunitesByTechnologie/' + idTechnologie, this.httpOptions);
  }

  // Retourne un tableau de toutes les opportunites qui ont une Technologie au moins dans la liste fournie : Opportunite[]
  getAllOpportunitesByListTechnologiesService(listeTechnologies): Observable<Opportunite[]> {
    return this.http.get<Opportunite[]>(this.serviceUrl + '/allOpportunitesByListTechnologies/' + listeTechnologies, this.httpOptions);
  }

  // Retourne un tableau de toutes les opportunites pour une Certification: Opportunite[]
  getAllOpportunitesByCertificationService(idCertification): Observable<Opportunite[]> {
    return this.http.get<Opportunite[]>(this.serviceUrl + '/allOpportunitesByCertification/' + idCertification, this.httpOptions);
  }

  // Retourne un seul opportunite par son ID : Opportunite
  getOneOpportuniteService(id): Observable<Opportunite> {
    return this.http.get<Opportunite>(this.serviceUrl + '/' + id, this.httpOptions);
  }

  // Retourne le opportunite créée : Opportunite
  addOpportuniteService(opportunite): Observable<Opportunite> {
    const OpportuniteToStringify = this.addUtilisateurToOpportunite(opportunite);
    return this.http.post<any>(this.serviceUrl, JSON.stringify(OpportuniteToStringify), this.httpOptions);
  }

  // Retourne le opportunite modifié : Opportunite
  editOpportuniteService(opportunite): any {
    const OpportuniteToStringify = this.addUtilisateurToOpportunite(opportunite);
    return this.http.put<any>(this.serviceUrl, JSON.stringify(OpportuniteToStringify), this.httpOptions);
  }

  // Retourne le opportunite modifié : Opportunite
  editEtatOpportuniteService(opportunite): any {
    const OpportuniteToStringify = this.addUtilisateurToOpportunite(opportunite);
    return this.http.put<any>(this.serviceUrl + '/editEtat', JSON.stringify(OpportuniteToStringify), this.httpOptions);
  }

  // Ne retourne rien
  deleteOpportuniteService(id) {
    return this.http.delete<any>(this.serviceUrl + '/' + id, this.httpOptions);
  }

  // Supprimer le lien entre une opportunité et une technologie
  deleteLinkOpportuniteTechnologieService(idOpportunite, idTechnologie) {
    return this.http.delete<any>(this.serviceUrl + '/deleteLinkOpportuniteTechnologie/' +
    idOpportunite + '/' + idTechnologie, this.httpOptions);
  }

  // Supprimer le lien entre une opportunité et une certification
  deleteLinkOpportuniteCertificationService(idOpportunite, idCertification) {
    return this.http.delete<any>(this.serviceUrl + '/deleteLinkOpportuniteCertification/' +
    idOpportunite + '/' + idCertification, this.httpOptions);
  }

  // Update le lien entre une opportunité et un partenaire : met responsableOpportunite à NULL
  updateLinkOpportunitePartenaireService(idOpportunite) {
    return this.http.put<any>(this.serviceUrl + '/updateLinkOpportunitePartenaire/' + idOpportunite, this.httpOptions);
  }

  // Affecte un utilisateur à une opportunité et retourne la nouvelle opportunité enrichie
  addUtilisateurToOpportunite(opportunite) {
    const utilisateur = new Utilisateur();
    utilisateur.id = this.utilService.getIdUtilisateurFromToken();
    const OpportuniteToStringify = opportunite;
    // J'affecte l'Utilisateur à l'opportunité avant de l'envoyer pour L'ajout de l'opportunité par idUtilisateur
    OpportuniteToStringify.utilisateur = utilisateur;

    return OpportuniteToStringify;
  }
}
