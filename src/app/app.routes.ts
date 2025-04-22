import { Routes } from '@angular/router';
import { ShellComponent } from './layout/shell/shell.component';

export const routes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./home/pages/home.page').then(m => m.HomePage)
      },
      {
        path: 'sales',
        loadComponent: () => import('./sales/pages//list/sale-list.page').then(m => m.SaleListPage)
      },
      {
        path: 'sales/new',
        loadComponent: () => import('./sales/pages/form/sale-form.page').then(m => m.SaleFormPage)
      },
      {
        path: 'sales/edit/:id',
        loadComponent: () => import('./sales/pages/form/sale-form.page').then(m => m.SaleFormPage)
      },
      {
        path: 'sales/details/:id',
        loadComponent: () => import('./sales/pages/details/sale-details.page').then(m => m.SaleDetailsPage)
      }
    ]
  },
  { path: '**', redirectTo: '' }
];

