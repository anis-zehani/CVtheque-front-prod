import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  // Attention : chaque écran possède ses propres coordonnées : serviceUrl + fonction Upload

  private serviceUrlContact = environment.baseUrl + '/contact';
  private serviceUrlPartenaire = environment.baseUrl + '/partenaire';
  private serviceUrlCandidat = environment.baseUrl + '/candidat';
  private serviceUrlRappel = environment.baseUrl + '/rappel';

  constructor(private http: HttpClient) { }

  addFichierRappel(file: File, id: any): Observable<HttpEvent<{}>> {

    const formdata: FormData = new FormData();

    formdata.append('file', file);

    const req = new HttpRequest('POST', this.serviceUrlRappel + '/addFichier/' + id, formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }

  addPhotoContact(file: File, id: any): Observable<HttpEvent<{}>> {

    const formdata: FormData = new FormData();

    formdata.append('file', file);

    const req = new HttpRequest
    (
      'POST',
      this.serviceUrlContact + '/addPhoto/' + id,
      formdata,
      {
      reportProgress: true,
      responseType: 'text'
      }
    );

    return this.http.request(req);
  }

  addPhotoPartenaire(file: File, id: any): Observable<HttpEvent<{}>> {

    const formdata: FormData = new FormData();

    formdata.append('file', file);

    const req = new HttpRequest('POST', this.serviceUrlPartenaire + '/addPhoto/' + id, formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req);
  }

  async addPhotoCandidat(photo: File, id: any) {

    const formdata: FormData = new FormData();

    formdata.append('photo', photo);

    const req = new HttpRequest('POST', this.serviceUrlCandidat + '/addPhoto/' + id, formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req).toPromise();
  }

  async addCvOdixCandidat(cvOdix: File, id: any) {

    const formdata: FormData = new FormData();

    formdata.append('cvOdix', cvOdix);

    const req = new HttpRequest('POST', this.serviceUrlCandidat + '/addCvOdix/' + id, formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req).toPromise();
  }

  async addCvOriginalCandidat(cvOriginal: File, id: any) {

    const formdata: FormData = new FormData();

    formdata.append('cvOriginal', cvOriginal);

    const req = new HttpRequest('POST', this.serviceUrlCandidat + '/addCvOriginal/' + id, formdata, {
      reportProgress: true,
      responseType: 'text'
    });

    return this.http.request(req).toPromise();
  }

  // Gestion des Uploads Auto Fill
  async addPhotoCandidatAutoFill(photo: File, id: any) {
    const formdata: FormData = new FormData();
    formdata.append('photoAutoFill', photo);
    const req = new HttpRequest('POST', this.serviceUrlCandidat + '/addPhotoCandidatAutoFill/' + id, formdata, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(req).toPromise();
  }

  async addCvOriginalCandidatAutoFill(cvOriginal: File, id: any) {
    const formdata: FormData = new FormData();
    formdata.append('cvOriginalAutoFill', cvOriginal);
    const req = new HttpRequest('POST', this.serviceUrlCandidat + '/addCvOriginalCandidatAutoFill/' + id, formdata, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(req).toPromise();
  }

  // Gestion des Uploads Auto Fill
  async addPhotoPartenaireAutoFill(photo: File, id: any) {
    const formdata: FormData = new FormData();
    formdata.append('photoPartenaireAutoFill', photo);
    const req = new HttpRequest('POST', this.serviceUrlPartenaire + '/addPhotoPartenaireAutoFill/' + id, formdata, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(req).toPromise();
  }
}
