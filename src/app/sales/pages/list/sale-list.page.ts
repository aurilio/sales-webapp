import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { of } from 'rxjs';

import { Sale } from '../../models/sale.model';
import { SaleService } from '../../services/sale.service';

@Component({
  selector: 'app-sale-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sale-list.page.html',
  styleUrls: ['./sale-list.page.scss']
})
export class SaleListPage implements OnInit {
  sales: Sale[] = [];
  isLoading = true;
  errorMessage = '';

  constructor(private saleService: SaleService) {}

  ngOnInit(): void {
    this.loadMockSales();
  }
  
  private loadMockSales(): void {
    const mockSales = this.buildMockSales();
  
    of(mockSales).subscribe({
      next: (data) => this.handleSuccess(data),
      error: (error) => this.handleError(error)
    });
  }
  
  private buildMockSales(): Sale[] {
    return [
      {
        id: '1',
        saleNumber: 'VEN-001',
        saleDate: '2024-04-01T00:00:00Z',
        customer: 'Cliente 1',
        branch: 'Filial A',
        totalAmount: 1500,
        cancelled: false,
        items: []
      },
      {
        id: '2',
        saleNumber: 'VEN-002',
        saleDate: '2024-04-05T00:00:00Z',
        customer: 'Cliente 2',
        branch: 'Filial B',
        totalAmount: 875.50,
        cancelled: true,
        items: []
      }
    ];
  }
  
  private handleSuccess(data: Sale[]): void {
    this.sales = data;
    this.isLoading = false;
  }
  
  private handleError(error: unknown): void {
    this.errorMessage = 'Erro ao carregar as vendas.';
    this.isLoading = false;
    console.error(error);
  }

  deleteSale(index: number): void {
    const sale = this.sales[index];
  
    const confirmDelete = confirm(`Deseja realmente excluir a venda ${sale.saleNumber}?`);
    if (!confirmDelete) return;
  
    // Simulando exclusão do array
    this.sales.splice(index, 1);
    console.log(`🗑️ Venda ${sale.saleNumber} excluída com sucesso (mock)`);
  }
}