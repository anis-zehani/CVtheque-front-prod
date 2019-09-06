import { Component, OnInit , Output, EventEmitter, Input, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { MatRadioModule } from '@angular/material/radio';

import { OpportunitesService } from '../../../@Services/opportunites.service';
import { UtilService } from '../../../@Util/util.service';
import { Partenaire } from 'src/app/@Models/partenaire';
import { Technologie } from 'src/app/@Models/technologie';
import { ListeTechnologiesForAddComponent } from '../../../@Components/technologies/liste-technologies-for-add/liste-technologies-for-add.component';
import { ListeCandidatsForAddComponent } from '../../../@Components/candidats/liste-candidats-for-add/liste-candidats-for-add.component';
import { ListeCertificationsForAddComponent } from '../../../@Components/certifications/liste-certifications-for-add/liste-certifications-for-add.component';

import { CandidatsService } from '../../../@Services/candidats.service';
import { Certification } from 'src/app/@Models/certification';

@Component({
  selector: 'app-form-add-opportunites',
  templateUrl: './form-add-opportunites.component.html',
  styleUrls: ['./form-add-opportunites.component.css']

})
export class FormAddOpportunitesComponent implements OnInit {

  // Afin de ferme le sidenav du parent
  @Input() inputSideNav: MatSidenav;

  // Envoi l'event pour mettre à jour la table
  @Output() refreshTableEvent = new EventEmitter<Event>();

  responsableOpportunite: Partenaire;
  listeTechnologies: Technologie[];
  listeTechnologiesFinale: Technologie[] = [];

  listeCertifications: Certification[];
  listeCertificationsFinale: Certification[] = [];

  listeCandidats: number[];
  role: string;
  idUtilisateur: number;

  @ViewChild(ListeTechnologiesForAddComponent, {static: false}) childListeTechnologies: ListeTechnologiesForAddComponent;
  @ViewChild(ListeCandidatsForAddComponent, {static: false}) childListeCandidats: ListeCandidatsForAddComponent;
  @ViewChild(ListeCertificationsForAddComponent, {static: false}) childListeCertifications: ListeCertificationsForAddComponent;

  // Mon Reactive Form
  formOpportunite = new FormGroup({
    titreOpportunite: new FormControl('', Validators.required),
    descriptionOpportunite: new FormControl('', Validators.nullValidator),
    dateDemarrageSouhaitee: new FormControl('', Validators.nullValidator),
    tjmOpportunite: new FormControl('', Validators.nullValidator),
    visibiliteOpportunite: new FormControl('', Validators.required),
    responsableOpportunite: new FormControl('', Validators.nullValidator),
    listeTechnologies: new FormControl('', Validators.nullValidator),
    listeCertifications: new FormControl('', Validators.nullValidator)
  });

  constructor(
    private opportunitesService: OpportunitesService,
    private candidatsService: CandidatsService,
    private utilService: UtilService) {
      this.responsableOpportunite = new Partenaire();
    }

  ngOnInit() {
    // je récupère le rôle pour la restriction d'accès dans le menu
    this.role = this.utilService.getRoleUtilisateurFromToken();
    this.idUtilisateur = this.utilService.getIdUtilisateurFromToken();
  }

  // Quand on ajoute un Opportunite : un EVENT est envoyé au Parent pour rafraichir la table
  refreshTableFunction($event) {
    this.refreshTableEvent.emit($event);
  }

  // Parent intercepte l'event envoyé par son fils : <app-liste-partenaires> qui génére un EventEmitter
  partenaireIdEventListner($event) {
    this.responsableOpportunite.id = $event;
  }

  // Parent intercepte l'event envoyé par son fils : <app-liste-technologies-for-add> qui génére un EventEmitter
  listeTechnologiesOpportunitesEventListner($event) {

    this.listeTechnologiesFinale = [];

    for (let i = 0; i < $event.length; i++) {
      const technologie = new Technologie($event[i]._value.id, $event[i]._value.nomTechnologie, null);
      this.listeTechnologiesFinale.push(technologie);
    }
    this.listeTechnologies = this.listeTechnologiesFinale;
  }

  // Parent intercepte l'event envoyé par son fils : <app-liste-candidats-for-add> qui génére un EventEmitter
  listeCandidatsOpportunitesEventListner($event) {

      this.listeCandidats = [];

      for (let i = 0; i < $event.length; i++) {
        this.listeCandidats.push($event[i]._value);
      }
      // console.log(this.listeCandidats);
  }

  // Parent intercepte l'event envoyé par son fils : <app-liste-certifications-for-add> qui génére un EventEmitter
  listeCertificationsOpportunitesEventListner($event) {

    this.listeCertificationsFinale = [];

    for (let i = 0; i < $event.length; i++) {
      const certification = new Certification($event[i]._value.id, $event[i]._value.nomCertification, null);
      this.listeCertificationsFinale.push(certification);
    }
    this.listeCertifications = this.listeCertificationsFinale;
  }

  // Permet de faire appel au service afin d'affecter des candidats à l'opportunité
  addCandidatsToOpportuniteController(idOpportunite, listeCandidats) {
    this.candidatsService.addCandidatsToOpportuniteService(idOpportunite, listeCandidats, false)
    .subscribe
          (res => {});
  }

  // Ajouter une opportunité
  addOpportuniteController() {
    // Si c'est un Partenaire alors il est mis comme Responsable Opportunité par défaut : sans liste déroulante
    if (this.role === 'Partenaire') {
      this.responsableOpportunite.id = this.idUtilisateur;
    }

    this.formOpportunite.patchValue({
      responsableOpportunite: this.responsableOpportunite,
      listeTechnologies: this.listeTechnologies,
      listeCertifications : this.listeCertifications
    });

    this.opportunitesService.addOpportuniteService(this.formOpportunite.value)
    .subscribe
      (res => { if (res != null) {
          const idOpportunite = res.id; // ID de l'opportunité ajoutée

          // Ajouter des candidats à l'opportunité récement créée
          if (this.listeCandidats) {
          this.addCandidatsToOpportuniteController(idOpportunite, this.listeCandidats);
          }

          this.refreshTableFunction(true);
          this.utilService.openSnackBar('Opportunité ajoutée', 'OK');
          }
        }
      );
    this.formOpportunite.reset();

      // Faire le reset aux 3 listes filles
    this.childListeTechnologies.ngOnInit();
    this.childListeCandidats.ngOnInit();
    this.childListeCertifications.ngOnInit();
  }

}
