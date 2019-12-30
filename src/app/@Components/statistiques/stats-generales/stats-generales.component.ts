import { Component, OnInit, Input } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

import { StatistiquesService } from '../../../@Services/statistiques.service';

@Component({
  selector: 'app-stats-generales',
  templateUrl: './stats-generales.component.html',
  styleUrls: ['./stats-generales.component.css']
})
export class StatsGeneralesComponent implements OnInit {

  // Polar Area Chart
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
      text: 'Les totaux par catégorie'
    }
  };

  public pieChartLabels: Label[] = [];
  public pieChartData: number[] = [];
  public pieChartType: ChartType = 'doughnut';
  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: ['#39CCCC', '#FFDC00', '#FF4136', '#3D9970', '#001f3f', '#FF851B'],
    },
  ];

  constructor(private statistiquesService: StatistiquesService) { }

  ngOnInit() {
    this.getAllStatistiquesController();
  }

  getAllStatistiquesController() {
    this.statistiquesService.getAllStatistiquesService()
    .subscribe
      (
      res => {
      for (const [key, value] of Object.entries(res)) {

          if (key === 'totalCandidats') {
            this.pieChartLabels.push('Candidats');
            this.pieChartData.push(value);
          }
          if (key === 'totalOpportunites') {
            this.pieChartLabels.push('Opportunités');
            this.pieChartData.push(value);
          }
          if (key === 'totalPartenaires') {
            this.pieChartLabels.push('Partenaires');
            this.pieChartData.push(value);
          }
          if (key === 'totalContacts') {
            this.pieChartLabels.push('Contacts');
            this.pieChartData.push(value);
          }
          if (key === 'totalTechnologies') {
            this.pieChartLabels.push('Technologies');
            this.pieChartData.push(value);
          }
          if (key === 'totalEntreprises') {
            this.pieChartLabels.push('Entreprises');
            this.pieChartData.push(value);
          }
      }
      }
      );
  }
}
