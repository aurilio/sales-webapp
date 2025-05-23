import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SaleService } from '../../services/sale.service';
import { Sale } from '../../models/sale.model';
import { RouterModule } from '@angular/router';
import { ToastService } from '../../../shared/services/toast.service';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-sale-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatDividerModule,
    MatListModule,
    MatButtonModule
  ],
  templateUrl: './sale-details.page.html',
  styleUrls: ['./sale-details.page.scss']
})
export class SaleDetailsPage implements OnInit {
  sale?: Sale;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private saleService: SaleService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.errorMessage = 'ID da venda não informado.';
      this.toastService.show('ID da venda não informado');
      return;
    }

    this.saleService.getById(id).subscribe({
      next: (sale) => {
        this.sale = sale;
      },
      error: (err) => {
        this.errorMessage = 'Erro ao carregar os detalhes da venda.';
        this.toastService.show('Erro ao carregar os detalhes da venda');
        console.error(err);
      }
    });
  }
}