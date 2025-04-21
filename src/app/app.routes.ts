import { Routes } from '@angular/router';
import { SaleListPage } from './sales/pages/list/sale-list.page';
import { SaleFormPage } from './sales/pages/form/sale-form.page';
import { SaleDetailsPage } from './sales/pages/details/sale-details.page'

export const routes: Routes = [
    { path: '', redirectTo: 'sales', pathMatch: 'full' },
    { path: 'sales', component: SaleListPage },
    { path: 'sales/new', component: SaleFormPage },
    { path: 'sales/edit/:id', component: SaleFormPage },
    { path: 'sales/details/:id', component: SaleDetailsPage }
  ];