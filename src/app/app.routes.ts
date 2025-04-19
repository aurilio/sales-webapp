import { Routes } from '@angular/router';
import { HomePage } from './home/pages/home.page';
import { SaleListPage } from './sales/pages/list/sale-list.page';

export const routes: Routes = [
    { path: '', component: HomePage },
    { path: 'sales', component: SaleListPage }
  ];
