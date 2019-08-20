import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthentificationComponent } from './@Components/authentification/authentification.component';

import { AccueilComponent } from './@Components/accueil/accueil.component';
import { RappelsComponent } from './@Components/rappels/rappels.component';
import { CandidatsComponent } from './@Components/candidats/candidats.component';
import { OpportunitesComponent } from './@Components/opportunites/opportunites.component';
import { PartenairesComponent } from './@Components/partenaires/partenaires.component';
import { ContactsComponent } from './@Components/contacts/contacts.component';

import { TechnologiesComponent } from './@Components/technologies/technologies.component';
import { EntreprisesComponent } from './@Components/entreprises/entreprises.component';
import { EcolesComponent } from './@Components/ecoles/ecoles.component';
import { CertificationsComponent } from './@Components/certifications/certifications.component';
import { CollaborateursComponent } from './@Components/collaborateurs/collaborateurs.component';


const routes: Routes = [
  //URL Vide renvoi vers le composant Accueil
  //{ path: '',   component: AccueilComponent },
  { path: '',   component: AuthentificationComponent },

  //Les URL Valables
  { path: 'accueil',   component: AccueilComponent },
  { path: 'rappels', component: RappelsComponent },
  { path: 'candidats', component: CandidatsComponent },
  { path: 'opportunites', component: OpportunitesComponent },
  { path: 'partenaires', component: PartenairesComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'technologies', component: TechnologiesComponent },
  { path: 'entreprises', component: EntreprisesComponent },
  { path: 'certifications', component: CertificationsComponent },
  { path: 'ecoles', component: EcolesComponent },
  { path: 'collaborateurs', component: CollaborateursComponent },

  //URL Introuvable renvoi finalement vers le composant Accueil
  { path: '**', component: AccueilComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
