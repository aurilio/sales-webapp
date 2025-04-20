import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Sale } from '../../models/sale.model';

@Component({
  selector: 'app-sale-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './sale-form.page.html',
  styleUrls: ['./sale-form.page.scss']
})
export class SaleFormPage implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initForm();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadMockSaleById(id);
    } else {
      this.addItem(); // nova venda
    }
  }

  private initForm(): void {
    this.form = this.fb.group({
      saleNumber: ['', Validators.required],
      saleDate: ['', Validators.required],
      customer: ['', Validators.required],
      branch: ['', Validators.required],
      cancelled: [false],
      items: this.fb.array([])
    });
  }

  get items(): FormArray {
    return this.form.get('items') as FormArray;
  }

  addItem(): void {
    const itemForm = this.fb.group({
      productId: ['PROD-001', Validators.required],
      productName: ['Produto Exemplo'],
      quantity: [1, [Validators.required, Validators.min(1), Validators.max(20)]],
      unitPrice: [{ value: 100, disabled: true }],
      discount: [{ value: 0, disabled: true }],
      totalAmount: [{ value: 0, disabled: true }]
    });

    this.items.push(itemForm);
  }

  removeItem(index: number): void {
    this.items.removeAt(index);
  }

  onQuantityChange(index: number): void {
    const item = this.items.at(index);
    const quantity = item.get('quantity')!.value;
    const unitPrice = item.get('unitPrice')!.value;

    let discount = 0;
    if (quantity >= 10 && quantity <= 20) {
      discount = 0.2;
    } else if (quantity >= 4 && quantity < 10) {
      discount = 0.1;
    }

    const total = quantity * unitPrice * (1 - discount);

    item.patchValue({
      discount: discount * 100, // em %
      totalAmount: total
    });
  }

  private loadMockSaleById(id: string): void {
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

    const sale = mockSales.find(s => s.id === id);
    if (!sale) {
      console.warn('Venda não encontrada');
      return;
    }

    this.form.patchValue({
      saleNumber: sale.saleNumber,
      saleDate: sale.saleDate.substring(0, 10),
      customer: sale.customer,
      branch: sale.branch,
      cancelled: sale.cancelled
    });

    sale.items.forEach(item => {
      const itemForm = this.fb.group({
        productId: [item.productId],
        productName: [item.productName],
        quantity: [item.quantity],
        unitPrice: [{ value: item.unitPrice, disabled: true }],
        discount: [{ value: item.discount, disabled: true }],
        totalAmount: [{ value: item.totalAmount, disabled: true }]
      });

      this.items.push(itemForm);
    });
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const sale: Sale = {
      id: '',
      ...this.form.value,
      totalAmount: this.form.value.items.reduce(
        (sum: number, item: any) => sum + item.totalAmount,
        0
      )
    };

    console.log('🟢 Venda salva (mock):', sale);
  }
}