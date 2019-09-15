import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';

import { ChiffresClesService } from '../../../@Services/chiffres-cles.service';

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
      text: ''
    },
  };

  public pieChartLabels: Label[] = [];
  public pieChartData: number[] = [];
  public pieChartType: ChartType = 'polarArea';
  public pieChartLegend = true;
  public pieChartPlugins = [pluginDataLabels];
  public pieChartColors = [
    {
      backgroundColor: ['#d4b3ee', '#edeeb3', '#b3e8ee', '#f3db9e', '#9ff8b2', '#dfdace'],
    },
  ];

  constructor(private chiffresClesService: ChiffresClesService) { }

  ngOnInit() {
    this.getAllChiffresClesController();
  }

  getAllChiffresClesController() {
    this.chiffresClesService.getAllChiffresClesService()
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
