import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sale-filters',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './sale-filters.component.html',
  styleUrls: ['./sale-filters.component.scss']
})
export class SaleFiltersComponent {
  customerName: string = '';
  branch: string = '';
  minTotalAmount?: number;
  maxTotalAmount?: number;
  isCancelled?: string;

  /**
   * Evento emitido com os filtros aplicados
   */
  @Output() filtersChanged = new EventEmitter<{ [key: string]: string }>();

  applyFilters(): void {
    const filters: { [key: string]: string } = {};

    if (this.customerName?.trim()) {
      filters['customerName'] = `*${this.customerName.trim()}*`;
    }
  
    if (this.branch?.trim()) {
      filters['branch'] = `*${this.branch.trim()}*`;
    }
  
    if (this.minTotalAmount != null) {
      filters['_minTotalAmount'] = this.minTotalAmount.toString();
    }
  
    if (this.maxTotalAmount != null) {
      filters['_maxTotalAmount'] = this.maxTotalAmount.toString();
    }
  
    if (this.isCancelled !== undefined && this.isCancelled !== '') {
      filters['isCancelled'] = this.isCancelled;
    }

    this.filtersChanged.emit(filters);
  }

  clearFilters(): void {
    this.customerName = '';
    this.branch = '';
    this.minTotalAmount = undefined;
    this.maxTotalAmount = undefined;
    this.isCancelled = undefined;

    this.filtersChanged.emit({});
  }
}
