import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatTableDataSource} from '@angular/material/table';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort} from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';

import { environment } from '../../../../environments/environment';
import { CandidatsService } from '../../../@Services/candidats.service';
import { Candidat } from '../../../@Models/candidat';
import { FormEditCandidatsComponent } from '../../../@Components/candidats/form-edit-candidats/form-edit-candidats.component';
import { DeleteConfirmationComponent } from '../../../@Components/dialogs/delete-confirmation/delete-confirmation.component';
import { ShowCandidatComponent } from '../../../@Components/candidats/show-candidat/show-candidat.component';
import { UtilService } from '../../../@Util/util.service';
import { Entreprise } from '../../../@Models/entreprise';
import { Etat } from '../../../@Models/enums';
import { Ecole } from 'src/app/@Models/ecole';
import { Curriculum } from 'src/app/@Models/curriculum';
import { Visa } from 'src/app/@Models/visa';
import { Diplome } from 'src/app/@Models/diplome';
import { SharedDataService } from '../../../@Services/shared-data.service';
import { Technologie } from 'src/app/@Models/technologie';
import { Opportunite } from 'src/app/@Models/opportunite';
import { Certification } from 'src/app/@Models/certification';


@Component({
  providers: [DatePipe],
  selector: 'app-datagrid-candidats',
  templateUrl: './datagrid-candidats.component.html',
  styleUrls: ['./datagrid-candidats.component.css']
})
export class DatagridCandidatsComponent implements OnInit {

  //URL du serveur de stockage
  storageUrl = environment.storageUrl;

  @Input() listeCandidats = new MatTableDataSource<Candidat>();
  
  displayedColumns: string[] = ['urlPhoto', 'candidat', 'details', 'etat', 'more'];

  candidat : Candidat;
  entreprise : Entreprise;
  diplome :  Diplome;
  ecole : Ecole;
  curriculum : Curriculum;
  visa : Visa;

  listeTechnologiesFinale: Technologie[] = [];
  valueOfListeTechnologie : any = null;
  valueOfListeTechnologieIsModified : boolean = false; 

  listeOpportunitesFinale: Opportunite[] = [];
  valueOfListeOpportunite : any = null;
  valueOfListeOpportuniteIsModified : boolean = false;

  listeCertificationsFinale: Certification[] = [];
  valueOfListeCertification : any = null;
  valueOfListeCertificationIsModified : boolean = false;

  etatCandidat : string = "True";

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(
    private candidatsService: CandidatsService, 
    private utilService: UtilService,
    public dialog: MatDialog,
    private datePipe: DatePipe,
    private sharedService: SharedDataService
    )
   { 
    this.candidat = new Candidat(null);

    this.entreprise =  new Entreprise(null, null, null);
    this.candidat.entreprise = this.entreprise;

    this.diplome =  new Diplome();
    this.candidat.diplome = this.diplome;

    this.ecole = new Ecole();
    this.diplome.ecole = this.ecole;

    this.visa = new Visa();
    this.candidat.visa = this.visa;
    
   }

  ngOnInit() {
    this.getAllCandidatsController("True");

    this.listeCandidats.paginator = this.paginator;
    this.listeCandidats.sort = this.sort;

    this.sharedService.valueOfListeTechnologie.subscribe(valueOfListeTechnologie => this.valueOfListeTechnologie = valueOfListeTechnologie);
    this.sharedService.valueOfListeTechnologieIsModified.subscribe(valueOfListeTechnologieIsModified => this.valueOfListeTechnologieIsModified = valueOfListeTechnologieIsModified);


    this.sharedService.valueOfListeOpportunite.subscribe(valueOfListeOpportunite => this.valueOfListeOpportunite = valueOfListeOpportunite);
    this.sharedService.valueOfListeOpportuniteIsModified.subscribe(valueOfListeOpportuniteIsModified => this.valueOfListeOpportuniteIsModified = valueOfListeOpportuniteIsModified);

    this.sharedService.valueOfListeCertification.subscribe(valueOfListeCertification => this.valueOfListeCertification = valueOfListeCertification);
    this.sharedService.valueOfListeCertificationIsModified.subscribe(valueOfListeCertificationIsModified => this.valueOfListeCertificationIsModified = valueOfListeCertificationIsModified);
  }

  //Afficher tous les candidats : remplissage de la table
  getAllCandidatsController(etat): void {
    this.candidatsService.getAllCandidatsService(etat)
    .subscribe
      (
      res => {this.listeCandidats.data = res;}
      )
  }

  //La liste des candidats qui ont une Technologie au moins dans la liste fournie
  getAllCandidatsByListTechnologiesController(listeTechnologies): void {
    this.candidatsService.getAllCandidatsByListTechnologiesService(listeTechnologies)
    .subscribe
      (
      res => {this.listeCandidats.data = res;}
      )
  }

  //Modifier un candidat
  editCandidatController() {
      this.candidatsService.editCandidatService(this.candidat)
      .subscribe
        (
        res => 
        { 
          if(res != null)
          {
            this.getAllCandidatsController(this.candidat.etatCandidat);
            this.utilService.openSnackBar("Candidat modifié", "OK");
          }
        }
        )
  }

  //Fonction qui gére le Slide Toggle
  editEtatCandidat(id, etat){

    this.candidat.id=id;
    
    if(etat ==='True') //Candidat dèja Actif
    {
      this.candidat.etatCandidat=Etat.False;
      this.candidatsService.editEtatCandidatService(this.candidat)
      .subscribe
        (
          res => 
          {
            this.getAllCandidatsController("True");
            this.utilService.openSnackBar("Candidat désactivé", "OK");
          }
        )
    }
    else //Candidat dèja Inactif
    {
      this.candidat.etatCandidat=Etat.True;
      this.candidatsService.editEtatCandidatService(this.candidat)
      .subscribe
        (
          res => 
          {
            this.getAllCandidatsController("False");
            this.utilService.openSnackBar("Candidat activé", "OK");
          }
        )
    }
  }

  //Supprimer un candidat
  deleteCandidatController(id) {
      this.candidatsService.deleteCandidatService(id)
      .subscribe
        (
        res => 
        {
          this.getAllCandidatsController(this.etatCandidat); 
          this.utilService.openSnackBar("Candidat supprimé", "OK");
        }
        )
  }

  //Filtrer par état du Candidat : Actif / Inactif
  filtrerParEtat(valeurEtat) {

    this.getAllCandidatsController(valeurEtat.value);

    if(valeurEtat.value ==='True' && this.etatCandidat ==="True" || valeurEtat.value ==='False' && this.etatCandidat ==="True") //Valeur de la liste déroulante : Candidats activés
    {
      this.etatCandidat = "True";
    }
    else if (valeurEtat.value ==='True' && this.etatCandidat ==="False" || valeurEtat.value ==='False' && this.etatCandidat ==="False")//Valeur de la liste déroulante : Candidats désactivés
    {
      this.etatCandidat = "False";
    }
  }

  //Recherche filtrée sur la table
  filtrerTable(filterValue: string) {
      this.listeCandidats.filter = filterValue.trim().toLowerCase();
  }

  //Ouvre le pop-up pour modifier un candidat
  openDialogEditCandidat(
    id, 
    identite, 
    telephone, 
    email, 
    posteOccupe, 
    descriptionDetaillee, 
    urlPhoto, 
    etatCandidat, 
    entreprise, 
    salaireActuel,
    pretentionSalariale,
    situationFamiliale,
    nombreEnfants,
    adresse,
    dateDeNaissance,
    niveauEnFrancais,
    niveauEnAnglais,
    noteGlobale,
    disponibilite,
    dateDemarrageCarriere,
    dateEpuisementPasseport,

    diplome,
    visa,
    curriculum,

    listeTechnologies,
    listeOpportunites,
    listeCertifications
 
    ): void {
      //Objet pour configurer la modale
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.hasBackdrop=true;
      dialogConfig.closeOnNavigation = true;

      let nombreEnfantsGaranti = "";
      if(nombreEnfants != null){
        nombreEnfantsGaranti = nombreEnfants;
      }


      if(diplome.dateObtentionDiplome != null){
        diplome.dateObtentionDiplome = this.datePipe.transform(diplome.dateObtentionDiplome, 'yyyy-MM-dd');
      }

      if(visa.dateDebutVisa != null){
        visa.dateDebutVisa = this.datePipe.transform(visa.dateDebutVisa, 'yyyy-MM-dd');
      }

      if(visa.dateFinVisa != null){
        visa.dateFinVisa = this.datePipe.transform(visa.dateFinVisa, 'yyyy-MM-dd');
      }

  
      //Objet pour déclencher l'ouverture de la modale
      const dialogRef = this.dialog.open(FormEditCandidatsComponent, {
        width: '1050px',
        height: '650px',
        data: {
          id: id, 
          identite: identite,
          telephone : telephone,
          email : email,
          posteOccupe : posteOccupe,
          descriptionDetaillee : descriptionDetaillee,
          urlPhoto : urlPhoto,
          etatCandidat : etatCandidat,
          entreprise : entreprise,
          
          //Informations spécifiques
          salaireActuel: salaireActuel,
          pretentionSalariale: pretentionSalariale,
          situationFamiliale: situationFamiliale,
          //Pour éviter qu'il soit null
          nombreEnfants: nombreEnfantsGaranti,
          adresse: adresse,
          dateDeNaissance: this.datePipe.transform(dateDeNaissance, 'yyyy-MM-dd'),
          niveauEnFrancais: niveauEnFrancais,
          niveauEnAnglais: niveauEnAnglais,
          noteGlobale: noteGlobale,
          disponibilite: disponibilite,
          dateDemarrageCarriere: this.datePipe.transform(dateDemarrageCarriere, 'yyyy-MM-dd'),
          dateEpuisementPasseport: this.datePipe.transform(dateEpuisementPasseport, 'yyyy-MM-dd'),

          //Diplôme
          diplome :diplome,

          //Visa
          visa : visa,

          //Curriculum
          curriculum : curriculum,

          //Les 3 listes 
          listeTechnologies : listeTechnologies,
          listeOpportunites : listeOpportunites,
          listeCertifications : listeCertifications
        }
      });
      
      //Fonction qui s'éxècute quand je ferme la modale
      dialogRef.afterClosed().subscribe(result => {
        if(result){
            this.candidat.id=result.id;
            this.candidat.identite=result.identite;
            this.candidat.telephone=result.telephone;
            this.candidat.email=result.email;
            this.candidat.posteOccupe=result.posteOccupe;
            this.candidat.descriptionDetaillee=result.descriptionDetaillee;
            this.candidat.urlPhoto=result.urlPhoto;
            this.candidat.etatCandidat=result.etatCandidat;

            if(result.entreprise != null)
            {
              this.candidat.entreprise.idEntreprise=result.entreprise.idEntreprise;
            }

            //Informations spécifiques
            this.candidat.salaireActuel = result.salaireActuel,
            this.candidat.pretentionSalariale = result.pretentionSalariale,
            this.candidat.situationFamiliale = result.situationFamiliale,
            this.candidat.nombreEnfants = result.nombreEnfants,
            this.candidat.adresse = result.adresse,
            this.candidat.dateDeNaissance = result.dateDeNaissance,
            this.candidat.niveauEnFrancais = result.niveauEnFrancais,
            this.candidat.niveauEnAnglais = result.niveauEnAnglais,
            this.candidat.noteGlobale = result.noteGlobale,
            this.candidat.disponibilite = result.disponibilite,
            this.candidat.dateDemarrageCarriere = result.dateDemarrageCarriere,
            this.candidat.dateEpuisementPasseport = result.dateEpuisementPasseport;

            //Diplôme
            if(result.diplome != null)
            {
              this.candidat.diplome.typeDiplome = result.diplome.typeDiplome;
              this.candidat.diplome.ecole = result.diplome.ecole;
              this.candidat.diplome.dateObtentionDiplome  = result.diplome.dateObtentionDiplome;
            }
            
            //Visa
            if(result.visa != null)
            {
              this.candidat.visa.typeVisa = result.visa.typeVisa;
              this.candidat.visa.dateDebutVisa = result.visa.dateDebutVisa;
              this.candidat.visa.dateFinVisa = result.visa.dateFinVisa;
            }
 
            //listeTechnologies : J'utilise une variable partagée via le shared-data service
            //detection du changement sur la liste
            if(this.valueOfListeTechnologie != null && this.valueOfListeTechnologieIsModified === true)
            {
              for(let i in this.valueOfListeTechnologie.source.selectedOptions.selected)
              {
                let technologie = new Technologie(this.valueOfListeTechnologie.source.selectedOptions.selected[i].value.id,this.valueOfListeTechnologie.source.selectedOptions.selected[i].value.nomTechnologie, null);
                this.listeTechnologiesFinale.push(technologie);
              }
              this.candidat.listeTechnologies = this.listeTechnologiesFinale;
              this.sharedService.changeListeTechnologieIsModified(false);
            }
            //Cas ou y a pas de changement sur la liste des technologies
            else
            {
              this.candidat.listeTechnologies = result.listeTechnologies;
            }

            //Vidage du Array
            this.listeTechnologiesFinale = [];


            //listeOpportunites : J'utilise une variable partagée via le shared-data service
            //detection du changement sur la liste
            if(this.valueOfListeOpportunite != null && this.valueOfListeOpportuniteIsModified === true)
            {
              for(let j in this.valueOfListeOpportunite.source.selectedOptions.selected)
              {
                let opportunite = new Opportunite(this.valueOfListeOpportunite.source.selectedOptions.selected[j].value.id, this.valueOfListeOpportunite.source.selectedOptions.selected[j].value.titreOpportunite);
                this.listeOpportunitesFinale.push(opportunite);
                
              }
              this.candidat.listeOpportunites = this.listeOpportunitesFinale;
              this.sharedService.changeListeOpportuniteIsModified(false);
            }
            //Cas ou y a pas de changement sur la liste des opportunités
            else
            {
              this.candidat.listeOpportunites = result.listeOpportunites;
            }

            //Vidage du Array
            this.listeOpportunitesFinale = [];

            //listeCertifications : J'utilise une variable partagée via le shared-data service
            //detection du changement sur la liste
            if(this.valueOfListeCertification != null && this.valueOfListeCertificationIsModified === true)
            {
              for(let k in this.valueOfListeCertification.source.selectedOptions.selected)
              {
                let certification = new Certification(this.valueOfListeCertification.source.selectedOptions.selected[k].value.id, this.valueOfListeCertification.source.selectedOptions.selected[k].value.nomCertification, null);
                this.listeCertificationsFinale.push(certification);
                
              }
              this.candidat.listeCertifications=this.listeCertificationsFinale;
              this.sharedService.changeListeCertificationIsModified(false);
            }
            //Cas ou y a pas de changement sur la liste des certifications
            else
            {
              this.candidat.listeCertifications=result.listeCertifications;
            }

            //Vidage du Array
            this.listeCertificationsFinale = [];

            //Finalement on fait l'appel au webservice
            this.editCandidatController();
            }
      });
  }

  //Ouvre le pop-up pour supprimer un candidat
  openDialogDeleteCandidat(id): void {
    //Objet pour configurer la modale
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.hasBackdrop=true;
    dialogConfig.closeOnNavigation = true;

    //Objet pour déclencher l'ouverture de la modale
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      width: '450px',
      height: '180px',
      data: {
        id: id,
        texte : "Attention : ce candidat sera supprimé définitivement."
      }
    });

    //Fonction qui s'éxècute quand je ferme la modale
    dialogRef.afterClosed().subscribe(result => {
      if(result)
      {
          this.deleteCandidatController(result.id);
      }
    });
  }

  //Ouvre le pop-up pour afficher un candidat
  openDialogShowCandidat(
      id, 
      identite, 
      telephone, 
      email, 
      posteOccupe, 
      descriptionDetaillee, 
      urlPhoto, 
      etatCandidat, 
      entreprise, 
      salaireActuel,
      pretentionSalariale,
      situationFamiliale,
      nombreEnfants,
      adresse,
      dateDeNaissance,
      niveauEnFrancais,
      niveauEnAnglais,
      noteGlobale,
      disponibilite,
      dateDemarrageCarriere,
      dateEpuisementPasseport,
  
      diplome,
      visa,
      curriculum,

      listeTechnologies,
      listeOpportunites,
      listeCertifications
   
      ): void {
        //Objet pour configurer la modale
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.hasBackdrop=true;
        dialogConfig.closeOnNavigation = true;
  
        let nombreEnfantsGaranti = "";
        if(nombreEnfants != null){
          nombreEnfantsGaranti = nombreEnfants;
        }
  
  
        if(diplome.dateObtentionDiplome != null){
          diplome.dateObtentionDiplome = this.datePipe.transform(diplome.dateObtentionDiplome, 'yyyy-MM-dd');
        }
  
        if(visa.dateDebutVisa != null){
          visa.dateDebutVisa = this.datePipe.transform(visa.dateDebutVisa, 'yyyy-MM-dd');
        }
  
        if(visa.dateFinVisa != null){
          visa.dateFinVisa = this.datePipe.transform(visa.dateFinVisa, 'yyyy-MM-dd');
        }
  
        
        //Objet pour déclencher l'ouverture de la modale
        const dialogRef = this.dialog.open(ShowCandidatComponent, {
          width: '1050px',
          height: '650px',
          data: {
            id: id, 
            identite: identite,
            telephone : telephone,
            email : email,
            posteOccupe : posteOccupe,
            descriptionDetaillee : descriptionDetaillee,
            urlPhoto : urlPhoto,
            etatCandidat : etatCandidat,
            entreprise : entreprise,
            
            //Informations spécifiques
            salaireActuel: salaireActuel,
            pretentionSalariale: pretentionSalariale,
            situationFamiliale: situationFamiliale,
            //Pour éviter qu'il soit null
            nombreEnfants: nombreEnfantsGaranti,
            adresse: adresse,
            dateDeNaissance: this.datePipe.transform(dateDeNaissance, 'yyyy-MM-dd'),
            niveauEnFrancais: niveauEnFrancais,
            niveauEnAnglais: niveauEnAnglais,
            noteGlobale: noteGlobale,
            disponibilite: disponibilite,
            dateDemarrageCarriere: this.datePipe.transform(dateDemarrageCarriere, 'yyyy-MM-dd'),
            dateEpuisementPasseport: this.datePipe.transform(dateEpuisementPasseport, 'yyyy-MM-dd'),
  
            //Diplôme
            diplome :diplome,
  
            //Visa
            visa : visa,
  
            //Curriculum
            curriculum : curriculum,

            //Les 3 listes 
            listeTechnologies : listeTechnologies,
            listeOpportunites : listeOpportunites,
            listeCertifications : listeCertifications
          }
        });
  }  

}
