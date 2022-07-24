export interface CreateProductVM {
  name: string;
  description: string;
}

export interface ProductVM {
  id: number;
  name: string;
  description: string;
}

export interface UpdateProductVM {
  name?: string;
  description?: string;
}
