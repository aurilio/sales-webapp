import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Sale } from '../../models/sale.model';

@Component({
  selector: 'app-sale-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sale-details.page.html',
  styleUrls: ['./sale-details.page.scss']
})
export class SaleDetailsPage implements OnInit {
  sale!: Sale | null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.loadMockSaleById(id);
    }
  }

  loadMockSaleById(id: string): void {
    const mockSales: Sale[] = [
      {
        id: '1',
        saleNumber: 'VEN-001',
        saleDate: '2024-04-01T00:00:00Z',
        customer: 'Cliente 1',
        branch: 'Filial A',
        totalAmount: 1500,
        cancelled: false,
        items: [
          {
            productId: 'PROD-001',
            productName: 'Produto 1',
            quantity: 5,
            unitPrice: 100,
            discount: 10,
            totalAmount: 450
          }
        ]
      }
    ];

    this.sale = mockSales.find(s => s.id === id) ?? null;

    if (!this.sale) {
      console.warn('Venda não encontrada');
    }
  }
}
