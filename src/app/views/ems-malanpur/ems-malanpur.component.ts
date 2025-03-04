import { Component } from '@angular/core';
import { ChartData } from 'chart.js';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { RowComponent, ColComponent, TextColorDirective, CardComponent, CardHeaderComponent, CardBodyComponent, WidgetStatAComponent } from '@coreui/angular';


@Component({
  selector: 'app-ems-malanpur',
  templateUrl: './ems-malanpur.component.html',
  styleUrl: './ems-malanpur.component.scss',
  imports: [RowComponent, ColComponent, TextColorDirective,WidgetStatAComponent, CardComponent, CardHeaderComponent, CardBodyComponent, ChartjsComponent]
  
})
export class EmsMalanpurComponent {
  options = {
    maintainAspectRatio: false
  };

  months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  chartBarData: ChartData = {
    labels: [...this.months].slice(0, 12),
    datasets: [
      {
        label: 'GitHub Commits',
        backgroundColor: '#f87979',
        data: [40, 20, 12, 39, 17, 42, 79,88,99,20,50,40]
      }
    ]
  };


  get randomData() {
    return Math.round(Math.random() * 100);
  }
}
