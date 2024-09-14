import { defineStore } from 'pinia';
import axios from 'axios';

import { type Product } from '@/types/product';


// Definición del store para gestionar productos
export const useProductStore = defineStore('productStore', {

  // Estado inicial del store
  state: () => ({
    products: [] as Product[],
    isLoading: false,
    error: null as string | null,
    currentPage: 1,
    totalPages: 0,
    perPage: 10,
    hasMoreProducts: true,
  }),

  // Acciones: métodos para modificar el estado o realizar operaciones asíncronas
  actions: {

    //Obtener productos paginados
    async fetchProducts(page: number = 1) {
      if (!this.hasMoreProducts) return;
      this.isLoading = true;
      this.error = null;
      try {
        const response = await axios.get(`http://127.0.0.1:3000/products?_page=${page}&_per_page=${this.perPage}`);

        if (page === 1) {
          this.products = response.data.data; // Si es la primera página, sobrescribe los productos
        } else {
          this.products = [...this.products, ...response.data.data]; // Si es una página subsiguiente, agrega los productos
        }
        // Actualiza la paginación
        this.currentPage = page;
        this.totalPages = response.data.pages;
        this.hasMoreProducts = this.currentPage < this.totalPages;
      } catch (error) {
        this.error = 'Error al cargar los productos';
        console.error('Error al cargar los productos:', error);
      } finally {
        this.isLoading = false;
      }
    },
    
    // Acción para obtener un producto por su ID
    async fetchProductById(productId: string) {
      this.isLoading = true;
      this.error = null;
      const existingProduct = this.products.find(p => p.id === Number(productId));
      if (existingProduct) {
        this.isLoading = false;
        return existingProduct;
      }
      try {
        const response = await axios.get<Product>(`http://127.0.0.1:3000/products/${productId}`);
        this.products.push(response.data);
        console.log(this.products)
      } catch (error) {
        this.error = 'Error al cargar el producto';
        console.error('Error al cargar el producto:', error);
      } finally {
        this.isLoading = false;
      }
    }
    ,

    // Acción para agregar un nuevo producto
    async addProduct(product: Product) {
      try {
        const response = await axios.post('http://localhost:3000/products', product);
        this.products.push(response.data);
      } catch (error) {
        this.error = 'Error al agregar el producto';
        console.error('Error al agregar el producto:', error);
        throw error;
      }
    },

    // Acción para eliminar un producto por ID
    async deleteProduct(productId: string) {
      this.isLoading = true;
      this.error = null;
      try {
        await axios.delete(`http://127.0.0.1:3000/products/${productId}`);
        this.products = this.products.filter(p => p.id !== Number(productId));
      } catch (error) {
        this.error = 'Error al eliminar el producto';
        console.error('Error al eliminar el producto:', error);
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    // Acción para actualizar un producto por ID
    async updateProduct(productId: string, updatedProduct: Partial<Product>) {
      try {
        const response = await axios.put(`http://127.0.0.1:3000/products/${productId}`, updatedProduct);
        const index = this.products.findIndex(p => String(p.id) === String(productId));
        if (index !== -1) {
          this.products[index] = response.data;
        }
      } catch (error) {
        this.error = 'Error al actualizar el producto';
        console.error('Error al actualizar el producto:', error);
        throw error;
      }
    },
  },

  // Getters: métodos para acceder al estado de manera reactiva
  getters: {
    getProductById: (state) => (id: string) => {
      return state.products.find(p => String(p.id) === id);
    },
    
  },
});