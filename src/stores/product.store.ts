import { defineStore } from 'pinia';
import { CreateProduct, FilterProduct, UpdateProduct, type Product } from '@/types/product';
import ProductServices from '@/services/product.services';


const service = new ProductServices();

export const useProductStore = defineStore('productStore', {

  // Estado inicial del store
  state: () => ({
    products: [] as Product[],
    isLoading: false,
    error: null as string | null,
    filteredProducts: {
      totalItems: 0,
      totalPages: 0,
      offset: 0,
      limit: 5,
      sortBy: '',
      sortDirection: '',
    } as FilterProduct
  }),

  actions: {

    async fetchProducts() {
      if ((this.filteredProducts?.totalItems ?? 0) !== 0 && (this.filteredProducts?.offset ?? 0) >= (this.filteredProducts?.totalItems ?? 0)) return;
      this.isLoading = true;
      this.error = null;
      try {
        const response = await service.getProducts(this.filteredProducts);

        this.products = response.data.products;
        const paginationInfo = response.data.pagination;
        this.filteredProducts = {
          totalItems: paginationInfo.totalItems,
          totalPages: paginationInfo.totalPages,
          offset: paginationInfo.offset,
          limit: paginationInfo.limit
        }

        if ((this.filteredProducts?.offset ?? 0) === 0) {
          this.products = response.data.products;
        } else {
          this.products = [...this.products, ...response.data.products];
        }
        return this.products
      } catch (error) {
        this.error = 'Error al cargar los productos';
      } finally {
        this.isLoading = false;
      }
    },

    // Acción para obtener un producto por su ID
    async fetchProductById(productId: string) {
      this.isLoading = true;
      this.error = null;

      try {
        const response = await service.getProductById(productId);

        const fetchedProduct = response.data;
        const index = this.products.findIndex(p => String(p.id) === productId);
        if (index !== -1) {
          this.products[index] = fetchedProduct;
        } else {
          this.products.push(fetchedProduct);
        }

      } catch (error) {
        this.error = 'Error al cargar el producto';
      } finally {
        this.isLoading = false;
      }
    }
    ,
    async createProduct(createdProduct: CreateProduct) {
      try {
        const response = await service.createProduct(createdProduct);

        const newProduct = response.data;
        this.products.push(newProduct);

      } catch (error) {
        this.error = 'Error al agregar el producto';
        throw error;
      }
    },

    // Acción para eliminar un producto por ID
    async deleteProduct(productId: string) {
      this.isLoading = true;
      this.error = null;

      await service.deleteProduct(productId);
      // Eliminar el producto de la lista en el store
      this.products = this.products.filter(product => product.id !== Number(productId));

      try {
        const response = await service.deleteProduct(productId);
      } catch (error) {
        this.error = 'Error al eliminar el producto';
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    async updateProduct(productId: string, updatedProduct: UpdateProduct) {
      try {
        const response = await service.updateProduct(productId, updatedProduct);

        const updatedData = response.data;
        // Encontrar y actualizar el producto en la lista
        const index = this.products.findIndex(product => product.id === Number(productId));
        if (index !== -1) {
          this.products[index] = updatedData;
        }

      } catch (error) {
        this.error = 'Error al actualizar el producto';
        throw error;
      }
    },
  },

  getters: {
    getProductById: (state) => (id: string) => {
      return state.products.find(p => String(p.id) === id);
    },
    totalPages(state): number {
      return state.filteredProducts.totalPages ?? 0;
    },
    currentPage(state): number {
      return Math.floor((state.filteredProducts.offset ?? 0) / (state.filteredProducts.limit ?? 10)) + 1;
    },

  },
});