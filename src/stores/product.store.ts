import { defineStore } from 'pinia';
import axios from 'axios';
import { type Product } from '@/types/product';

export const useProductStore = defineStore('productStore', {
  state: () => ({
    products: [] as Product[],
    isLoading: false,
    error: null as string | null,
  }),

  actions: {
    async fetchProducts() {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await axios.get<Product[]>('https://fakestoreapi.com/products');
        this.products = response.data;
      } catch (error) {
        this.error = 'Error al cargar los productos';
      } finally {
        this.isLoading = false;
      }
    },
    async addProduct(product: Product) {
      try {
        const response = await axios.post<Product>(`https://fakestoreapi.com/products`, product);
        this.products.push(response.data);
      } catch (error) {
        this.error = 'Error al agregar el producto';
      }
    },
    async updateProduct(product: Product) {
      try {
        const response = await axios.put<Product>(`https://fakestoreapi.com/products/${product.id}`, product);
        const index = this.products.findIndex(p => p.id === product.id);
        if (index !== -1) {
          this.products[index] = response.data;
        }
      } catch (error) {
        this.error = 'Error al actualizar el producto';
      }
    },
    async deleteProduct(productId: number) {
      try {
        const response = await axios.delete(`https://fakestoreapi.com/products/${productId}`);
        this.products = this.products.filter(p => p.id !== productId);
        return response.data;
      } catch (error) {
        this.error = 'Error al eliminar el producto';
      }
    },
  },

  getters: {
    getProductById: (state) => (id: number) => {
      return state.products.find(p => p.id === id);
    },
  },
});
