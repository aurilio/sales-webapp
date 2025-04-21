import { SaleItemRequest } from './sale-item-request.model';

export interface UpdateSaleRequest {
    saleNumber: string;
    saleDate: string;
    customerId: string;
    customerName: string;
    branch: string;
    isCancelled: boolean;
    items: SaleItemRequest[];
  }
  