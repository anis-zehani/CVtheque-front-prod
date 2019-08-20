import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Candidat } from '../@Models/candidat';

@Injectable({
  providedIn: 'root'
})

export class CandidatsService {

  private serviceUrl = environment.baseUrl+'/candidat';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
    };

  constructor(private http: HttpClient) { } 

  //Retourne un tableau de tous les candidats : Candidat[]
  getAllCandidatsService(etatCandidat) : Observable<Candidat[]> {
    return this.http.get<Candidat[]>(this.serviceUrl + '/all/'+ etatCandidat, this.httpOptions);
  }

  //Retourne un tableau de tous les candidats par opportunité : Candidat[]
  getAllCandidatsByOpportuniteService(idOpportunite) : Observable<Candidat[]> {
    return this.http.get<Candidat[]>(this.serviceUrl + '/allCandidatsByOpportunite/'+ idOpportunite, this.httpOptions);
  }

  //Retourne un tableau de tous les candidats par technologie : Candidat[]
  getAllCandidatsByTechnologieService(idTechnologie) : Observable<Candidat[]> {
    return this.http.get<Candidat[]>(this.serviceUrl + '/allCandidatsByTechnologie/'+ idTechnologie, this.httpOptions);
  }

  //Retourne un tableau de tous les candidats qui ont une Technologie au moins dans la liste fournie : Candidat[]
  getAllCandidatsByListTechnologiesService(listeTechnologies) : Observable<Candidat[]> {
    return this.http.get<Candidat[]>(this.serviceUrl + '/allCandidatsByListTechnologies/'+ listeTechnologies, this.httpOptions);
  }

  //Retourne un tableau de tous les candidats par certification : Candidat[]
  getAllCandidatsByCertificationService(idCertification) : Observable<Candidat[]> {
    return this.http.get<Candidat[]>(this.serviceUrl + '/allCandidatsByCertification/'+ idCertification, this.httpOptions);
  }

  //Retourne un tableau de tous les candidats par entreprise : Candidat[]
  getAllCandidatsByEntrepriseService(idEntreprise) : Observable<Candidat[]> {
    return this.http.get<Candidat[]>(this.serviceUrl + '/allCandidatsByEntreprise/'+ idEntreprise, this.httpOptions);
  }

  //Retourne un seul candidat par son ID : Candidat
  getOneCandidatService(id) : Observable<Candidat> {
    return this.http.get<Candidat>(this.serviceUrl + '/'+id, this.httpOptions);
  }

  //Retourne le candidat créée : Candidat
  addCandidatService(candidat) : Observable<Candidat> {
    return this.http.post<any>(this.serviceUrl, JSON.stringify(candidat), this.httpOptions);
  }

  //Ajouter des candidats liés à l'opportunité
  addCandidatsToOpportuniteService(idOpportunite, listeCandidats, withDeletion) : Observable<any> {
    return this.http.post<any>(this.serviceUrl+ '/addCandidatsToOpportunite/'+idOpportunite+'/'+withDeletion, JSON.stringify(listeCandidats), this.httpOptions);
  }

  //Retourne le candidat modifié : Candidat
  editCandidatService(candidat) : any {
    return this.http.put<any>(this.serviceUrl, JSON.stringify(candidat), this.httpOptions);
  }

  //Retourne le candidat modifié : Candidat
  editEtatCandidatService(candidat) : any {
    return this.http.put<any>(this.serviceUrl+ '/editEtat', JSON.stringify(candidat), this.httpOptions);
  }

  //Update le lien entre un candidat et une entreprise : met entreprise à NULL
  updateLinkCandidatEntrepriseService(idCandidat) : any {
    return this.http.put<any>(this.serviceUrl+'/updateLinkCandidatEntreprise', JSON.stringify(idCandidat), this.httpOptions);
  }

  //Ne retourne rien
  deleteCandidatService(id) {
    return this.http.delete<any>(this.serviceUrl + '/'+id, this.httpOptions);
  }

  //Supprimer le lien entre un candidat et une opportunité
  deleteLinkCandidatOpportuniteService(idCandidat, idOpportunite) {
      return this.http.delete<any>(this.serviceUrl + '/deleteLinkCandidatOpportunite/'+idCandidat+'/'+idOpportunite, this.httpOptions);
  }

  //Supprimer le lien entre un candidat et une technologie
  deleteLinkCandidatTechnologieService(idCandidat, idTechnologie) {
      return this.http.delete<any>(this.serviceUrl + '/deleteLinkCandidatTechnologie/'+idCandidat+'/'+idTechnologie, this.httpOptions);
  }

  //Supprimer le lien entre un candidat et une certification
  deleteLinkCandidatCertificationService(idCandidat, idCertification) {
    return this.http.delete<any>(this.serviceUrl + '/deleteLinkCandidatCertification/'+idCandidat+'/'+idCertification, this.httpOptions);
  }

}
