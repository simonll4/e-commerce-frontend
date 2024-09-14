import { Product, ProductPagination } from '@/types/product';
import api from './api';

export default class ProductServices {

  getProducts(pagination :ProductPagination) {
    return api().get('/api/v1/products', { params: { offset: pagination.currentPage, limit: pagination.itemsPerPage } });
  }


  
}