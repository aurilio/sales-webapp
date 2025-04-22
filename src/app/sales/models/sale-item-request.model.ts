export interface SaleItemRequest {
    productId: string;
    quantity: number;
    productDetails: {
      title: string;
      category: string;
      price: number;
      image: string;
    };
  }
  