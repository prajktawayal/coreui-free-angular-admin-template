import { Component, computed, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  ContainerComponent, RowComponent, ColComponent, 
  HeaderModule, ButtonDirective, TemplateIdDirective, WidgetStatFComponent, 
  WidgetStatBComponent, ProgressComponent, WidgetStatAComponent 
} from '@coreui/angular';
import { IconDirective } from '@coreui/icons-angular';
import { freeSet } from '@coreui/icons';
import { GridModule } from '@coreui/angular';
import { DropdownModule, ProgressModule, SharedModule } from '@coreui/angular';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import { ChartData } from 'chart.js';
import { MainDashboardService } from 'src/app/services/maindashboard.service';
import { Observable } from 'rxjs';

// ✅ Define an interface for the API response
interface PlantMasterRecord {
  plant_name: string;
}

@Component({
  selector: 'app-graph',
  standalone: true,
  imports: [
    CommonModule, ContainerComponent, RowComponent, ColComponent, 
    HeaderModule, ButtonDirective, IconDirective, GridModule,
    WidgetStatFComponent, TemplateIdDirective, DropdownModule, ProgressModule, SharedModule, 
    WidgetStatBComponent, ProgressComponent, WidgetStatAComponent, ChartjsComponent
  ],
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class graphComponent implements OnInit {

  plantNames: string[] = [];

  constructor(private mainDashboardService: MainDashboardService) { }

  ngOnInit(): void {
   this. getData();
  }

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
  chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { grid: { display: false } },
      y: { grid: { color: "rgba(200, 200, 200, 0.2)" }, beginAtZero: false },
    },
    plugins: { legend: { display: true } }
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
  chartOptions1 = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } }
  };
  getData() {
    console.log("Fetching plant names...");
  
    this.mainDashboardService.fetchPlantNames().subscribe({
      next: (plantNames: string[]) => {
        this.plantNames = plantNames;
        console.log('Fetched Plant Names:', this.plantNames);
      },
      error: (err) => {
        console.error('Error fetching plant names:', err);
      }
    });

    
  }
}
