import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule} from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { MatMomentDateModule, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { MatTabsModule } from '@angular/material/tabs';
import { MAT_DATE_LOCALE } from '@angular/material';

import { HeaderComponent } from './@Components/header/header.component';

import { TechnologiesService } from './@Services/technologies.service';
import { EntreprisesService } from './@Services/entreprises.service';
import { CertificationsService } from './@Services/certifications.service';
import { EcolesService } from './@Services/ecoles.service';
import { PartenairesService } from './@Services/partenaires.service';
import { OpportunitesService } from './@Services/opportunites.service';

import { TechnologiesComponent } from './@Components/technologies/technologies.component';
import { EntreprisesComponent } from './@Components/entreprises/entreprises.component';
import { CertificationsComponent } from './@Components/certifications/certifications.component';
import { EcolesComponent } from './@Components/ecoles/ecoles.component';

import { FormAddTechnologiesComponent } from './@Components/technologies/form-add-technologies/form-add-technologies.component';
import { RappelsComponent } from './@Components/rappels/rappels.component';
import { CandidatsComponent } from './@Components/candidats/candidats.component';
import { OpportunitesComponent } from './@Components/opportunites/opportunites.component';
import { PartenairesComponent } from './@Components/partenaires/partenaires.component';
import { ContactsComponent } from './@Components/contacts/contacts.component';
import { CollaborateursComponent } from './@Components/collaborateurs/collaborateurs.component';
import { AccueilComponent } from './@Components/accueil/accueil.component';
import { ListeEntreprisesComponent } from './@Components/entreprises/liste-entreprises/liste-entreprises.component';
import { ContactsService } from './@Services/contacts.service';
import { DatagridTechnologiesComponent } from './@Components/technologies/datagrid-technologies/datagrid-technologies.component';
import { FormEditTechnologiesComponent } from './@Components/technologies/form-edit-technologies/form-edit-technologies.component';
import { DatagridEcolesComponent } from './@Components/ecoles/datagrid-ecoles/datagrid-ecoles.component';
import { FormAddEcolesComponent } from './@Components/ecoles/form-add-ecoles/form-add-ecoles.component';
import { FormEditEcolesComponent } from './@Components/ecoles/form-edit-ecoles/form-edit-ecoles.component';
import { FormEditCertificationsComponent } from './@Components/certifications/form-edit-certifications/form-edit-certifications.component';
import { FormAddCertificationsComponent } from './@Components/certifications/form-add-certifications/form-add-certifications.component';
import { DatagridCertificationsComponent } from './@Components/certifications/datagrid-certifications/datagrid-certifications.component';
import { DatagridEntreprisesComponent } from './@Components/entreprises/datagrid-entreprises/datagrid-entreprises.component';
import { FormAddEntreprisesComponent } from './@Components/entreprises/form-add-entreprises/form-add-entreprises.component';
import { FormEditEntreprisesComponent } from './@Components/entreprises/form-edit-entreprises/form-edit-entreprises.component';
import { FormAddContactsComponent } from './@Components/contacts/form-add-contacts/form-add-contacts.component';
import { FormEditContactsComponent } from './@Components/contacts/form-edit-contacts/form-edit-contacts.component';
import { DatagridContactsComponent } from './@Components/contacts/datagrid-contacts/datagrid-contacts.component';
import { DatagridPartenairesComponent } from './@Components/partenaires/datagrid-partenaires/datagrid-partenaires.component';
import { FormAddPartenairesComponent } from './@Components/partenaires/form-add-partenaires/form-add-partenaires.component';
import { FormEditPartenairesComponent } from './@Components/partenaires/form-edit-partenaires/form-edit-partenaires.component';
import { DatagridOpportunitesComponent } from './@Components/opportunites/datagrid-opportunites/datagrid-opportunites.component';
import { FormAddOpportunitesComponent } from './@Components/opportunites/form-add-opportunites/form-add-opportunites.component';
import { FormEditOpportunitesComponent } from './@Components/opportunites/form-edit-opportunites/form-edit-opportunites.component';
import { ListePartenairesComponent } from './@Components/partenaires/liste-partenaires/liste-partenaires.component';
import { FormAddCandidatsComponent } from './@Components/candidats/form-add-candidats/form-add-candidats.component';
import { FormEditCandidatsComponent } from './@Components/candidats/form-edit-candidats/form-edit-candidats.component';
import { DatagridCandidatsComponent } from './@Components/candidats/datagrid-candidats/datagrid-candidats.component';
import { ListeEcolesComponent } from './@Components/ecoles/liste-ecoles/liste-ecoles.component';
import { FormAddProjetsComponent } from './@Components/rappels/form-add-projets/form-add-projets.component';
import { FormAddRappelsComponent } from './@Components/rappels/form-add-rappels/form-add-rappels.component';
import { ListeDeroulanteProjetsComponent } from './@Components/rappels/liste-deroulante-projets/liste-deroulante-projets.component';
import { ListeScrollInboxComponent } from './@Components/rappels/liste-scroll-inbox/liste-scroll-inbox.component';
import { ListeScrollProjetsComponent } from './@Components/rappels/liste-scroll-projets/liste-scroll-projets.component';
import { DatagridRappelsComponent } from './@Components/rappels/datagrid-rappels/datagrid-rappels.component';
import { FormEditRappelsComponent } from './@Components/rappels/form-edit-rappels/form-edit-rappels.component';

// For 404 when page is refreshed
import { HashLocationStrategy, LocationStrategy } from '@angular/common';


import { StatistiquesComponent } from './@Components/statistiques/statistiques.component';
import { ChartsModule } from 'ng2-charts';
import { PieChartComponent } from './@Components/statistiques/pie-chart/pie-chart.component';
import { ShowCandidatComponent } from './@Components/candidats/show-candidat/show-candidat.component';
// tslint:disable-next-line: max-line-length
import { ListeTechnologiesForAddComponent } from './@Components/technologies/liste-technologies-for-add/liste-technologies-for-add.component';
// tslint:disable-next-line: max-line-length
import { ListeTechnologiesForEditComponent } from './@Components/technologies/liste-technologies-for-edit/liste-technologies-for-edit.component';
// tslint:disable-next-line: max-line-length
import { ListeCertificationsForEditComponent } from './@Components/certifications/liste-certifications-for-edit/liste-certifications-for-edit.component';
// tslint:disable-next-line: max-line-length
import { ListeCertificationsForAddComponent } from './@Components/certifications/liste-certifications-for-add/liste-certifications-for-add.component';
// tslint:disable-next-line: max-line-length
import { ListeOpportunitesForEditComponent } from './@Components/opportunites/liste-opportunites-for-edit/liste-opportunites-for-edit.component';
// tslint:disable-next-line: max-line-length
import { ListeOpportunitesForAddComponent } from './@Components/opportunites/liste-opportunites-for-add/liste-opportunites-for-add.component';
import { DialogAddTechnologiesComponent } from './@Components/technologies/dialog-add-technologies/dialog-add-technologies.component';
import { DialogAddEntreprisesComponent } from './@Components/entreprises/dialog-add-entreprises/dialog-add-entreprises.component';
import { DialogAddEcolesComponent } from './@Components/ecoles/dialog-add-ecoles/dialog-add-ecoles.component';
import { DialogAddPartenairesComponent } from './@Components/partenaires/dialog-add-partenaires/dialog-add-partenaires.component';
import { DialogEditProjetsComponent } from './@Components/rappels/dialog-edit-projets/dialog-edit-projets.component';
import { FormEditCollaborateursComponent } from './@Components/collaborateurs/form-edit-collaborateurs/form-edit-collaborateurs.component';
import { DeleteConfirmationComponent } from './@Components/dialogs/delete-confirmation/delete-confirmation.component';
import { ShowContactComponent } from './@Components/contacts/show-contact/show-contact.component';
import { ShowPartenaireComponent } from './@Components/partenaires/show-partenaire/show-partenaire.component';
import { ShowOpportuniteComponent } from './@Components/opportunites/show-opportunite/show-opportunite.component';
import { FooterComponent } from './@Components/footer/footer.component';
import { ListeCandidatsForShowComponent } from './@Components/candidats/liste-candidats-for-show/liste-candidats-for-show.component';
import { AuthentificationComponent } from './@Components/authentification/authentification.component';
import { FormAddCollaborateursComponent } from './@Components/collaborateurs/form-add-collaborateurs/form-add-collaborateurs.component';
import { DatagridCollaborateursComponent } from './@Components/collaborateurs/datagrid-collaborateurs/datagrid-collaborateurs.component';
import { ListeCandidatsForEditComponent } from './@Components/candidats/liste-candidats-for-edit/liste-candidats-for-edit.component';
import { ListeCandidatsForAddComponent } from './@Components/candidats/liste-candidats-for-add/liste-candidats-for-add.component';
// tslint:disable-next-line: max-line-length
import { ListeTechnologiesForShowComponent } from './@Components/technologies/liste-technologies-for-show/liste-technologies-for-show.component';
// tslint:disable-next-line: max-line-length
import { ListeOpportunitesForShowComponent } from './@Components/opportunites/liste-opportunites-for-show/liste-opportunites-for-show.component';
// tslint:disable-next-line: max-line-length
import { ListeCertificationsForShowComponent } from './@Components/certifications/liste-certifications-for-show/liste-certifications-for-show.component';
import { ShowTechnologieComponent } from './@Components/technologies/show-technologie/show-technologie.component';
import { ShowCertificationComponent } from './@Components/certifications/show-certification/show-certification.component';
import { ShowEntrepriseComponent } from './@Components/entreprises/show-entreprise/show-entreprise.component';
// tslint:disable-next-line: max-line-length
import { DialogAddCertificationsComponent } from './@Components/certifications/dialog-add-certifications/dialog-add-certifications.component';
// tslint:disable-next-line: max-line-length
import { ListePartenairesForShowComponent } from './@Components/partenaires/liste-partenaires-for-show/liste-partenaires-for-show.component';
// tslint:disable-next-line: max-line-length
import { ListeTechnologiesForSearchComponent } from './@Components/technologies/liste-technologies-for-search/liste-technologies-for-search.component';
import { FormAddCompteCandidatComponent } from './@Components/authentification/form-add-compte-candidat/form-add-compte-candidat.component';
// tslint:disable-next-line: max-line-length
import { FormAddComptePartenaireComponent } from './@Components/authentification/form-add-compte-partenaire/form-add-compte-partenaire.component';
import { FormRecupererPasswordComponent } from './@Components/authentification/form-recuperer-password/form-recuperer-password.component';
import { LoginComponent } from './@Components/authentification/login/login.component';
import { LogoutComponent } from './@Components/authentification/logout/logout.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TechnologiesComponent,
    CertificationsComponent,
    FormAddTechnologiesComponent,
    EntreprisesComponent,
    EcolesComponent,
    RappelsComponent,
    CandidatsComponent,
    OpportunitesComponent,
    PartenairesComponent,
    ContactsComponent,
    CollaborateursComponent,
    AccueilComponent,
    ListeEntreprisesComponent,
    DatagridTechnologiesComponent,
    FormEditTechnologiesComponent,
    DatagridEcolesComponent,
    FormAddEcolesComponent,
    FormEditEcolesComponent,
    FormEditCertificationsComponent,
    FormAddCertificationsComponent,
    DatagridCertificationsComponent,
    DatagridEntreprisesComponent,
    FormAddEntreprisesComponent,
    FormEditEntreprisesComponent,
    FormAddContactsComponent,
    FormEditContactsComponent,
    DatagridContactsComponent,
    DatagridPartenairesComponent,
    FormAddPartenairesComponent,
    FormEditPartenairesComponent,
    DatagridOpportunitesComponent,
    FormAddOpportunitesComponent,
    FormEditOpportunitesComponent,
    ListePartenairesComponent,
    FormAddCandidatsComponent,
    FormEditCandidatsComponent,
    DatagridCandidatsComponent,
    ListeEcolesComponent,
    FormAddProjetsComponent,
    FormAddRappelsComponent,
    ListeDeroulanteProjetsComponent,
    ListeScrollInboxComponent,
    ListeScrollProjetsComponent,
    DatagridRappelsComponent,
    FormEditRappelsComponent,
    StatistiquesComponent,
    PieChartComponent,
    ShowCandidatComponent,
    ListeTechnologiesForAddComponent,
    ListeTechnologiesForEditComponent,
    ListeCertificationsForEditComponent,
    ListeCertificationsForAddComponent,
    ListeOpportunitesForEditComponent,
    ListeOpportunitesForAddComponent,
    DialogAddTechnologiesComponent,
    DialogAddEntreprisesComponent,
    DialogAddEcolesComponent,
    DialogAddPartenairesComponent,
    DialogEditProjetsComponent,
    FormEditCollaborateursComponent,
    DeleteConfirmationComponent,
    ShowContactComponent,
    ShowPartenaireComponent,
    ShowOpportuniteComponent,
    FooterComponent,
    ListeCandidatsForShowComponent,
    AuthentificationComponent,
    FormAddCollaborateursComponent,
    DatagridCollaborateursComponent,
    ListeCandidatsForEditComponent,
    ListeCandidatsForAddComponent,
    ListeTechnologiesForShowComponent,
    ListeOpportunitesForShowComponent,
    ListeCertificationsForShowComponent,
    ShowTechnologieComponent,
    ShowCertificationComponent,
    ShowEntrepriseComponent,
    DialogAddCertificationsComponent,
    ListePartenairesForShowComponent,
    ListeTechnologiesForSearchComponent,
    FormAddCompteCandidatComponent,
    FormAddComptePartenaireComponent,
    FormRecupererPasswordComponent,
    LoginComponent,
    LogoutComponent
  ],
  entryComponents: [
    FormEditTechnologiesComponent,
    FormAddEcolesComponent,
    FormEditEcolesComponent,
    FormEditCertificationsComponent,
    FormAddEntreprisesComponent,
    FormEditEntreprisesComponent,
    FormEditContactsComponent,
    FormEditPartenairesComponent,
    FormEditOpportunitesComponent,
    FormEditCandidatsComponent,
    FormAddProjetsComponent,
    FormAddRappelsComponent,
    FormEditRappelsComponent,
    ShowCandidatComponent,
    DialogAddTechnologiesComponent,
    DialogAddEntreprisesComponent,
    DialogAddEcolesComponent,
    DialogAddPartenairesComponent,
    DialogEditProjetsComponent,
    FormEditCollaborateursComponent,
    DeleteConfirmationComponent,
    ShowContactComponent,
    ShowPartenaireComponent,
    ShowOpportuniteComponent,
    ShowTechnologieComponent,
    ShowCertificationComponent,
    ShowEntrepriseComponent,
    DialogAddCertificationsComponent,
    FormAddCompteCandidatComponent,
    FormAddComptePartenaireComponent,
    FormRecupererPasswordComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatSidenavModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    MatBadgeModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatAutocompleteModule,
    ChartsModule,
    MatListModule,
    MatTooltipModule,
    MatTabsModule
  ],
  providers: [
    TechnologiesService,
    EntreprisesService,
    EcolesService,
    CertificationsService,
    ContactsService,
    PartenairesService,
    OpportunitesService,

    { provide: MatDialogRef, useValue: {} },
    // Essentiel pour afficher la date en Français
    { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' },

    // Obligatoire pour que le DatePicker ne donne pas une date j-1
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },

    // For F5 refresh 404 error
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

