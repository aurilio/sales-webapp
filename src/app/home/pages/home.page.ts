import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SaleService } from '../../sales/services/sale.service';
import { Sale } from '../../sales/models/sale.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule], 
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage {
  constructor(private saleService: SaleService) {}

  createSale(): void {
    const sale: Sale = {
      id: '',
      saleNumber: 'VEN-NEW',
      saleDate: new Date().toISOString(),
      customer: 'Novo Cliente',
      branch: 'Filial A',
      totalAmount: 0,
      cancelled: false,
      items: []
    };

    this.saleService.create(sale).subscribe({
      next: res => console.log('🟢 Criado:', res),
      error: err => console.error('🔴 Erro ao criar:', err)
    });
  }

  getSale(): void {
    this.saleService.getById('1').subscribe({
      next: res => console.log('🟢 Encontrado:', res),
      error: err => console.error('🔴 Erro ao buscar:', err)
    });
  }

  updateSale(): void {
    const sale: Sale = {
      id: '1',
      saleNumber: 'VEN-EDIT',
      saleDate: new Date().toISOString(),
      customer: 'Cliente Atualizado',
      branch: 'Filial B',
      totalAmount: 500,
      cancelled: false,
      items: []
    };

    this.saleService.update('1', sale).subscribe({
      next: res => console.log('🟢 Atualizado:', res),
      error: err => console.error('🔴 Erro ao atualizar:', err)
    });
  }

  deleteSale(): void {
    this.saleService.delete('1').subscribe({
      next: () => console.log('🟢 Deletado com sucesso'),
      error: err => console.error('🔴 Erro ao deletar:', err)
    });
  }
}
