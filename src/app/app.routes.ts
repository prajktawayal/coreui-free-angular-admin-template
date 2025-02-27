import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layout';
import { EmsMalanpurComponent } from './views/ems-malanpur/ems-malanpur.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'master',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'master',
        loadChildren: () => import('./views/master/routes').then((m) => m.routes)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/routes').then((m) => m.routes)
      },
      
      {
        path: 'theme',
        loadChildren: () => import('./views/theme/routes').then((m) => m.routes)
      },
      {
        path: 'base',
        loadChildren: () => import('./views/base/routes').then((m) => m.routes)
      },
      {
        path: 'buttons',
        loadChildren: () => import('./views/buttons/routes').then((m) => m.routes)
      },
      {
        path: 'forms',
        loadChildren: () => import('./views/forms/routes').then((m) => m.routes)
      },
      {
        path: 'icons',
        loadChildren: () => import('./views/icons/routes').then((m) => m.routes)
      },
      {
        path: 'notifications',
        loadChildren: () => import('./views/notifications/routes').then((m) => m.routes)
      },
      {
        path: 'widgets',
        loadChildren: () => import('./views/widgets/routes').then((m) => m.routes)
      },
      {
        path: 'charts',
        loadChildren: () => import('./views/charts/routes').then((m) => m.routes)
      },
      {
        path: 'pages',
        loadChildren: () => import('./views/pages/routes').then((m) => m.routes)
      },
      {
        path: 'line-master',
        loadChildren: () => import('./views/pages/line-master/routes').then((m) => m.routes)
      },
      {

        path: 'app-ems-malanpur',  // Add this route inside children if it should be under DefaultLayoutComponent
        component: EmsMalanpurComponent,
        data: { title: 'EMS Malanpur' }
      },
     
     {
        path: 'plant-master',
        loadChildren:()=>import('./views/pages/plant-master/routes').then((m) => m.routes)
      },
      {
        path: 'factory-master',
        loadChildren:()=>import('./views/pages/factory-master/routes').then((m) => m.routes)
      },
      {
        path: 'plant-master-form',
        loadChildren:()=>import('./views/pages/plant-master-form/routes').then((m) => m.routes)
      }
    ]
  },
  {
    path: '404',
    loadComponent: () => import('./views/pages/page404/page404.component').then(m => m.Page404Component),
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    loadComponent: () => import('./views/pages/page500/page500.component').then(m => m.Page500Component),
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    loadComponent: () => import('./views/pages/login/login.component').then(m => m.LoginComponent),
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    loadComponent: () => import('./views/pages/register/register.component').then(m => m.RegisterComponent),
    data: {
      title: 'Register Page'
    }
    
  },
  {
    path: 'app-ems-malanpur', // Add this route outside children if it's an independent page
    component: EmsMalanpurComponent,
    data: { title: 'EMS Malanpur' }
  },
  { path: '**', redirectTo: 'dashboard' }
];
