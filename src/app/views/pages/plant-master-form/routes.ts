import { Routes } from '@angular/router';


export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./plant-master-form.component').then(m => m.PlantMasterFormComponent),
    data: {
      title: `plantmaster`
    }
  }
];

