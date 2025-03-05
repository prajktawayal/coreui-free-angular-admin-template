import { Component, computed, signal, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  ContainerComponent, RowComponent, ColComponent, CardComponent, CardBodyComponent, CardHeaderComponent, 
  HeaderModule, ButtonDirective, TemplateIdDirective, WidgetStatFComponent, WidgetStatCComponent, 
  WidgetStatBComponent, ProgressComponent, WidgetStatAComponent, ThemeDirective 
} from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { freeSet } from '@coreui/icons';
import { GridModule } from '@coreui/angular';
import { DropdownModule, ProgressModule, SharedModule } from '@coreui/angular';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { ChartData } from 'chart.js';

@Component({
  selector: 'app-graph',
  standalone: true,
  imports: [
    CommonModule, ContainerComponent, RowComponent, ColComponent, 
     HeaderModule, ButtonDirective, IconDirective, GridModule, 
     TemplateIdDirective, DropdownModule, ProgressModule, SharedModule, 
     WidgetStatBComponent, ProgressComponent, WidgetStatAComponent, 
     ChartjsComponent
  ],
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class graphcompoenent  {
  icons = freeSet;
  currentDateTime: string = new Date().toLocaleString();
  value = signal<number>(75.9);
  valuePercent = computed(() => `${this.value()}%`);

  data: ChartData = {
    labels: ['Meals', 'Events', 'Reactjs', 'C#'],
    datasets: [
      {
        data: [30, 40, 30, 20],
        backgroundColor: ['#ff0000', '#00ff00', '#0000ff', '#929e97'],
      },
    ]
  };

  readonly #destroyRef = inject(DestroyRef);
  #timeoutID: ReturnType<typeof setTimeout> | undefined = undefined;

  constructor() {
    setInterval(() => {
      this.currentDateTime = new Date().toLocaleString();
    }, 1000); // Update every second

    this.#destroyRef.onDestroy(() => {
      if (this.#timeoutID) {
        clearTimeout(this.#timeoutID);
      }
    });
  }

  data1: ChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July','Augest','September','Novenmber','December'],
    datasets: [
      {
        label: 'My First dataset',
        backgroundColor: 'rgba(10, 1, 1, 0.2)',
        borderColor: 'rgb(28, 12, 243)',
        pointBackgroundColor: 'rgb(245, 12, 156)',
        pointBorderColor: '#fff',
        data: [10, 20, 12, 25, 10]
      },
      {
        label: 'My Second dataset',
        backgroundColor: 'rgba(8, 1, 5, 0.2)',
        borderColor: 'rgb(53, 230, 9)',
        pointBackgroundColor: 'rgb(214, 9, 9)',
        pointBorderColor: '#1adaf1',
        data: [12, 28, 29, 10, 25]
      }
    ]
  };

  handleChartRef($chartRef: any) {
    if ($chartRef) {
      console.log('handleChartRef', $chartRef);
      this.#timeoutID = setTimeout(() => {
        this.data?.labels?.push('August');
        this.data?.datasets[0].data.push(30);
        this.data?.datasets[1].data.push(20);
        $chartRef?.update();
        this.#timeoutID = undefined;
      }, 3000);
    }
  }

  voltageData = {
    labels: ['15:04', '15:06', '15:08', '15:10', '15:12', '15:14', '15:16'],
    datasets: [
      {
        label: ' Avarge Voltage',
        data: [220, 225, 223, 222, 224, 221, 23], // Adjust as needed
        borderColor: '#007bff',
        backgroundColor: 'rgba(0, 123, 255, 0.1)',
        fill: true,
        tension: 0.4,  // Smooth curve
      }
    ]
  };
  
  currentData = {
    labels: ['15:04', '15:06', '15:08', '15:10', '15:12', '15:14', '15:16'],
    datasets: [
      {
        label: 'Current Voltage',
        data: [120, 125, 123, 122, 124, 121, 123],// Adjust as needed
        borderColor: '#28a745',
        backgroundColor: 'rgba(40, 167, 69, 0.1)',
        fill: true,
        tension: 0.4,  // Smooth curve
      }
    ]
  };
  chartOptions1 = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } }
  };
  chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { grid: { display: false } },
      y: { grid: { color: "rgba(200, 200, 200, 0.2)" }, beginAtZero: false },
    },
    plugins: { legend: { display: true } }
  };

  
  
}


