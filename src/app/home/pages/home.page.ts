import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { ToastService } from '../../shared/services/toast.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage {
  saleId: string = '';

  constructor(
    private router: Router,
    private taostService: ToastService) {}

  createSale(): void {
    this.router.navigate(['/sales/new']);
  }

  getSale(): void {
    if (!this.saleId.trim()) {
      this.taostService.show('Por favor, informe o ID da venda.');
      return;
    }

    this.router.navigate(['/sales/details', this.saleId.trim()]);
  }

  goToList(): void {
    this.router.navigate(['/sales']);
  }
}
