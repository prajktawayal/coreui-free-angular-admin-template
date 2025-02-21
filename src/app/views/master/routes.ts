import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./master.component').then(m => m.MasterComponent),
        data: {
          title: $localize`Master`
        }
      }
];