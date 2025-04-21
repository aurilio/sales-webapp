import { SaleItemRequest } from './sale-item-request.model';

export interface CreateSaleRequest {
    saleNumber: string;
    saleDate: string;
    customerId: string;
    customerName: string;
    branch: string;
    items: SaleItemRequest[];
  }
  