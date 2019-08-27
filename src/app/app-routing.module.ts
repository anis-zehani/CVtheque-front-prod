import { NgModule } from '@angular/core';
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
import { LogoutComponent } from './@Components/authentification/logout/logout.component';


const routes: Routes = [

  // Les URL Valables
  // { path: '', pathMatch: 'full', redirectTo: 'login'},
  { path: '',   component: AuthentificationComponent },
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
  { path: 'logout',   component: LogoutComponent },

  // URL Introuvable renvoi finalement vers le composant Accueil
  { path: '**', component: AuthentificationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
