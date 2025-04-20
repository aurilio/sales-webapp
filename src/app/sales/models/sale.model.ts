export interface SaleItem {
    productId: string;
    productName: string;
    quantity: number;
    unitPrice: number;
    discount: number;
    totalAmount: number;
    //cancelled: boolean;
  }
  
  export interface Sale {
    id: string;
    saleNumber: string;
    saleDate: string;
    customer: string;
    totalAmount: number;
    branch: string;
    items: SaleItem[];
    cancelled: boolean;
  }
  