
// export interface Product {
//   id?: number;               
//   name: string;               
//   brand: string;             
//   description: string;       
//   price: string;             
//   category: string;           
//   stockQuantity: string;    
//   releaseDate: string;       
//   productAvailable: boolean; 
//   imageData: byte[];
// }

// src/types/product.ts
export interface Product {
  id?: number;
  name: string;
  description: string;
  brand: string;
  category: string;
  price: string;
  releaseDate: string;
  productAvailable: boolean;
  stockQuantity: string;
  imageName?: string;
  imageType?: string;
  imageData?: string; 
}

