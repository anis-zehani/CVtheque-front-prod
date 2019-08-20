import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Certification } from '../@Models/certification';

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

  constructor(private http: HttpClient) { }

  // Retourne un tableau de toutes les Certifications : Certification[]
  getAllCertificationsService(): Observable<Certification[]> {
    return this.http.get<Certification[]>(this.serviceUrl);
  }

  // Retourne la Certification créée : Certification
  addCertificationService(certification): Observable<Certification> {
    return this.http.post<any>(this.serviceUrl, JSON.stringify(certification), this.httpOptions);
  }

  // Retourne la Certification modifiée : Certification
  editCertificationService(certification): any {
    return this.http.put<any>(this.serviceUrl, JSON.stringify(certification), this.httpOptions);
  }

  // Retourne true si la suppression est faite, false si y a erreur
  deleteCertificationService(id): any {
    return this.http.delete<any>(this.serviceUrl + '/' + id, this.httpOptions);
  }
}
