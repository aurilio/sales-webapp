import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SaleService } from '../../services/sale.service';
import { Sale } from '../../models/sale.model';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sale-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sale-details.page.html',
  styleUrls: ['./sale-details.page.scss']
})
export class SaleDetailsPage implements OnInit {
  sale?: Sale;
  isLoading = true;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private saleService: SaleService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.errorMessage = 'ID da venda não informado.';
      this.isLoading = false;
      return;
    }

    this.saleService.getById(id).subscribe({
      next: (sale) => {
        this.sale = sale;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Erro ao carregar os detalhes da venda.';
        this.isLoading = false;
        console.error(err);
      }
    });
  }
}