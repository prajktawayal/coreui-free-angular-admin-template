import { Routes } from '@angular/router';


export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./factory-master.component').then(m => m.factoryMasterComponent),
    data: {
      title: `factorymaster`
    }
  }
];

