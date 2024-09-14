export interface Product {
  id?: number;
  title: string;
  description: string;
  brand: string;
  category: {"id": number, "name": string, "image": string, "creationAt": string, "updatedAt": string};
  price: string;
  createdAt: string;
  updatedAt: string;
  productAvailable?: boolean;
  stockQuantity: string;
  images: string[];
}

export interface FilterProduct {
    totalItems?: number;
    totalPages?: number;
    offset?: number;
    limit?: number;
    sortBy?: string;
    sortDirection?: string;
}

export interface CreateProduct {
  title: string;
  description: string;
  brand: string;
  categoryId: number;
  price: number;
  images: string[];
}

export interface UpdateProduct {
  title?: string;
  description?: string;
  brand?: string;
  categoryId?: number;
  price?: number;
  images?: string[];
}