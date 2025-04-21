import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BackToHomeButtonComponent } from '../../../shared/components/back-to-home-button.component';
import { SaleFiltersComponent } from '../../components/filters/sale-filters.component';

import { Sale } from '../../models/sale.model';
import { SaleService } from '../../services/sale.service';

@Component({
  selector: 'app-sale-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    BackToHomeButtonComponent,
    SaleFiltersComponent
  ],
  templateUrl: './sale-list.page.html',
  styleUrls: ['./sale-list.page.scss']
})
export class SaleListPage implements OnInit {
  sales: Sale[] = [];
  isLoading = true;
  errorMessage = '';
  currentPage = 1;
  totalPages = 1;
  filters: { [key: string]: string } = {};

  constructor(private saleService: SaleService) {}

  ngOnInit(): void {
    this.loadSales();
  }

  loadSales(): void {
    this.isLoading = true;
    this.saleService.getAll(this.currentPage, 10, this.filters).subscribe({
      next: (response) => {
        this.sales = response.data;
        this.totalPages = response.totalPages;
        this.currentPage = response.currentPage;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Erro ao carregar as vendas.';
        this.isLoading = false;
        console.error(error);
      }
    });
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadSales();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadSales();
    }
  }

  onFiltersChanged(newFilters: { [key: string]: string }): void {
    this.filters = newFilters;
    this.currentPage = 1; // Reinicia para a primeira página
    this.loadSales();
  }

  deleteSale(id: string): void {
    const confirmDelete = confirm('Deseja excluir esta venda?');
    if (!confirmDelete) return;

    this.saleService.delete(id).subscribe({
      next: () => {
        this.sales = this.sales.filter(s => s.id !== id);
        console.log('Venda excluída com sucesso');
      },
      error: err => {
        this.errorMessage = 'Erro ao excluir a venda.';
        console.error('Erro ao excluir:', err);
      }
    });
  }
}