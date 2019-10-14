import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { UtilService } from '../@Util/util.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Fichier } from '../@Models/fichier';

@Injectable({
  providedIn: 'root'
})
export class FichiersService {

  private serviceUrl = environment.baseUrl + '/fichier';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
    };

  constructor(private http: HttpClient, private utilService: UtilService) { }

  // Retourne un tableau de tous les fichiers : Fichier[]
  getAllFichiersService(): Observable<Fichier[]> {
    return this.http.get<Fichier[]>(this.serviceUrl);
  }

    // Ne retourne rien
  deleteFichierService(nomFichier) {
    return this.http.delete<any>(this.serviceUrl + '/' + nomFichier, this.httpOptions);
  }
}
