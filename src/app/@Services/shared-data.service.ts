import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  constructor() { }

  // Utile pour le Rappel : RemindMe
  private remindMe = new BehaviorSubject(null);
  valueOfRemindMe = this.remindMe.asObservable();

  // Utile pour Modifier Candidat : liste technologie : cas ou la liste a été touchée
  private listeTechnologie = new BehaviorSubject(null);
  valueOfListeTechnologie = this.listeTechnologie.asObservable();

  // cas ou la liste n'a pas été modifiée
  private listeTechnologieIsModified = new BehaviorSubject(null);
  valueOfListeTechnologieIsModified = this.listeTechnologieIsModified.asObservable();

  // Utile pour Modifier Candidat : liste opportunite : cas ou la liste a été touchée
  private listeOpportunite = new BehaviorSubject(null);
  valueOfListeOpportunite = this.listeOpportunite.asObservable();

  // cas ou la liste n'a pas été modifiée
  private listeOpportuniteIsModified = new BehaviorSubject(null);
  valueOfListeOpportuniteIsModified = this.listeOpportuniteIsModified.asObservable();

  // Utile pour Modifier Candidat : liste certification : cas ou la liste a été touchée
  private listeCertification = new BehaviorSubject(null);
  valueOfListeCertification = this.listeCertification.asObservable();

  // cas ou la liste n'a pas été modifiée
  private listeCertificationIsModified = new BehaviorSubject(null);
  valueOfListeCertificationIsModified = this.listeCertificationIsModified.asObservable();

  // Utile pour Modifier Opportunité : liste candidat : cas ou la liste a été touchée
  private listeCandidat = new BehaviorSubject(null);
  valueOfListeCandidat = this.listeCandidat.asObservable();

  // cas ou la liste n'a pas été modifiée
  private listeCandidatIsModified = new BehaviorSubject(null);
  valueOfListeCandidatIsModified = this.listeCandidatIsModified.asObservable();

  changeRemindMe(message: boolean) {
    this.remindMe.next(message);
  }

  changeListeTechnologie(message: any) {
    this.listeTechnologie.next(message);
  }

  changeListeTechnologieIsModified(message: boolean) {
    this.listeTechnologieIsModified.next(message);
  }

  changeListeOpportunite(message: any) {
    this.listeOpportunite.next(message);
  }

  changeListeOpportuniteIsModified(message: boolean) {
    this.listeOpportuniteIsModified.next(message);
  }

  changeListeCertification(message: any) {
    this.listeCertification.next(message);
  }

  changeListeCertificationIsModified(message: boolean) {
    this.listeCertificationIsModified.next(message);
  }

  changeListeCandidat(message: any) {
    this.listeCandidat.next(message);
  }

  changeListeCandidatIsModified(message: boolean) {
    this.listeCandidatIsModified.next(message);
  }
}
