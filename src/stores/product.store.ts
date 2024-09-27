import { defineStore } from 'pinia';
import { CreateProduct, FilterProduct, UpdateProduct, type Product } from '@/types/product';
import ProductServices from '@/services/product.services';


const service = new ProductServices();

export const useProductStore = defineStore('productStore', {
  // Estado inicial del store
  state: () => ({
    paginatedProducts: {} as { [page: number]: Product[] },
    isLoading: false,
    error: null as string | null,
    filteredProducts: {
      totalItems: 0,
      totalPages: 0,
      offset: 0,
      limit: 8,
      sortBy: '',
      sortDirection: '',
    } as FilterProduct
  }),

  actions: {
    // async fetchProducts(page: number) {
    //   const offset = (page - 1) * (this.filteredProducts?.limit ?? 0);
    //   // Verificar si ya tenemos los productos de esta página
    //   if (this.paginatedProducts[page]) {
    //     return this.paginatedProducts[page];
    //   }
    //   this.isLoading = true;
    //   this.error = null;
    //   try {
    //     const params = {
    //       ...this.filteredProducts,
    //       offset,
    //     };
    //     const response = await service.getProducts(params);
    //     console.log(response.data.products);
    //     const { products, pagination } = response.data;

    //     // Actualizar el estado del store
    //     this.filteredProducts.totalItems = pagination.totalItems;
    //     this.filteredProducts.totalPages = pagination.totalPages;
    //     this.filteredProducts.offset = pagination.offset;
    //     this.paginatedProducts[page] = products;

    //     return products; // Devolver los productos obtenidos
    //   } catch (error) {
    //     this.error = 'Error al cargar los productos';
    //   } finally {
    //     this.isLoading = false;
    //   }
    // },
    async fetchProducts(page: number) {
      const offset = (page - 1) * (this.filteredProducts.limit ?? 0);

      this.filteredProducts.offset = offset;

      this.isLoading = true;
      this.error = null;
      try {
        const params = {
          ...this.filteredProducts,
          offset,
        };
        const response = await service.getProducts(params);
        const { products, pagination } = response.data;

        // Actualizar el estado del store
        this.filteredProducts.totalItems = pagination.totalItems;
        this.filteredProducts.totalPages = pagination.totalPages;
        this.filteredProducts.offset = pagination.offset;
        this.paginatedProducts[page] = products;

        return products;
      } catch (error) {
        this.error = 'Error al cargar los productos';
      } finally {
        this.isLoading = false;
      }
    },
    async fetchProductById(productId: string) {
      this.isLoading = true;
      this.error = null;
      try {
        const response = await service.getProductById(productId);
        const fetchedProduct = response.data;

        return fetchedProduct;
      } catch (error) {
        this.error = 'Error al cargar el producto';
      } finally {
        this.isLoading = false;
      }
    },
    async createProduct(createdProduct: CreateProduct) {
      try {
        const response = await service.createProduct(createdProduct);
        const newProduct = response.data;
        if (this.paginatedProducts[1]) {
          this.paginatedProducts[1].unshift(newProduct);
        } else {
          this.paginatedProducts[1] = [newProduct];
        }
        this.filteredProducts.totalItems = (this.filteredProducts.totalItems ?? 0) + 1; // Actualizar el total de items
      } catch (error) {
        this.error = 'Error al agregar el producto';
        throw error;
      }
    },
    async deleteProduct(productId: string) {
      this.isLoading = true;
      this.error = null;
      try {
        await service.deleteProduct(productId);
        for (const page in this.paginatedProducts) {
          this.paginatedProducts[page] = this.paginatedProducts[page].filter(
            product => product.id !== Number(productId)
          );
        }
        this.filteredProducts.totalItems = (this.filteredProducts.totalItems ?? 0) - 1;
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
        for (const page in this.paginatedProducts) {
          const index = this.paginatedProducts[page].findIndex(
            product => product.id === Number(productId)
          );
          if (index !== -1) {
            this.paginatedProducts[page][index] = updatedData;
            break;
          }
        }
      } catch (error) {
        this.error = 'Error al actualizar el producto';
        throw error;
      }
    },

    setSortOrder(sortBy: string, sortDirection: string) {
      this.filteredProducts.sortBy = sortBy;
      this.filteredProducts.sortDirection = sortDirection;
    }
  },

  getters: {
    getProductsByPage: (state) => (page: number) => {
      return state.paginatedProducts[page] || [];
    },
    totalPages(state): number {
      return state.filteredProducts.totalPages ?? 0;
    },
    currentPage(state): number {
      return Math.floor((state.filteredProducts.offset ?? 0) / (state.filteredProducts.limit ?? 10)) + 1;
    },
  }
});