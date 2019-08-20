import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  constructor() { }

  // Utile pour le Rappel : Redmine
  private remindMe = new BehaviorSubject(null);
  valueOfRemindMe = this.remindMe.asObservable();

  changeRemindMe(message: boolean) {
    this.remindMe.next(message);
  }

  // Utile pour Modifier Candidat : liste technologie : cas ou la liste a été touchée
  private listeTechnologie = new BehaviorSubject(null);
  valueOfListeTechnologie = this.listeTechnologie.asObservable();
  changeListeTechnologie(message: any) {
    this.listeTechnologie.next(message);
  }

  // cas ou la liste n'a pas été modifiée
  private listeTechnologieIsModified = new BehaviorSubject(null);
  valueOfListeTechnologieIsModified = this.listeTechnologieIsModified.asObservable();
  changeListeTechnologieIsModified(message: boolean) {
    this.listeTechnologieIsModified.next(message);
  }

  // Utile pour Modifier Candidat : liste opportunite : cas ou la liste a été touchée
  private listeOpportunite = new BehaviorSubject(null);
  valueOfListeOpportunite = this.listeOpportunite.asObservable();
  changeListeOpportunite(message: any) {
    this.listeOpportunite.next(message);
  }

  // cas ou la liste n'a pas été modifiée
  private listeOpportuniteIsModified = new BehaviorSubject(null);
  valueOfListeOpportuniteIsModified = this.listeOpportuniteIsModified.asObservable();
  changeListeOpportuniteIsModified(message: boolean) {
    this.listeOpportuniteIsModified.next(message);
  }

  // Utile pour Modifier Candidat : liste certification : cas ou la liste a été touchée
  private listeCertification = new BehaviorSubject(null);
  valueOfListeCertification = this.listeCertification.asObservable();
  changeListeCertification(message: any) {
    this.listeCertification.next(message);
  }

  // cas ou la liste n'a pas été modifiée
  private listeCertificationIsModified = new BehaviorSubject(null);
  valueOfListeCertificationIsModified = this.listeCertificationIsModified.asObservable();
  changeListeCertificationIsModified(message: boolean) {
    this.listeCertificationIsModified.next(message);
  }

  // Utile pour Modifier Opportunité : liste candidat : cas ou la liste a été touchée
  private listeCandidat = new BehaviorSubject(null);
  valueOfListeCandidat = this.listeCandidat.asObservable();
  changeListeCandidat(message: any) {
    this.listeCandidat.next(message);
  }

  // cas ou la liste n'a pas été modifiée
  private listeCandidatIsModified = new BehaviorSubject(null);
  valueOfListeCandidatIsModified = this.listeCandidatIsModified.asObservable();
  changeListeCandidatIsModified(message: boolean) {
    this.listeCandidatIsModified.next(message);
  }
}
