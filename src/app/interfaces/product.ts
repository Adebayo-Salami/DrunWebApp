export interface CreateProductVM {
  name: string;
  description: string;
  inventoryItemId: number;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  inventoryItemId: number;
  dateAdded: Date;
}

export interface UpdateProductVM {
  name?: string;
  description?: string;
}
