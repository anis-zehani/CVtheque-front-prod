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
import { RedirectLinkedinComponent } from './@Components/authentification/redirect-linkedin/redirect-linkedin.component';
import { AccountCandidatComponent } from './@Components/candidats/account-candidat/account-candidat.component';

// Toute personne authentifiée
import { AuthGuardService } from './@Services/auth-guard.service';
// Administrateur seulement
import { Level1GuardService } from './@Services/level1-guard.service';
// Administrateur ou Partenaire seulement
import { Level2GuardService } from './@Services/level2-guard.service';

const routes: Routes = [

  // Les URL Valables : AuthGuardService partout sauf sur le login
  { path: '', pathMatch: 'full', redirectTo: 'login'},
  { path: 'login',   component: AuthentificationComponent },
  { path: 'logout',   component: LogoutComponent, canActivate: [AuthGuardService] },
  { path: 'account',   component: AccountCandidatComponent, canActivate: [AuthGuardService] },

  { path: 'accueil',   component: AccueilComponent, canActivate: [AuthGuardService] },
  { path: 'rappels', component: RappelsComponent, canActivate: [AuthGuardService] },
  { path: 'candidats', component: CandidatsComponent, canActivate: [AuthGuardService, Level2GuardService] },
  { path: 'opportunites', component: OpportunitesComponent, canActivate: [AuthGuardService, Level2GuardService] },
  { path: 'partenaires', component: PartenairesComponent, canActivate: [AuthGuardService, Level1GuardService] },
  { path: 'contacts', component: ContactsComponent, canActivate: [AuthGuardService] },
  { path: 'technologies', component: TechnologiesComponent, canActivate: [AuthGuardService, Level2GuardService] },
  { path: 'entreprises', component: EntreprisesComponent, canActivate: [AuthGuardService, Level1GuardService] },
  { path: 'certifications', component: CertificationsComponent, canActivate: [AuthGuardService, Level2GuardService] },
  { path: 'ecoles', component: EcolesComponent, canActivate: [AuthGuardService, Level1GuardService] },
  { path: 'collaborateurs', component: CollaborateursComponent, canActivate: [AuthGuardService, Level1GuardService] },

  // OAuth2 LinkedIn
  { path: 'redirect-linkedin', component: RedirectLinkedinComponent},

  // URL Introuvable renvoi finalement vers le composant Accueil
  { path: '**', component: AuthentificationComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
