import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

import { TechnologiesService } from '../../../@Services/technologies.service';
import { Technologie } from '../../../@Models/technologie';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {

  labelsTechnologiesByCandidats: string[];
  dataTechnologiesByCandidats: number[];

  labelsTechnologiesByOpportunites: string[];
  dataTechnologiesByOpportunites: number[];

  sumCandidatsLies = 0;
  sumOpportunitesLiees = 0;

  // Pie
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
      backgroundColor: ['#a4c215', '#f7c341', '#4390b4', '#f48041', '#f88801', '#dfdace'],
    },
  ];

  constructor(private technologiesService: TechnologiesService) { }

  ngOnInit() {
    this.getCandidatsByTechnologiesController();
    this.getOpportunitesByTechnologiesController();
    this.getSumCandiatsAndOpportunitesByTechnologiesController();
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

  getSumCandiatsAndOpportunitesByTechnologiesController() {
    this.technologiesService.getSumCandiatsAndOpportunitesByTechnologiesService()
    .subscribe
      (
      res => {
      this.sumCandidatsLies = res.get('sumCandidatsLies');
      this.sumOpportunitesLiees = res.get('sumOpportunitesLiees');
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
      listeToFill.push('Autres');
    }
    return listeToFill;
  }

  nombreCandidatsLiesFromObjectToArray(objet: Technologie[]): any[] {
    const listeToFill: any[] = [];
    if (objet) {
      objet.forEach((value) => {
        listeToFill.push(value.statNombreCandidatsLies);
      });
    }
    listeToFill.push(this.sumCandidatsLies);
    return listeToFill;
  }

  nombreOpportunitesLieesFromObjectToArray(objet: Technologie[]): any[] {
    const listeToFill: any[] = [];
    if (objet) {
      objet.forEach((value) => {
        listeToFill.push(value.statNombreOpportunitesLiees);
      });
    }
    listeToFill.push(this.sumOpportunitesLiees);
    return listeToFill;
  }
}
