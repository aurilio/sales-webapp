import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { take } from 'rxjs';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

import { SaleService } from '../../services/sale.service';
import { Sale } from '../../models/sale.model';
import { UpdateSaleRequest } from '../../models/update-sale-request.model';
import { CreateSaleRequest } from '../../models/create-sale-request.model';
import { SaleItemFormComponent } from '../../components/sale-item/sale-item-form.component';
import { ToastService } from '../../../shared/services/toast.service';
import { ModalService } from '../../../shared/services/modal.service';

@Component({
  selector: 'app-sale-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    SaleItemFormComponent,

    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule
  ],
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
    private saleService: SaleService,
    private toastService: ToastService,
    private modalService: ModalService
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
      customerName: [''],
      branch: ['', Validators.required],
      isCancelled: [false],
      items: this.fb.array([])
    });
  }

  get itemsArray(): FormArray {
    return this.form.get('items') as FormArray;
  }

  get items(): FormGroup[] {
    return this.itemsArray.controls as FormGroup[];
  }

  private loadSale(id: string): void {
    this.saleService.getById(id).subscribe({
      next: (sale: Sale) => {
        this.form.patchValue({
          saleNumber: sale.saleNumber,
          saleDate: sale.saleDate.substring(0, 10),
          customerId: sale.customerId,
          customerName: sale.customerName,
          branch: sale.branch,
          isCancelled: sale.isCancelled
        });

        sale.items.forEach(item => {
          const itemForm = this.fb.group({
            productId: [item.productId],
            quantity: [item.quantity],
            productDetails: this.fb.group({
              title: [item.productDetails.title],
              category: [item.productDetails.category],
              price: [item.productDetails.price],
              image: [item.productDetails.image]
            })
          });

          this.itemsArray.push(itemForm);
        });
      },
      error: err => {
        console.error('Erro ao carregar venda:', err);
        this.toastService.show('Erro ao carregar venda');
      }
    });
  }

  addItem(): void {
    const itemForm = this.fb.group({
      productId: ['', [
        Validators.required,
        Validators.pattern('^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$')
      ]],
      quantity: [1, [Validators.required, Validators.min(1), Validators.max(20)]],
      productDetails: this.fb.group({
        title: [''],
        category: [''],
        price: [0],
        image: ['']
      })
    });

    this.itemsArray.push(itemForm);
  }

  removeItem(index: number): void {
    this.itemsArray.removeAt(index);
  }

  save(): void {
    if (this.form.invalid || this.itemsArray.invalid) {
      this.form.markAllAsTouched();
      this.toastService.show('Preencha corretamente os campos da venda.');
      return;
    }

    const raw = this.form.getRawValue();
    let request$: Observable<any>;

    if (this.isEditMode) {
      const updateSale: UpdateSaleRequest = {
        saleNumber: raw.saleNumber,
        saleDate: raw.saleDate,
        customerId: raw.customerId,
        customerName: raw.customerName,
        branch: raw.branch,
        items: raw.items,
        isCancelled: raw.isCancelled
      };
      request$ = this.saleService.update(this.saleId, updateSale);
    } else {
      const createSale: CreateSaleRequest = {
        saleNumber: raw.saleNumber,
        saleDate: raw.saleDate,
        customerId: raw.customerId,
        customerName: raw.customerName,
        branch: raw.branch,
        items: raw.items
      };

      request$ = this.saleService.create(createSale);
    }

    request$.subscribe({
      next: () => {
        this.toastService.show('Venda salva com sucesso');
        this.router.navigate(['/sales']);
      },
      error: err => {
        console.error('Erro ao salvar venda:', err);
        this.toastService.show('Erro ao salvar venda');
      }
    });
  }

  cancel(): void {
    if (!this.form.dirty) {
      this.navigateBack();
      return;
    }
  
    this.modalService.open({
      title: 'Sair sem salvar',
      message: 'Você tem alterações não salvas. Deseja realmente sair?',
      confirmText: 'Sim, sair',
      cancelText: 'Permanecer'
    });
  
    this.modalService.confirmResult$
      .pipe(take(1))
      .subscribe((confirmed) => {
        if (confirmed) {
          this.navigateBack();
        }
      });
  }
  
  private navigateBack(): void {
    if (this.isEditMode) {
      this.router.navigate(['/sales']);
    } else {
      this.router.navigate(['/']);
    }
  }
}
