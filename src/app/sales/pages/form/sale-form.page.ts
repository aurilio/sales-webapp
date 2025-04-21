import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SaleService } from '../../services/sale.service';
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
  isEditMode = false;
  saleId: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private saleService: SaleService
  ) {}

  ngOnInit(): void {
    this.initForm();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.saleId = id;
      this.loadSale(id);
    } else {
      this.addItem();
    }
  }

  private initForm(): void {
    this.form = this.fb.group({
      saleNumber: ['', Validators.required],
      saleDate: ['', Validators.required],
      customerId: ['', Validators.required],
      branch: ['', Validators.required],
      isCancelled: [false],
      items: this.fb.array([])
    });
  }

  get items(): FormArray {
    return this.form.get('items') as FormArray;
  }

  private loadSale(id: string): void {
    this.saleService.getById(id).subscribe({
      next: (sale: Sale) => {
        this.form.patchValue({
          saleNumber: sale.saleNumber,
          saleDate: sale.saleDate.substring(0, 10),
          customerId: sale.customerId,
          branch: sale.branch,
          isCancelled: sale.isCancelled
        });

        sale.items.forEach(item => {
          const itemForm = this.fb.group({
            productId: [item.productId],
            quantity: [item.quantity],
            unitPrice: [{ value: item.unitPrice, disabled: true }],
            discount: [{ value: item.discount, disabled: true }],
            totalAmount: [{ value: item.totalAmount, disabled: true }],
            productDetails: this.fb.group({
              title: [item.productDetails.title],
              price: [item.productDetails.price],
              description: [item.productDetails.description],
              category: [item.productDetails.category],
              image: [item.productDetails.image],
              rating: this.fb.group({
                rate: [item.productDetails.rating.rate],
                count: [item.productDetails.rating.count]
              })
            })
          });

          this.items.push(itemForm);
        });
      },
      error: err => {
        console.error('🔴 Erro ao carregar venda:', err);
      }
    });
  }

  addItem(): void {
    const itemForm = this.fb.group({
      productId: ['', Validators.required],
      quantity: [1, [Validators.required, Validators.min(1), Validators.max(20)]],
      unitPrice: [{ value: 0, disabled: true }],
      discount: [{ value: 0, disabled: true }],
      totalAmount: [{ value: 0, disabled: true }],
      productDetails: this.fb.group({
        title: [''],
        price: [0],
        description: [''],
        category: [''],
        image: [''],
        rating: this.fb.group({
          rate: [0],
          count: [0]
        })
      })
    });

    this.items.push(itemForm);
  }

  removeItem(index: number): void {
    this.items.removeAt(index);
  }

  onQuantityChange(index: number): void {
    const item = this.items.at(index);
    const quantity = item.get('quantity')?.value;
    const unitPrice = item.get('unitPrice')?.value;

    let discount = 0;
    if (quantity >= 10 && quantity <= 20) {
      discount = 0.2;
    } else if (quantity >= 4 && quantity < 10) {
      discount = 0.1;
    }

    const total = quantity * unitPrice * (1 - discount);

    item.patchValue({
      discount: discount * 100,
      totalAmount: total
    });
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const raw = this.form.getRawValue();
    const totalAmount = raw.items.reduce(
      (sum: number, item: any) => sum + item.totalAmount,
      0
    );

    const sale: Sale = {
      id: this.saleId,
      ...raw,
      totalAmount,
      customerName: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const request$ = this.isEditMode
      ? this.saleService.update(this.saleId, sale)
      : this.saleService.create(sale);

    request$.subscribe({
      next: () => {
        console.log('🟢 Venda salva com sucesso');
        this.router.navigate(['/sales']);
      },
      error: err => {
        console.error('🔴 Erro ao salvar venda:', err);
      }
    });
  }
}