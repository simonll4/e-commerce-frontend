export interface Product {
  id?: number;
  user: {id: number};
  name: string;
  description: string;
  brand: string;
  category: string;
  price: string;
  releaseDate?: string;
  productAvailable?: boolean;
  stockQuantity: string;
  imageURL: string;
}

