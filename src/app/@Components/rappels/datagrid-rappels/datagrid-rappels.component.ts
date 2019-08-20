import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource} from '@angular/material/table';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort} from '@angular/material/sort';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';

import { environment } from '../../../../environments/environment';
import { RappelsService } from '../../../@Services/rappels.service';
import { Rappel } from '../../../@Models/rappel';
import { FormEditRappelsComponent } from '../form-edit-rappels/form-edit-rappels.component';
import { DeleteConfirmationComponent } from '../../../@Components/dialogs/delete-confirmation/delete-confirmation.component';
import { UtilService } from '../../../@Util/util.service';
import { Projet } from 'src/app/@Models/projet';
import { SharedDataService } from '../../../@Services/shared-data.service';

@Component({
  providers: [DatePipe],
  selector: 'app-datagrid-rappels',
  templateUrl: './datagrid-rappels.component.html',
  styleUrls: ['./datagrid-rappels.component.css']
})
export class DatagridRappelsComponent implements OnInit {

  //URL du serveur de stockage
  storageUrl = environment.storageUrl;

  @Input() listeRappels = new MatTableDataSource<Rappel>();

  //Envoi l'event pour mettre les listes scroll : inbox/projet : selon le paramètre passé
  @Output() refreshDatagridEvent = new EventEmitter<Event>();

  displayedColumns: string[] = ['icone', 'separation', 'rappel', 'more'];

  rappel : Rappel;
  projet : Projet;
  title = 'Recherche rapide';

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  valueOfRemindMe : boolean;

  constructor(
    private rappelsService: RappelsService, 
    private utilService: UtilService,
    public dialog: MatDialog,
    private datePipe: DatePipe,
    private sharedService: SharedDataService
    )
   { 
    this.rappel = new Rappel();
    this.projet =  new Projet();
    this.rappel.projet = this.projet;
   }

  ngOnInit() {
    this.getAllRappelsController();
    this.listeRappels.paginator = this.paginator;
    this.listeRappels.sort = this.sort;
    this.sharedService.valueOfRemindMe.subscribe(valueOfRemindMe => this.valueOfRemindMe = valueOfRemindMe)
  }

  //Quand je met à jour ou j'ajoute un Rappel, un event est envoyé au parent pour rafraichir ses viewchilds : listes scroll
  refreshDatagridFunction($event){
    this.refreshDatagridEvent.emit($event);
  }

  //Afficher tous les rappels : remplissage de la table (par défaut + inbox)
  getAllRappelsController(): void {
    this.rappelsService.getAllRappelsService()
    .subscribe
      (
      res => 
      {
        this.listeRappels.data = res;
        this.title='Rechercher dans : Inbox';
      }
      )
  }

  //Afficher les rappels de Today
  getAllRappelsByTodayController(): void {
    this.rappelsService.getAllRappelsByTodayService()
    .subscribe
      (
      res => 
      {
        this.listeRappels.data = res;
        this.title='Rechercher dans : Aujourd\'hui';
      }
      )
  } 

  //Afficher les rappels des Next 7 Days
  getAllRappelsByNext7DaysController(): void {
    this.rappelsService.getAllRappelsByNext7DaysService()
    .subscribe
      (
      res => 
      {
        this.listeRappels.data = res;
        this.title='Rechercher dans : Prochains 7 jours';
      }
      )
  }

  //Afficher tous les rappels d'un projet donné
  getAllRappelsByProjetController(idProjet, nomProjet): void {
    this.rappelsService.getAllRappelsByProjetService(idProjet)
    .subscribe
      (
      res => 
      {
        this.listeRappels.data = res;
        this.title = 'Rechercher dans : '+nomProjet;
      }
      )
  }

  //Afficher tous les rappels selon la priorité
  getAllRappelsByPrioriteController(valeurPriorite): void {
    this.rappelsService.getAllRappelsByPrioriteService(valeurPriorite)
    .subscribe
      (
      res => 
      {
        this.listeRappels.data = res;
        this.title='Rechercher dans Priorité : '+valeurPriorite;
        
      }
      )
  }

  //Modifier un rappel
  editRappelController() {
      this.rappelsService.editRappelService(this.rappel)
      .subscribe
        (
        res => 
        { 
          if(res != null)
          {
            this.getAllRappelsController();
            this.utilService.openSnackBar("Rappel modifié", "OK");
          }
        }
        )
  }

  //Supprimer un rappel
  deleteRappelController(id) {
      this.rappelsService.deleteRappelService(id)
      .subscribe
        (
        res => 
        {
          this.getAllRappelsController(); 
          this.utilService.openSnackBar("Rappel supprimé", "OK");

          //Rafraichir la liste des rappels
          this.refreshDatagridFunction('deleteRappel');
        }
        )
  }

  //Recherche filtrée sur la table
  filtrerTable(filterValue: string) {
      this.listeRappels.filter = filterValue.trim().toLowerCase();
  }

  //Filtrer par Priorité : Haute, Normale, Basse
  filtrerParPriorite(event) {

    this.getAllRappelsByPrioriteController(event.value);

  }
  //Ouvre le pop-up pour modifier un rappel
  openDialogEditRappel(id, detailsRappel, dateEcheance, remindMe, priorite, projet, urlFichier, nomFichier): void {
      //Objet pour configurer la modale
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = false;
      dialogConfig.hasBackdrop=true;
      dialogConfig.closeOnNavigation = true;

      //Objet pour déclencher l'ouverture de la modale
      const dialogRef = this.dialog.open(FormEditRappelsComponent, {
        width: '700px',
        height: '450px',
        data: {
          id: id, 
          detailsRappel: detailsRappel,
          dateEcheance : this.datePipe.transform(dateEcheance, 'yyyy-MM-dd'),
          remindMe : remindMe,
          priorite : priorite,
          projet : projet,
          urlFichier : urlFichier,
          nomFichier : nomFichier,
        }
      });
  
      //Fonction qui s'éxècute quand je ferme la modale
      dialogRef.afterClosed().subscribe(result => {
        if(result){
            this.rappel.id=result.id;
            this.rappel.detailsRappel=result.detailsRappel;
            this.rappel.dateEcheance=result.dateEcheance;
            this.rappel.priorite=result.priorite;
            //J'utilise une variable partagée via le shared-data service
            this.rappel.remindMe=this.valueOfRemindMe;
            
            if(result.projet != null)
            {
              this.rappel.projet.id=result.projet.id;
            }

            this.editRappelController();
            //Rafraichir la liste des rappels
            this.refreshDatagridFunction('editRappel');
            }
      });
    }

  //Ouvre le pop-up pour supprimer un rappel
  openDialogDeleteRappel(id): void {
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
        texte : "Attention : ce rappel sera supprimé définitivement."
      }
    });

    //Fonction qui s'éxècute quand je ferme la modale
    dialogRef.afterClosed().subscribe(result => {
      if(result)
      {
          this.deleteRappelController(result.id);
      }
    });
  }
}
