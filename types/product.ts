export interface Product {
    id: string;
    title: string;
    description?: string;
    productImage?: { asset: { url: string } };
    price: string;
    tags?: string[];
    discountpercentage?: number;
    isNew?: boolean;
    inventory: number;
  }
  