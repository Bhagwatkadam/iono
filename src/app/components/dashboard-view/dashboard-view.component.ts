import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, SingleDataSet } from 'ng2-charts'
import { GrafanaService } from 'src/app/services/grafana.service';

@Component({
  selector: 'app-dashboard-view',
  templateUrl: './dashboard-view.component.html',
  styleUrls: ['./dashboard-view.component.css']
})
export class DashboardViewComponent implements OnInit {

  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = ['Hyderabad', 'Chenni', 'Bangolore', 'Mumbai', 'Orissa', 'Delhi', 'Andra'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Active' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Inactive' },
    { data: [18, 38, 50, 29, 46, 37, 70], label: 'Progress' }
  ];


  // Pie
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'right',
    },
  };
  public pieChartLabels: Label[] = [['Devices'], ['Cartridges'], 'Scan Devices'];
  public pieChartData: SingleDataSet = [300, 500, 100];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  constructor(private grafanaService: GrafanaService) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();

  }

  ngOnInit() {
    this.onActivate(event);
    this.grafanaService.postGafana().subscribe(data => {console.log(data)});
  }
  onActivate(event) {
    window.scroll(0, 0);
  }
}


