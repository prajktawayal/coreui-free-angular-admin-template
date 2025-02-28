import { Routes } from '@angular/router';


export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./line-master.component').then(m=>m.LineMasterComponent),
    data: {
      title: `linemaster`
    }
  }
];

