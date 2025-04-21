import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-sale-item-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sale-item-form.component.html',
  styleUrls: ['./sale-item-form.component.scss']
})
export class SaleItemFormComponent {
  /**
   * Formulário do item de venda (vindo do FormArray do pai).
   */
  @Input() item!: FormGroup;

  /**
   * Índice do item dentro do array.
   */
  @Input() index!: number;

  /**
   * Evento emitido para remover este item do array.
   */
  @Output() remove = new EventEmitter<number>();

  /**
   * Emite o índice atual para ser removido do array.
   */
  onRemove(): void {
    this.remove.emit(this.index);
  }
}