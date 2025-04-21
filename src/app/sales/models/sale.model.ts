export interface Sale {
  id: string;
  saleNumber: string;
  saleDate: string;
  customerId: string;
  customerName: string;
  branch: string;
  totalAmount: number;
  isCancelled: boolean;
  createdAt: string;
  updatedAt?: string;
  items: SaleItem[];
}

export interface SaleItem {
  productId: string;
  quantity: number;
  unitPrice: number;
  discount: number;
  totalAmount: number;
  createdAt: string;
  updatedAt?: string;
  productDetails: {
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
      rate: number;
      count: number;
    };
  };
}
