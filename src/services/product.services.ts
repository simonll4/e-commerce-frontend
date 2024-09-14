import { Product, FilterProduct, CreateProduct, UpdateProduct } from '@/types/product';
import api from './api';

export default class ProductServices {

  getProducts(filteredProducts: FilterProduct) {
    const { offset, limit, sortBy, sortDirection } = filteredProducts;
    return api().get('/api/v1/products', {
      params: {
        offset: offset,
        limit: limit || "",
        sortBy: sortBy || "",
        sortDirection: sortDirection || "",
      }
    });
  }

  getProductById(productId: string) {
    return api().get<Product>(`/api/v1/products/${productId}`);
  }

  createProduct(product: CreateProduct) {
    return api().post<Product>('/api/v1/products', product);
  }

  updateProduct(productId: string, product: UpdateProduct) {
    return api().put<Product>(`/api/v1/products/${productId}`, product
    );
  }

  deleteProduct(productId: string) {
    return api().delete(`/api/v1/products/${productId}`);
  }

}