import { Routes } from '@angular/router';



export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./graph.component').then(m => m.graphcompoenent),
    data: {
      title: `Graph`
    }
  }
];
