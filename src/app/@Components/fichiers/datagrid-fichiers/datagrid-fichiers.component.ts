import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatTableDataSource} from '@angular/material/table';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort} from '@angular/material/sort';
import { environment } from '../../../../environments/environment';

import { Fichier } from 'src/app/@Models/fichier';
import { UtilService } from '../../../@Util/util.service';
import { FichiersService } from 'src/app/@Services/fichiers.service';

@Component({
  selector: 'app-datagrid-fichiers',
  templateUrl: './datagrid-fichiers.component.html',
  styleUrls: ['./datagrid-fichiers.component.css']
})
export class DatagridFichiersComponent implements OnInit {

  @Input() listeFichiers = new MatTableDataSource<Fichier>();

  displayedColumns: string[];

  fichier: Fichier;
  role: string;

  // URL du serveur de stockage
  storageUrl = environment.storageUrl;

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(private utilService: UtilService, private fichiersService: FichiersService) { }

  ngOnInit() {
    this.getAllFichiersController();
    this.displayedColumns = ['nomFichier', 'more'];

    // je récupère le rôle pour la restriction d'accès dans le menu
    this.role = this.utilService.getRoleUtilisateurFromToken();
  }

  // Afficher toutes les technologies : remplissage de la table
  getAllFichiersController(): void {
    this.fichiersService.getAllFichiersService()
    .subscribe
      (
      res => {
        this.listeFichiers.data = res;
        this.listeFichiers.paginator = this.paginator;
        this.listeFichiers.sort = this.sort;
      }
      );
  }

  // Recherche filtrée sur la table
  filtrerTable(filterValue: string) {
      this.listeFichiers.filter = filterValue.trim().toLowerCase();
  }

}
