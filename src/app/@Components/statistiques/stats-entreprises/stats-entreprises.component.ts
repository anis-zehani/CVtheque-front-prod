import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

import { EntreprisesService } from '../../../@Services/entreprises.service';
import { Entreprise } from '../../../@Models/entreprise';

@Component({
  selector: 'app-stats-entreprises',
  templateUrl: './stats-entreprises.component.html',
  styleUrls: ['./stats-entreprises.component.css']
})
export class StatsEntreprisesComponent implements OnInit {

  labelsEntreprisesByCandidats: string[];
  dataEntreprisesByCandidats: number[];

  labelsEntreprisesByPartenaires: string[];
  dataEntreprisesByPartenaires: number[];

  sumCandidatsLies = 0;
  sumPartenairesLies = 0;

  // Pie
  public pieChartOptions: ChartOptions = {
    responsive: true,
    aspectRatio: 1.2,
    legend: {
      position: 'top',
    },
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels[ctx.dataIndex];
          return label;
        },
      },
    },
    title: {
      display: true,
      text: 'Tranches des Candidats & des Partenaires par les TOP 5 Entreprises'
    },
  };

  public pieChartLabels: Label[] = [];
  public pieChartData: number[] = [];
  public pieChartType: ChartType = 'doughnut';
  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: ['#39CCCC', '#FFDC00', '#FF4136', '#3D9970', '#001f3f', '#FF851B']
    },
  ];

  constructor(private technologiesService: EntreprisesService) { }

  ngOnInit() {
    this.getSumCandiatsAndPartenairesByEntreprisesController();
    this.getCandidatsByEntreprisesController();
    this.getPartenairesByEntreprisesController();
  }

  getCandidatsByEntreprisesController() {
    this.technologiesService.getCandidatsByEntreprisesService()
    .subscribe
      (
      res => {
        this.labelsEntreprisesByCandidats = this.nomEntrepriseFromObjectToArray(res);
        this.dataEntreprisesByCandidats = this.nombreCandidatsLiesFromObjectToArray(res);

        this.pieChartLabels = this.labelsEntreprisesByCandidats;
        this.pieChartData = this.dataEntreprisesByCandidats;
      }
      );
  }

  getPartenairesByEntreprisesController() {
    this.technologiesService.getPartenairesByEntreprisesService()
    .subscribe
      (
      res => {
        this.labelsEntreprisesByPartenaires = this.nomEntrepriseFromObjectToArray(res);
        this.dataEntreprisesByPartenaires = this.nombrePartenairesLiesFromObjectToArray(res);
      }
      );
  }

  getSumCandiatsAndPartenairesByEntreprisesController() {
    this.technologiesService.getSumCandiatsAndPartenairesByEntreprisesService()
    .subscribe
      (
      res => {
      for (const [key, value] of Object.entries(res)) {
          if (key === 'sumCandidatsLies') {
            this.sumCandidatsLies = value;
          }
          if (key === 'sumPartenairesLies') {
            this.sumPartenairesLies = value;
          }
      }
      }
      );
  }

  entrepriseVsCandidats() {
    this.pieChartLabels = this.labelsEntreprisesByCandidats;
    this.pieChartData = this.dataEntreprisesByCandidats;
  }

  entrepriseVsPartenaires() {
    this.pieChartLabels = this.labelsEntreprisesByPartenaires;
    this.pieChartData = this.dataEntreprisesByPartenaires;
  }

  nomEntrepriseFromObjectToArray(objet: Entreprise[]): any[] {
    const listeToFill: any[] = [];
    if (objet) {
      objet.forEach((value) => {
        listeToFill.push(value.nomEntreprise);
      });
      listeToFill.push('Autres entreprises');
    }
    return listeToFill;
  }

  nombreCandidatsLiesFromObjectToArray(objet: Entreprise[]): any[] {
    const listeToFill: any[] = [];
    let sumTop5 = 0;
    if (objet) {
      objet.forEach((value) => {
        listeToFill.push(value.statNombreCandidatsLies);
        sumTop5 += value.statNombreCandidatsLies;
      });
    }
    listeToFill.push(this.sumCandidatsLies - sumTop5);
    return listeToFill;
  }

  nombrePartenairesLiesFromObjectToArray(objet: Entreprise[]): any[] {
    const listeToFill: any[] = [];
    let sumTop5 = 0;
    if (objet) {
      objet.forEach((value) => {
        listeToFill.push(value.statNombrePartenairesLies);
        sumTop5 += value.statNombrePartenairesLies;
      });
    }
    listeToFill.push(this.sumPartenairesLies - sumTop5);
    return listeToFill;
  }
}
