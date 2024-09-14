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

export interface ProductPagination {
    totalItems: number;
    totalPages: number;
    currentPage: number;
    itemsPerPage: number;
}