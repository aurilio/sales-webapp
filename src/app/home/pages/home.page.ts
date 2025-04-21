import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage {
  saleId: string = '';

  constructor(private router: Router) {}

  createSale(): void {
    this.router.navigate(['/sales/new']);
  }

  getSale(): void {
    if (!this.saleId.trim()) {
      alert('Por favor, informe o ID da venda.');
      return;
    }

    this.router.navigate(['/sales/details', this.saleId.trim()]);
  }

  goToList(): void {
    this.router.navigate(['/sales']);
  }
}