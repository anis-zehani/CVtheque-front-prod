import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Notification } from '../@Models/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  private serviceUrl = environment.baseUrl + '/notification';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
    };

  constructor(private http: HttpClient) { }

  // Retourne un tableau de toutes les Notifications : Notification[]
  getAllNotificationsByIdAndEtatService(idDestinataire, etatNotification): Observable<Notification[]> {
    return this.http.get<Notification[]>(this.serviceUrl + '/all/' + idDestinataire + '/' + etatNotification, this.httpOptions);
  }

  // Desactive une notification
  deactivateNotificationService(idNotification): Observable<boolean> {
    return this.http.delete<boolean>(this.serviceUrl + '/' + idNotification, this.httpOptions);
  }
}
