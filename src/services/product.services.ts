import { Product, FilterProduct, CreateProduct, UpdateProduct } from '@/types/product';
import api from './api';

export default class ProductServices {

  // getProducts(filteredProducts: FilterProduct) {
  //   const { offset, limit, sortBy,filter, sortDirection } = filteredProducts;
  //   return api().get('/api/v1/products', {
  //     params: {
  //       offset: offset,
  //       limit: limit || "",
  //       sortBy: sortBy || "",
  //       sortDirection: sortDirection || "",
  //     }
  //   });
  // }

  getProducts(filteredProducts: FilterProduct) {
    const { offset, limit, sortBy, filter, sortDirection } = filteredProducts;
    const params: { [key: string]: string | number } = {
      offset: offset || 0,
      limit: limit || '',
      sortBy: sortBy || '',
      sortDirection: sortDirection || '',
    };
    if (filter) {
      const filterParams = new URLSearchParams(filter);
      filterParams.forEach((value, key) => {
        params[key] = value;
      });
    }

    return api().get('/api/v1/products', { params });
  }

  getProductById(productId: string) {
    return api().get<Product>(`/api/v1/products/${productId}`);
  }

  createProduct(product: CreateProduct) {
    return api().post<Product>('/api/v1/products', product);
  }

  updateProduct(productId: number, product: UpdateProduct) {
    return api().put<Product>(`/api/v1/products/${productId}`, product
    );
  }

  deleteProduct(productId: string) {
    return api().delete(`/api/v1/products/${productId}`);
  }

}