import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  //Attention : chaque écran possède ses propres coordonnées : serviceUrl + fonction Upload

  private serviceUrlContact = environment.baseUrl+'/contact';
  private serviceUrlPartenaire = environment.baseUrl+'/partenaire';
  private serviceUrlCandidat = environment.baseUrl+'/candidat';
  private serviceUrlRappel = environment.baseUrl+'/rappel';

  constructor(private http: HttpClient) { }

  addFichierRappel(file: File, id:any): Observable<HttpEvent<{}>> {

    const formdata: FormData = new FormData();

    formdata.append('file', file);
 
    const req = new HttpRequest('POST', this.serviceUrlRappel+'/addFichier/'+id, formdata, {
      reportProgress: true,
      responseType: 'text'
    });
 
    return this.http.request(req);
  }
 
  addPhotoContact(file: File, id:any): Observable<HttpEvent<{}>> {

    const formdata: FormData = new FormData();

    formdata.append('file', file);
 
    const req = new HttpRequest
    (
      'POST', 
      this.serviceUrlContact+'/addPhoto/'+id, 
      formdata, 
      {
      reportProgress: true,
      responseType: 'text'
      }
    );
 
    return this.http.request(req);
  }

  addPhotoPartenaire(file: File, id:any): Observable<HttpEvent<{}>> {

    const formdata: FormData = new FormData();

    formdata.append('file', file);
 
    const req = new HttpRequest('POST', this.serviceUrlPartenaire+'/addPhoto/'+id, formdata, {
      reportProgress: true,
      responseType: 'text'
    });
 
    return this.http.request(req);
  }

  addPhotoCandidat(photo: File, id:any): Observable<HttpEvent<{}>> {

    const formdata: FormData = new FormData();

    formdata.append('photo', photo);
 
    const req = new HttpRequest('POST', this.serviceUrlCandidat+'/addPhoto/'+id, formdata, {
      reportProgress: true,
      responseType: 'text'
    });
 
    return this.http.request(req);
  }

  addCvOdixCandidat(cvOdix: File, id:any): Observable<HttpEvent<{}>> {

    const formdata: FormData = new FormData();

    formdata.append('cvOdix', cvOdix);
 
    const req = new HttpRequest('POST', this.serviceUrlCandidat+'/addCvOdix/'+id, formdata, {
      reportProgress: true,
      responseType: 'text'
    });
 
    return this.http.request(req);
  }

  addCvOriginalCandidat(cvOriginal: File, id:any): Observable<HttpEvent<{}>> {

    const formdata: FormData = new FormData();

    formdata.append('cvOriginal', cvOriginal);
 
    const req = new HttpRequest('POST', this.serviceUrlCandidat+'/addCvOriginal/'+id, formdata, {
      reportProgress: true,
      responseType: 'text'
    });
 
    return this.http.request(req);
  }
}
