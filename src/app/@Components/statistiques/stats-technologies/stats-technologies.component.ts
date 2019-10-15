import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

import { TechnologiesService } from '../../../@Services/technologies.service';
import { Technologie } from '../../../@Models/technologie';

@Component({
  selector: 'app-stats-technologies',
  templateUrl: './stats-technologies.component.html',
  styleUrls: ['./stats-technologies.component.css']
})
export class StatsTechnologiesComponent implements OnInit {

  labelsTechnologiesByCandidats: string[];
  dataTechnologiesByCandidats: number[];

  labelsTechnologiesByOpportunites: string[];
  dataTechnologiesByOpportunites: number[];

  sumCandidatsLies = 0;
  sumOpportunitesLiees = 0;

  // Doughnut
  public pieChartOptions: ChartOptions = {
    responsive: true,
    aspectRatio: 1.2,
    legend: {
      position: 'left',
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
      text: 'Tranches des Candidats & des Opportunités par les TOP 5 Technologies'
    },
  };

  public pieChartLabels: Label[] = [];
  public pieChartData: number[] = [];
  public pieChartType: ChartType = 'doughnut';
  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
       backgroundColor: ['#39CCCC', '#FFDC00', '#FF4136', '#7FDBFF', '#FF851B', '#dfdace'],
    },
  ];

  constructor(private technologiesService: TechnologiesService) { }

  ngOnInit() {
    this.getSumCandiatsAndOpportunitesByTechnologiesController();
    this.getCandidatsByTechnologiesController();
    this.getOpportunitesByTechnologiesController();
  }


  getSumCandiatsAndOpportunitesByTechnologiesController() {
    this.technologiesService.getSumCandiatsAndOpportunitesByTechnologiesService()
    .subscribe
      (
      res => {
      for (const [key, value] of Object.entries(res)) {
          if (key === 'sumCandidatsLies') {
            this.sumCandidatsLies = value;
          }
          if (key === 'sumOpportunitesLiees') {
            this.sumOpportunitesLiees = value;
          }
      }
      }
      );
  }


  getCandidatsByTechnologiesController() {
    this.technologiesService.getCandidatsByTechnologiesService()
    .subscribe
      (
      res => {
        this.labelsTechnologiesByCandidats = this.nomTechnologieFromObjectToArray(res);
        this.dataTechnologiesByCandidats = this.nombreCandidatsLiesFromObjectToArray(res);

        this.pieChartLabels = this.labelsTechnologiesByCandidats;
        this.pieChartData = this.dataTechnologiesByCandidats;
      }
      );
  }

  getOpportunitesByTechnologiesController() {
    this.technologiesService.getOpportunitesByTechnologiesService()
    .subscribe
      (
      res => {
        this.labelsTechnologiesByOpportunites = this.nomTechnologieFromObjectToArray(res);
        this.dataTechnologiesByOpportunites = this.nombreOpportunitesLieesFromObjectToArray(res);
      }
      );
  }


  technologieVsCandidats() {
    this.pieChartLabels = this.labelsTechnologiesByCandidats;
    this.pieChartData = this.dataTechnologiesByCandidats;
  }

  technologieVsOpportunites() {
    this.pieChartLabels = this.labelsTechnologiesByOpportunites;
    this.pieChartData = this.dataTechnologiesByOpportunites;
  }

  nomTechnologieFromObjectToArray(objet: Technologie[]): any[] {
    const listeToFill: any[] = [];
    if (objet) {
      objet.forEach((value) => {
        listeToFill.push(value.nomTechnologie);
      });
      listeToFill.push('Autres technologies');
    }
    return listeToFill;
  }

  nombreCandidatsLiesFromObjectToArray(objet: Technologie[]): any[] {
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

  nombreOpportunitesLieesFromObjectToArray(objet: Technologie[]): any[] {
    const listeToFill: any[] = [];
    let sumTop5 = 0;
    if (objet) {
      objet.forEach((value) => {
        listeToFill.push(value.statNombreOpportunitesLiees);
        sumTop5 += value.statNombreOpportunitesLiees;
      });
    }
    listeToFill.push(this.sumOpportunitesLiees - sumTop5);
    return listeToFill;
  }
}
