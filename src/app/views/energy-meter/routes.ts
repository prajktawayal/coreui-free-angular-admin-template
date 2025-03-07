import { Routes } from '@angular/router';



export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./energy-meter.component').then(m => m.EnergyMeterComponent),
    data: {
      title: `Energy`
    }
  }
];
