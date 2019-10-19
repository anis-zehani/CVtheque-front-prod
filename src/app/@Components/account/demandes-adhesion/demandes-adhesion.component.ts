import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator} from '@angular/material/paginator';
import { MatSort} from '@angular/material/sort';
import { PartenaireTemporaire } from 'src/app/@Models/partenaire-temporaire';
import { PartenairesTemporairesService } from 'src/app/@Services/partenaires-temporaires.service';

@Component({
  selector: 'app-demandes-adhesion',
  templateUrl: './demandes-adhesion.component.html',
  styleUrls: ['./demandes-adhesion.component.css']
})
export class DemandesAdhesionComponent implements OnInit {

  @Input() listePartenairesTemporaires = new MatTableDataSource<PartenaireTemporaire>();

  displayedColumns: string[];

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(private partenairesTemporairesService: PartenairesTemporairesService) { }

  ngOnInit() {
    this.getAllPartenairesTemporairesController();
    this.displayedColumns = ['dateAjout', 'parametres', 'contacts', 'details', 'more'];
  }

    // Afficher toutes les technologies : remplissage de la table
  getAllPartenairesTemporairesController(): void {
    this.partenairesTemporairesService.getAllPartenairesTemporairesService()
    .subscribe
      (
      res => {
        this.listePartenairesTemporaires.data = res;
        this.listePartenairesTemporaires.paginator = this.paginator;
        this.listePartenairesTemporaires.sort = this.sort;
      }
      );
  }

  // Recherche filtrée sur la table
  filtrerTable(filterValue: string) {
      this.listePartenairesTemporaires.filter = filterValue.trim().toLowerCase();
  }

  openDialogActivationPartenaires(email) {

  }

}
