import { Routes } from '@angular/router';


export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./plant-master.component').then(m => m.PlantMasterComponent),
    data: {
      title: `plantmaster`
    }
  }
];

