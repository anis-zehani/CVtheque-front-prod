import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

import { UtilService } from '../@Util/util.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Certification } from '../@Models/certification';
import { Utilisateur } from '../@Models/utilisateur';

@Injectable({
  providedIn: 'root'
})

export class CertificationsService {

  private serviceUrl = environment.baseUrl + '/certification';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
    };

  constructor(private http: HttpClient, private utilService: UtilService) { }

  // Retourne un tableau de toutes les Certifications : Certification[]
  getAllCertificationsService(): Observable<Certification[]> {
    return this.http.get<Certification[]>(this.serviceUrl);
  }

  // Retourne la Certification créée : Certification
  addCertificationService(certification): Observable<Certification> {
    const CertificationToStringify = this.addUtilisateurToCertification(certification);
    return this.http.post<any>(this.serviceUrl, JSON.stringify(CertificationToStringify), this.httpOptions);
  }

  // Retourne la Certification modifiée : Certification
  editCertificationService(certification): any {
    const CertificationToStringify = this.addUtilisateurToCertification(certification);
    return this.http.put<any>(this.serviceUrl, JSON.stringify(CertificationToStringify), this.httpOptions);
  }

  // Retourne true si la suppression est faite, false si y a erreur
  deleteCertificationService(id): any {
    return this.http.delete<any>(this.serviceUrl + '/' + id, this.httpOptions);
  }

  // Affecte un utilisateur à une certification et retourne la nouvelle certification enrichie
  addUtilisateurToCertification(certification) {
    const utilisateur = new Utilisateur();
    utilisateur.id = this.utilService.getIdUtilisateurFromToken();
    const CertificationToStringify = certification;
    // J'affecte l'Utilisateur à la certification avant de l'envoyer pour L'ajout de la certification par idUtilisateur
    CertificationToStringify.utilisateur = utilisateur;

    return CertificationToStringify;
  }
}
