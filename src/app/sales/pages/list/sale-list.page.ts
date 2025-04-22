import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { take } from 'rxjs';
import { SaleFiltersComponent } from '../../components/filters/sale-filters.component';

import { Sale } from '../../models/sale.model';
import { SaleService } from '../../services/sale.service';
import { ToastService } from '../../../shared/services/toast.service';
import { ModalService } from '../../../shared/services/modal.service';
import { BackToHomeButtonComponent } from '../../../shared/components/button-back-home/back-to-home-button.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-sale-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    SaleFiltersComponent,
    BackToHomeButtonComponent
  ],
  
  templateUrl: './sale-list.page.html',
  styleUrls: ['./sale-list.page.scss']
})
export class SaleListPage implements OnInit {
  sales: Sale[] = [];
  errorMessage = '';
  currentPage = 1;
  totalPages = 1;
  filters: { [key: string]: string } = {};

  constructor(
    private saleService: SaleService,
    private toastService: ToastService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.loadSales();
  }

  loadSales(): void {
    this.saleService.getAll(this.currentPage, 10, this.filters).subscribe({
      next: (response) => {
        this.sales = response.data;
        this.totalPages = response.totalPages;
        this.currentPage = response.currentPage;
      },
      error: (error) => {
        this.errorMessage = 'Erro ao carregar as vendas.';
        this.toastService.show('Erro ao carregar as vendas.');
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
    this.currentPage = 1;
    this.loadSales();
  }

  deleteSale(id: string): void {
    this.modalService.open({
      title: 'Excluir Venda',
      message: 'Deseja realmente excluir esta venda?',
      confirmText: 'Sim, excluir',
      cancelText: 'Cancelar'
    });
    
    this.modalService.confirmResult$
      .pipe(take(1))
      .subscribe((confirmed) => {
        if (confirmed) {
          this.saleService.delete(id).subscribe({
            next: () => {
              this.sales = this.sales.filter(s => s.id !== id);
              this.toastService.show('Venda excluída com sucesso!');
            },
            error: err => {
              this.toastService.show('Erro ao excluir a venda.');
              console.error('Erro ao excluir:', err);
            }
          });
        }
      });
  }
}