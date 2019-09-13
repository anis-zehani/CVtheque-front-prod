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
  datalsTechnologiesByOpportunites: number[];

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
    }
  };
  public pieChartLabels: Label[] = ['Angular', 'Java', 'Docker', 'Autres'];
  public pieChartData: number[] = [300, 200, 200, 500];

  public pieChartType: ChartType = 'doughnut';
  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: ['#202124', '#f7c341', '#f05841'],
    },
  ];

  constructor(private technologiesService: TechnologiesService) { }

  ngOnInit() {
    this.getCandidatsByTechnologiesController();
    this.getOpportunitesByTechnologiesController();
  }

  getCandidatsByTechnologiesController() {
    this.technologiesService.getCandidatsByTechnologiesService()
    .subscribe
      (
      res1 => {
        console.log(res1);
      }
      );
  }

  getOpportunitesByTechnologiesController() {
    this.technologiesService.getOpportunitesByTechnologiesService()
    .subscribe
      (
      res2 => {
        console.log(res2);
      }
      );
  }

  technologieVsCandidats() {
    this.pieChartLabels = ['Angular', 'Java', 'Docker', 'Autres'];
    this.pieChartData = [300, 200, 200, 500];
  }

  technologieVsOpportunites() {
    this.pieChartLabels = ['Angular', 'Java', 'Docker', 'Autres'];
    this.pieChartData = [1, 2, 3, 4];
  }
}
